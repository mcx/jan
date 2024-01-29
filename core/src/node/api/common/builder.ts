import fs from 'fs'
import { JanApiRouteConfiguration, RouteConfiguration } from './configuration'
import { join } from 'path'
import {
  ContentType,
  MessageStatus,
  Model,
  ModelSettingParams,
  ThreadMessage,
} from './../../../index'
import {
  getEngineConfiguration,
  getJanDataFolderPath,
  getJanExtensionsPath,
  getSystemResourceInfo,
} from '../../utils'
import { logServer } from '../../log'
import { ChildProcessWithoutNullStreams, spawn } from 'child_process'

import { PromptTemplate } from '../../../types/miscellaneous/promptTemplate'

// The PORT to use for the Nitro subprocess
const PORT = 3928
// The HOST address to use for the Nitro subprocess
const LOCAL_HOST = '127.0.0.1'
// The URL for the Nitro subprocess
const NITRO_HTTP_SERVER_URL = `http://${LOCAL_HOST}:${PORT}`
// The URL for the Nitro subprocess to load a model
const NITRO_HTTP_LOAD_MODEL_URL = `${NITRO_HTTP_SERVER_URL}/inferences/llamacpp/loadmodel`
// The URL for the Nitro subprocess to validate a model
const NITRO_HTTP_VALIDATE_MODEL_URL = `${NITRO_HTTP_SERVER_URL}/inferences/llamacpp/modelstatus`
// The URL for the Nitro subprocess to kill itself
const NITRO_HTTP_KILL_URL = `${NITRO_HTTP_SERVER_URL}/processmanager/destroy`

const SUPPORTED_MODEL_FORMAT = '.gguf'

// TODO: NamH try to updateNvidiaInfo when the server start?
// Attempt to fetch nvidia info
// await executeOnMain(NODE, "updateNvidiaInfo", {});

// TODO: move this to core type
interface NitroModelSettings extends ModelSettingParams {
  llama_model_path: string
  cpu_threads: number
}

export const getBuilder = async (configuration: RouteConfiguration) => {
  const directoryPath = join(getJanDataFolderPath(), configuration.dirName)
  try {
    if (!fs.existsSync(directoryPath)) {
      console.debug('model folder not found')
      return []
    }

    const files: string[] = fs.readdirSync(directoryPath)

    const allDirectories: string[] = []
    for (const file of files) {
      if (file === '.DS_Store') continue
      allDirectories.push(file)
    }

    const results = allDirectories
      .map((dirName) => {
        const jsonPath = join(directoryPath, dirName, configuration.metadataFileName)
        return readModelMetadata(jsonPath)
      })
      .filter((data) => !!data)
    const modelData = results
      .map((result: any) => {
        try {
          return JSON.parse(result)
        } catch (err) {
          console.error(err)
        }
      })
      .filter((e: any) => !!e)

    return modelData
  } catch (err) {
    console.error(err)
    return []
  }
}

const readModelMetadata = (path: string): string | undefined => {
  if (fs.existsSync(path)) {
    return fs.readFileSync(path, 'utf-8')
  } else {
    return undefined
  }
}

export const retrieveBuilder = async (configuration: RouteConfiguration, id: string) => {
  const data = await getBuilder(configuration)
  const filteredData = data.filter((d: any) => d.id === id)[0]

  if (!filteredData) {
    return undefined
  }

  return filteredData
}

export const deleteBuilder = async (configuration: RouteConfiguration, id: string) => {
  if (configuration.dirName === 'assistants' && id === 'jan') {
    return {
      message: 'Cannot delete Jan assistant',
    }
  }

  const directoryPath = join(getJanDataFolderPath(), configuration.dirName)
  try {
    const data = await retrieveBuilder(configuration, id)
    if (!data) {
      return {
        message: 'Not found',
      }
    }

    const objectPath = join(directoryPath, id)
    fs.rmdirSync(objectPath, { recursive: true })
    return {
      id: id,
      object: configuration.delete.object,
      deleted: true,
    }
  } catch (ex) {
    console.error(ex)
  }
}

