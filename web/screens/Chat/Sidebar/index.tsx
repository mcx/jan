/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import { InferenceEngine } from '@janhq/core'
import { Input, Textarea, Switch } from '@janhq/uikit'

import { atom, useAtomValue } from 'jotai'

import { twMerge } from 'tailwind-merge'

import LogoMark from '@/containers/Brand/Logo/Mark'
import CardSidebar from '@/containers/CardSidebar'

import DropdownListSidebar, {
  selectedModelAtom,
} from '@/containers/DropdownListSidebar'

import { useCreateNewThread } from '@/hooks/useCreateNewThread'

import { getConfigurationsData } from '@/utils/componentSettings'
import { toRuntimeParams, toSettingParams } from '@/utils/modelParam'

import AssistantSetting from '../AssistantSetting'
import EngineSetting from '../EngineSetting'
import ModelSetting from '../ModelSetting'

import SettingComponentBuilder from '../ModelSetting/SettingComponent'

import {
  activeThreadAtom,
  getActiveThreadModelParamsAtom,
} from '@/helpers/atoms/Thread.atom'

export const showRightSideBarAtom = atom<boolean>(true)

const Sidebar: React.FC = () => {
  const showing = useAtomValue(showRightSideBarAtom)
  const activeThread = useAtomValue(activeThreadAtom)
  const activeModelParams = useAtomValue(getActiveThreadModelParamsAtom)
  const selectedModel = useAtomValue(selectedModelAtom)
  const { updateThreadMetadata } = useCreateNewThread()

  const modelEngineParams = toSettingParams(activeModelParams)
  const modelRuntimeParams = toRuntimeParams(activeModelParams)
  const componentDataAssistantSetting = getConfigurationsData(
    (activeThread?.assistants[0]?.tools &&
      activeThread?.assistants[0]?.tools[0]?.settings) ??
      {}
  )
  const componentDataEngineSetting = getConfigurationsData(modelEngineParams)
  const componentDataRuntimeSetting = getConfigurationsData(modelRuntimeParams)

  return (
    <div
      className={twMerge(
        'h-full flex-shrink-0 overflow-x-hidden border-l border-border bg-background pb-6 transition-all duration-100 dark:bg-background/20',
        showing
          ? 'w-80 translate-x-0 opacity-100'
          : 'w-0 translate-x-full opacity-0'
      )}
    >
      <div
        className={twMerge(
          'flex flex-col gap-1 delay-200',
          showing ? 'animate-enter opacity-100' : 'opacity-0'
        )}
      >
        <div className="flex flex-col space-y-4 p-4">
          <div>
            <label
              id="thread-title"
              className="mb-2 inline-block font-bold text-gray-600 dark:text-gray-300"
            >
              Title
            </label>
            <Input
              id="thread-title"
              value={activeThread?.title}
              onChange={(e) => {
                if (activeThread)
                  updateThreadMetadata({
                    ...activeThread,
                    title: e.target.value || '',
                  })
              }}
            />
          </div>
          <div className="flex flex-col">
            <label
              id="thread-title"
              className="mb-2 inline-block font-bold text-zinc-500 dark:text-gray-300"
            >
              Threads ID
            </label>
            <span className="text-xs text-muted-foreground">
              {activeThread?.id || '-'}
            </span>
          </div>
        </div>

        <CardSidebar title="Assistant">
          <div className="flex flex-col space-y-4 p-2">
            <div className="flex items-center space-x-2">
              <LogoMark width={24} height={24} />
              <span className="font-bold capitalize">
                {activeThread?.assistants[0].assistant_name ?? '-'}
              </span>
            </div>
            <div>
              <label
                id="thread-title"
                className="mb-2 inline-block font-bold text-zinc-500 dark:text-gray-300"
              >
                Instructions
              </label>
              <Textarea
                id="assistant-instructions"
                placeholder="Eg. You are a helpful assistant."
                value={activeThread?.assistants[0].instructions ?? ''}
                onChange={(e) => {
                  if (activeThread)
                    updateThreadMetadata({
                      ...activeThread,
                      assistants: [
                        {
                          ...activeThread.assistants[0],
                          instructions: e.target.value || '',
                        },
                      ],
                    })
                }}
              />
            </div>

            <div>
              {activeThread?.assistants[0]?.tools &&
                componentDataAssistantSetting.length > 0 && (
                  <div className="mt-2">
                    <CardSidebar
                      title="Retrieval"
                      asChild
                      rightAction={
                        <Switch
                          name="retrieval"
                          className="mr-2"
                          checked={activeThread?.assistants[0].tools[0].enabled}
                          onCheckedChange={(e) => {
                            if (activeThread)
                              updateThreadMetadata({
                                ...activeThread,
                                assistants: [
                                  {
                                    ...activeThread.assistants[0],
                                    tools: [
                                      {
                                        type: 'retrieval',
                                        enabled: e,
                                        settings:
                                          (activeThread.assistants[0].tools &&
                                            activeThread.assistants[0].tools[0]
                                              ?.settings) ??
                                          {},
                                      },
                                    ],
                                  },
                                ],
                              })
                          }}
                        />
                      }
                    >
                      {activeThread?.assistants[0]?.tools[0].enabled && (
                        <div className="px-2 py-4">
                          <div className="mb-4">
                            <label
                              id="tool-title"
                              className="mb-2 inline-block font-bold text-zinc-500 dark:text-gray-300"
                            >
                              Embedding Engine
                            </label>
                            <div className="flex items-center justify-between">
                              <label className="font-medium text-zinc-500 dark:text-gray-300">
                                {selectedModel?.engine ===
                                InferenceEngine.openai
                                  ? 'OpenAI'
                                  : 'Nitro'}
                              </label>
                            </div>
                          </div>
                          <AssistantSetting
                            componentData={componentDataAssistantSetting}
                          />
                        </div>
                      )}
                    </CardSidebar>
                  </div>
                )}
            </div>
          </div>
        </CardSidebar>
        <CardSidebar title="Model">
          <div className="px-2 pt-4">
            <DropdownListSidebar />

            {componentDataRuntimeSetting.length > 0 && (
              <div className="mt-6">
                <CardSidebar title="Inference Parameters" asChild>
                  <div className="px-2 py-4">
                    <ModelSetting />
                  </div>
                </CardSidebar>
              </div>
            )}

            {componentDataEngineSetting.filter(
              (x) => x.name === 'prompt_template'
            ).length !== 0 && (
              <div className="mt-4">
                <CardSidebar title="Model Parameters" asChild>
                  <div className="px-2 py-4">
                    <SettingComponentBuilder
                      componentData={componentDataEngineSetting}
                      selector={(x: any) => x.name === 'prompt_template'}
                    />
                  </div>
                </CardSidebar>
              </div>
            )}

            {componentDataEngineSetting.length > 0 && (
              <div className="my-4">
                <CardSidebar title="Engine Parameters" asChild>
                  <div className="px-2 py-4">
                    <EngineSetting />
                  </div>
                </CardSidebar>
              </div>
            )}
          </div>
        </CardSidebar>
      </div>
    </div>
  )
}

export default React.memo(Sidebar)