export const getMessages = async (threadId: string): Promise<ThreadMessage[]> => {
  const threadDirPath = join(getJanDataFolderPath(), 'threads', threadId)
  const messageFile = 'messages.jsonl'
  try {
    const files: string[] = fs.readdirSync(threadDirPath)
    if (!files.includes(messageFile)) {
      console.error(`${threadDirPath} not contains message file`)
      return []
    }

    const messageFilePath = join(threadDirPath, messageFile)
    if (!fs.existsSync(messageFilePath)) {
      console.debug('message file not found')
      return []
    }

    const lines = fs
      .readFileSync(messageFilePath, 'utf-8')
      .toString()
      .split('\n')
      .filter((line: any) => line !== '')

    const messages: ThreadMessage[] = []
    lines.forEach((line: string) => {
      messages.push(JSON.parse(line) as ThreadMessage)
    })
    return messages
  } catch (err) {
    console.error(err)
    return []
  }
}

export const retrieveMesasge = async (threadId: string, messageId: string) => {
  const messages = await getMessages(threadId)
  const filteredMessages = messages.filter((m) => m.id === messageId)
  if (!filteredMessages || filteredMessages.length === 0) {
    return {
      message: 'Not found',
    }
  }

  return filteredMessages[0]
}

export const createThread = async (thread: any) => {
  const threadMetadataFileName = 'thread.json'
  // TODO: add validation
  if (!thread.assistants || thread.assistants.length === 0) {
    return {
      message: 'Thread must have at least one assistant',
    }
  }

  const threadId = generateThreadId(thread.assistants[0].assistant_id)
  try {
    const updatedThread = {
      ...thread,
      id: threadId,
      created: Date.now(),
      updated: Date.now(),
    }
    const threadDirPath = join(getJanDataFolderPath(), 'threads', updatedThread.id)
    const threadJsonPath = join(threadDirPath, threadMetadataFileName)

    if (!fs.existsSync(threadDirPath)) {
      fs.mkdirSync(threadDirPath)
    }

    await fs.writeFileSync(threadJsonPath, JSON.stringify(updatedThread, null, 2))
    return updatedThread
  } catch (err) {
    return {
      error: err,
    }
  }
}

export const updateThread = async (threadId: string, thread: any) => {
  const threadMetadataFileName = 'thread.json'
  const currentThreadData = await retrieveBuilder(JanApiRouteConfiguration.threads, threadId)
  if (!currentThreadData) {
    return {
      message: 'Thread not found',
    }
  }
  // we don't want to update the id and object
  delete thread.id
  delete thread.object

  const updatedThread = {
    ...currentThreadData,
    ...thread,
    updated: Date.now(),
  }
  try {
    const threadDirPath = join(getJanDataFolderPath(), 'threads', updatedThread.id)
    const threadJsonPath = join(threadDirPath, threadMetadataFileName)

    await fs.writeFileSync(threadJsonPath, JSON.stringify(updatedThread, null, 2))
    return updatedThread
  } catch (err) {
    return {
      message: err,
    }
  }
}

const generateThreadId = (assistantId: string) => {
  return `${assistantId}_${(Date.now() / 1000).toFixed(0)}`
}

export const createMessage = async (threadId: string, message: any) => {
  const threadMessagesFileName = 'messages.jsonl'

  try {
    const { ulid } = require('ulid')
    const msgId = ulid()
    const createdAt = Date.now()
    const threadMessage: ThreadMessage = {
      id: msgId,
      thread_id: threadId,
      status: MessageStatus.Ready,
      created: createdAt,
      updated: createdAt,
      object: 'thread.message',
      role: message.role,
      content: [
        {
          type: ContentType.Text,
          text: {
            value: message.content,
            annotations: [],
          },
        },
      ],
    }

    const threadDirPath = join(getJanDataFolderPath(), 'threads', threadId)
    const threadMessagePath = join(threadDirPath, threadMessagesFileName)

    if (!fs.existsSync(threadDirPath)) {
      fs.mkdirSync(threadDirPath)
    }
    fs.appendFileSync(threadMessagePath, JSON.stringify(threadMessage) + '\n')
    return threadMessage
  } catch (err) {
    return {
      message: err,
    }
  }
}

export const startModel = async (modelId: string) => {
  // TODO: check if the model engine is nitro
  const nitroInitResult = await runModel(modelId)

  if (nitroInitResult?.error) {
    return {
      error: nitroInitResult.error,
    }
  }

  // TODO: return more information
  return {
    message: 'Model started',
  }
}

interface ModelOperationResponse {
  error?: any
  modelFile?: string
}

const runModel = async (modelId: string): Promise<ModelOperationResponse | void> => {
  const janDataFolderPath = getJanDataFolderPath()
  const modelFolderFullPath = join(janDataFolderPath, 'models', modelId)

  const files: string[] = fs.readdirSync(modelFolderFullPath)

  // Look for GGUF model file
  const ggufBinFile = files.find((file) => file.toLowerCase().includes(SUPPORTED_MODEL_FORMAT))

  const modelMetadataPath = join(modelFolderFullPath, 'model.json')
  const modelMetadata: Model = JSON.parse(fs.readFileSync(modelMetadataPath, 'utf-8'))

  if (!ggufBinFile) return Promise.reject('No GGUF model file found')

  const modelBinaryPath = join(modelFolderFullPath, ggufBinFile)
  console.log(`NamH modelBinaryPath: ${modelBinaryPath}`)

  const nitroResourceProbe = await getSystemResourceInfo()
  const nitroModelSettings: NitroModelSettings = {
    ...modelMetadata.settings,
    llama_model_path: modelBinaryPath,
    // This is critical and requires real CPU physical core count (or performance core)
    cpu_threads: Math.max(1, nitroResourceProbe.numCpuPhysicalCore),
    ...(modelMetadata.settings.mmproj && {
      mmproj: join(modelFolderFullPath, modelMetadata.settings.mmproj),
    }),
  }

  // Convert settings.prompt_template to system_prompt, user_prompt, ai_prompt
  if (modelMetadata.settings.prompt_template) {
    const promptTemplate = modelMetadata.settings.prompt_template
    const prompt = promptTemplateConverter(promptTemplate)
    if (prompt?.error) {
      return Promise.reject(prompt.error)
    }
    nitroModelSettings.system_prompt = prompt.system_prompt
    nitroModelSettings.user_prompt = prompt.user_prompt
    nitroModelSettings.ai_prompt = prompt.ai_prompt
  }
  console.log(`NamH nitroModelSettings: ${JSON.stringify(nitroModelSettings)}`)

  return runNitroAndLoadModel(nitroModelSettings)
}

// TODO: move to util
const promptTemplateConverter = (promptTemplate: string): PromptTemplate => {
  // Split the string using the markers
  const systemMarker = '{system_message}'
  const promptMarker = '{prompt}'

  if (promptTemplate.includes(systemMarker) && promptTemplate.includes(promptMarker)) {
    // Find the indices of the markers
    const systemIndex = promptTemplate.indexOf(systemMarker)
    const promptIndex = promptTemplate.indexOf(promptMarker)

    // Extract the parts of the string
    const system_prompt = promptTemplate.substring(0, systemIndex)
    const user_prompt = promptTemplate.substring(systemIndex + systemMarker.length, promptIndex)
    const ai_prompt = promptTemplate.substring(promptIndex + promptMarker.length)

    // Return the split parts
    return { system_prompt, user_prompt, ai_prompt }
  } else if (promptTemplate.includes(promptMarker)) {
    // Extract the parts of the string for the case where only promptMarker is present
    const promptIndex = promptTemplate.indexOf(promptMarker)
    const user_prompt = promptTemplate.substring(0, promptIndex)
    const ai_prompt = promptTemplate.substring(promptIndex + promptMarker.length)

    // Return the split parts
    return { user_prompt, ai_prompt }
  }

  // Return an error if none of the conditions are met
  return { error: 'Cannot split prompt template' }
}

const runNitroAndLoadModel = async (modelSettings: NitroModelSettings) => {
  // Gather system information for CPU physical cores and memory
  const tcpPortUsed = require('tcp-port-used')
  return stopModel()
    .then(() => tcpPortUsed.waitUntilFree(PORT, 300, 5000))
    .then(() => {
      /**
       * There is a problem with Windows process manager
       * Should wait for awhile to make sure the port is free and subprocess is killed
       * The tested threshold is 500ms
       **/
      if (process.platform === 'win32') {
        return new Promise((resolve) => setTimeout(resolve, 500))
      } else {
        return Promise.resolve()
      }
    })
    .then(spawnNitroProcess)
    .then(() => loadLLMModel(modelSettings))
    .then(validateModelStatus)
    .catch((err) => {
      // TODO: Broadcast error so app could display proper error message
      logServer(`[NITRO]::Error: ${err}`)
      return { error: err }
    })
}

const spawnNitroProcess = async (): Promise<void> => {
  logServer(`[NITRO]::Debug: Spawning Nitro subprocess...`)

  let binaryFolder = join(getJanExtensionsPath(), '@janhq', 'inference-nitro-extension', 'dist', 'bin')
  // let binaryFolder = join(__dirname, '..', 'bin') // TODO: NamH check how to get this
  console.log(`NamH spawnNitroProcess binaryFolder: ${binaryFolder}`)
  let executableOptions = executableNitroFile()
  const tcpPortUsed = require('tcp-port-used')

  const args: string[] = ['1', LOCAL_HOST, PORT.toString()]
  // Execute the binary
  logServer(
    `[NITRO]::Debug: Spawn nitro at path: ${executableOptions.executablePath}, and args: ${args}`
  )
  subprocess = spawn(executableOptions.executablePath, ['1', LOCAL_HOST, PORT.toString()], {
    cwd: binaryFolder,
    env: {
      ...process.env,
      CUDA_VISIBLE_DEVICES: executableOptions.cudaVisibleDevices,
    },
  })

  // Handle subprocess output
  subprocess.stdout.on('data', (data: any) => {
    logServer(`[NITRO]::Debug: ${data}`)
  })

  subprocess.stderr.on('data', (data: any) => {
    logServer(`[NITRO]::Error: ${data}`)
  })

  subprocess.on('close', (code: any) => {
    logServer(`[NITRO]::Debug: Nitro exited with code: ${code}`)
    subprocess = undefined
  })

  tcpPortUsed.waitUntilUsed(PORT, 300, 30000).then(() => {
    logServer(`[NITRO]::Debug: Nitro is ready`)
  })
}

type NitroExecutableOptions = {
  executablePath: string
  cudaVisibleDevices: string
}

const executableNitroFile = (): NitroExecutableOptions => {
  const nvidiaInfoFilePath = join(getJanDataFolderPath(), 'settings', 'settings.json')
  let binaryFolder = join(getJanExtensionsPath(), '@janhq', 'inference-nitro-extension', 'dist', 'bin')
  console.log(`NamH binaryFolder: ${binaryFolder}`)

  let cudaVisibleDevices = ''
  let binaryName = 'nitro'
  /**
   * The binary folder is different for each platform.
   */
  if (process.platform === 'win32') {
    /**
     *  For Windows: win-cpu, win-cuda-11-7, win-cuda-12-0
     */
    let nvidiaInfo = JSON.parse(fs.readFileSync(nvidiaInfoFilePath, 'utf-8'))
    if (nvidiaInfo['run_mode'] === 'cpu') {
      binaryFolder = join(binaryFolder, 'win-cpu')
    } else {
      if (nvidiaInfo['cuda'].version === '12') {
        binaryFolder = join(binaryFolder, 'win-cuda-12-0')
      } else {
        binaryFolder = join(binaryFolder, 'win-cuda-11-7')
      }
      cudaVisibleDevices = nvidiaInfo['gpu_highest_vram']
    }
    binaryName = 'nitro.exe'
  } else if (process.platform === 'darwin') {
    /**
     *  For MacOS: mac-arm64 (Silicon), mac-x64 (InteL)
     */
    if (process.arch === 'arm64') {
      binaryFolder = join(binaryFolder, 'mac-arm64')
    } else {
      binaryFolder = join(binaryFolder, 'mac-x64')
    }
  } else {
    /**
     *  For Linux: linux-cpu, linux-cuda-11-7, linux-cuda-12-0
     */
    let nvidiaInfo = JSON.parse(fs.readFileSync(nvidiaInfoFilePath, 'utf-8'))
    if (nvidiaInfo['run_mode'] === 'cpu') {
      binaryFolder = join(binaryFolder, 'linux-cpu')
    } else {
      if (nvidiaInfo['cuda'].version === '12') {
        binaryFolder = join(binaryFolder, 'linux-cuda-12-0')
      } else {
        binaryFolder = join(binaryFolder, 'linux-cuda-11-7')
      }
      cudaVisibleDevices = nvidiaInfo['gpu_highest_vram']
    }
  }

  return {
    executablePath: join(binaryFolder, binaryName),
    cudaVisibleDevices,
  }
}

const validateModelStatus = async (): Promise<void> => {
  // Send a GET request to the validation URL.
  // Retry the request up to 3 times if it fails, with a delay of 500 milliseconds between retries.
  const fetchRT = require('fetch-retry')
  const fetchRetry = fetchRT(fetch)

  return fetchRetry(NITRO_HTTP_VALIDATE_MODEL_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    retries: 5,
    retryDelay: 500,
  }).then(async (res: Response) => {
    logServer(`[NITRO]::Debug: Validate model state success with response ${JSON.stringify(res)}`)
    // If the response is OK, check model_loaded status.
    if (res.ok) {
      const body = await res.json()
      // If the model is loaded, return an empty object.
      // Otherwise, return an object with an error message.
      if (body.model_loaded) {
        return Promise.resolve()
      }
    }
    return Promise.reject('Validate model status failed')
  })
}

const loadLLMModel = async (settings: NitroModelSettings): Promise<Response> => {
  logServer(`[NITRO]::Debug: Loading model with params ${JSON.stringify(settings)}`)
  const fetchRT = require('fetch-retry')
  const fetchRetry = fetchRT(fetch)

  return fetchRetry(NITRO_HTTP_LOAD_MODEL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(settings),
    retries: 3,
    retryDelay: 500,
  })
    .then((res: any) => {
      logServer(`[NITRO]::Debug: Load model success with response ${JSON.stringify(res)}`)
      return Promise.resolve(res)
    })
    .catch((err: any) => {
      logServer(`[NITRO]::Error: Load model failed with error ${err}`)
      return Promise.reject()
    })
}

// The subprocess instance for Nitro
let subprocess: ChildProcessWithoutNullStreams | undefined = undefined

export const stopModel = async () => {
  const controller = new AbortController()
  setTimeout(() => controller.abort(), 5000)
  logServer(`[NITRO]::Debug: Request to kill Nitro`)

  const tcpPortUsed = require('tcp-port-used')

  return fetch(NITRO_HTTP_KILL_URL, {
    method: 'DELETE',
    signal: controller.signal,
  })
    .then(() => {
      subprocess?.kill()
      subprocess = undefined
    })
    .catch(() => {})
    .then(() => tcpPortUsed.waitUntilFree(PORT, 300, 5000))
    .then(() => logServer(`[NITRO]::Debug: Nitro process is terminated`))
}

export const downloadModel = async (
  modelId: string,
  network?: { proxy?: string; ignoreSSL?: boolean }
) => {
  const strictSSL = !network?.ignoreSSL
  const proxy = network?.proxy?.startsWith('http') ? network.proxy : undefined
  const model = await retrieveBuilder(JanApiRouteConfiguration.models, modelId)
  if (!model || model.object !== 'model') {
    return {
      message: 'Model not found',
    }
  }

  const directoryPath = join(getJanDataFolderPath(), 'models', modelId)
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath)
  }

  // path to model binary
  const modelBinaryPath = join(directoryPath, modelId)

  const request = require('request')
  const progress = require('request-progress')

  for (const source of model.sources) {
    const rq = request({ url: source, strictSSL, proxy })
    progress(rq, {})
      .on('progress', function (state: any) {
        console.debug('progress', JSON.stringify(state, null, 2))
      })
      .on('error', function (err: Error) {
        console.error('error', err)
      })
      .on('end', function () {
        console.debug('end')
      })
      .pipe(fs.createWriteStream(modelBinaryPath))
  }

  return {
    message: `Starting download ${modelId}`,
  }
}

export const chatCompletions = async (request: any, reply: any) => {
  const modelList = await getBuilder(JanApiRouteConfiguration.models)
  const modelId = request.body.model

  const matchedModels = modelList.filter((model: Model) => model.id === modelId)
  if (matchedModels.length === 0) {
    const error = {
      error: {
        message: `The model ${request.body.model} does not exist`,
        type: 'invalid_request_error',
        param: null,
        code: 'model_not_found',
      },
    }
    reply.code(404).send(error)
    return
  }

  const requestedModel = matchedModels[0]
  const engineConfiguration = await getEngineConfiguration(requestedModel.engine)

  let apiKey: string | undefined = undefined
  let apiUrl: string = `http://${LOCAL_HOST}:${PORT}/inferences/llamacpp/chat_completion` // default nitro url

  if (engineConfiguration) {
    apiKey = engineConfiguration.api_key
    apiUrl = engineConfiguration.full_url
  }

  reply.raw.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
  })

  const headers: Record<string, any> = {
    'Content-Type': 'application/json',
  }

  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`
    headers['api-key'] = apiKey
  }
  console.debug(apiUrl)
  console.debug(JSON.stringify(headers))
  const fetch = require('node-fetch')
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(request.body),
  })
  if (response.status !== 200) {
    console.error(response)
    return
  } else {
    response.body.pipe(reply.raw)
  }
}
