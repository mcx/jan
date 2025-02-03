/*  eslint-disable @typescript-eslint/naming-convention */
import { useCallback, useMemo, useRef, useState, useEffect } from 'react'

import { useDropzone } from 'react-dropzone'

import Image from 'next/image'

import { ModelSource } from '@janhq/core'

import { ScrollArea, Button, Select, Tabs, useClickOutside } from '@janhq/joi'
import { motion as m } from 'framer-motion'

import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { ImagePlusIcon, UploadCloudIcon, UploadIcon } from 'lucide-react'

import { twMerge } from 'tailwind-merge'

import CenterPanelContainer from '@/containers/CenterPanelContainer'
import ModelSearch from '@/containers/ModelSearch'

import { useGetEngineModelSources } from '@/hooks/useEngineManagement'
import { setImportModelStageAtom } from '@/hooks/useImportModel'

import {
  useGetModelSources,
  useModelSourcesMutation,
} from '@/hooks/useModelSource'

import ModelList from '@/screens/Hub/ModelList'

import { extractModelRepo } from '@/utils/modelSource'
import { fuzzySearch } from '@/utils/search'

import ModelPage from './ModelPage'

import {
  getAppBannerHubAtom,
  setAppBannerHubAtom,
} from '@/helpers/atoms/App.atom'
import { modelDetailAtom } from '@/helpers/atoms/Model.atom'

const sortMenus = [
  {
    name: 'Most downloaded',
    value: 'most-downloaded',
  },
  {
    name: 'Newest',
    value: 'newest',
  },
]
const filterOptions = [
  {
    name: 'All',
    value: 'all',
  },
  {
    name: 'On-device',
    value: 'on-device',
  },
  {
    name: 'Cloud',
    value: 'cloud',
  },
]

const HubScreen = () => {
  const { sources } = useGetModelSources()
  const { sources: remoteModelSources } = useGetEngineModelSources()
  const { addModelSource } = useModelSourcesMutation()
  const [searchValue, setSearchValue] = useState('')
  const [sortSelected, setSortSelected] = useState('newest')
  const [filterOption, setFilterOption] = useState('all')
  const [hubBannerOption, setHubBannerOption] = useState('gallery')
  const [showHubBannerSetting, setShowHubBannerSetting] = useState(false)
  const appBannerHub = useAtomValue(getAppBannerHubAtom)
  const setAppBannerHub = useSetAtom(setAppBannerHubAtom)
  const [selectedModel, setSelectedModel] = useState<ModelSource | undefined>(
    undefined
  )
  const [modelDetail, setModelDetail] = useAtom(modelDetailAtom)
  const setImportModelStage = useSetAtom(setImportModelStageAtom)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const hubBannerSettingRef = useRef<HTMLDivElement>(null)

  const searchedModels = useMemo(
    () =>
      searchValue.length
        ? (sources?.filter((e) =>
            fuzzySearch(
              searchValue.replaceAll(' ', '').toLowerCase(),
              e.id.toLowerCase()
            )
          ) ?? [])
        : [],
    [sources, searchValue]
  )

  const sortedModels = useMemo(() => {
    if (!sources) return []
    return sources.sort((a, b) => {
      if (sortSelected === 'most-downloaded') {
        return b.metadata.downloads - a.metadata.downloads
      } else {
        return (
          new Date(b.metadata.createdAt).getTime() -
          new Date(a.metadata.createdAt).getTime()
        )
      }
    })
  }, [sortSelected, sources])

  useEffect(() => {
    if (modelDetail) {
      setSelectedModel(sources?.find((e) => e.id === modelDetail))
      setModelDetail(undefined)
    }
  }, [modelDetail, sources, setModelDetail, addModelSource])

  useEffect(() => {
    if (selectedModel) {
      // Try add the model source again to update it's data
      addModelSource(selectedModel.id).catch(console.debug)
    }
  }, [sources, selectedModel, addModelSource, setSelectedModel])

  useClickOutside(
    () => {
      setSearchValue('')
    },
    null,
    [dropdownRef.current]
  )

  useClickOutside(
    () => {
      setShowHubBannerSetting(false)
    },
    null,
    [hubBannerSettingRef.current]
  )

  const onImportModelClick = useCallback(() => {
    setImportModelStage('SELECTING_MODEL')
  }, [setImportModelStage])

  const onSearchUpdate = useCallback((input: string) => {
    setSearchValue(input)
  }, [])

  const setBannerHubImage = (image: string) => {
    setShowHubBannerSetting(false)
    setAppBannerHub(image)
  }

  /**
   * Handles the change event of the extension file input element by setting the file name state.
   * Its to be used to display the extension file name of the selected file.
   * @param event - The change event object.
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const fileType = file.type
    if (!fileType.startsWith('image/')) {
      alert('Please upload an image file.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      // FileReader result is already in a valid Base64 format
      setBannerHubImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const { isDragActive, getRootProps } = useDropzone({
    noClick: true,
    multiple: true,
    accept: {
      'image/jpeg': ['.jpeg'],
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
    },
    onDrop: (files) => {
      const reader = new FileReader()
      reader.onload = () => {
        // FileReader result is already in a valid Base64 format
        setBannerHubImage(reader.result as string)
      }
      reader.readAsDataURL(files[0])
    },
  })

  return (
    <CenterPanelContainer>
      <m.div
        key={selectedModel?.id}
        initial={{ opacity: 0, y: -8 }}
        className="h-full"
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.25,
          },
        }}
      >
        {!selectedModel && (
          <ScrollArea
            data-testid="hub-container-test-id"
            className="h-full w-full"
          >
            <>
              <div className="relative h-40 p-4 sm:h-auto">
                <div className="group">
                  <Image
                    src={appBannerHub}
                    alt="Hub Banner"
                    width={800}
                    height={800}
                    className="h-60 w-full rounded-lg object-cover"
                  />
                  <div
                    className={twMerge(
                      'invisible absolute bottom-8 right-8 cursor-pointer opacity-0 transition-opacity',
                      'duration-300 group-hover:visible group-hover:opacity-100',
                      showHubBannerSetting && '!visible !opacity-100'
                    )}
                  >
                    <div
                      className="h-full w-full rounded-lg border-2 border-[hsla(var(--app-border))] bg-white p-2"
                      onClick={() =>
                        setShowHubBannerSetting(!showHubBannerSetting)
                      }
                    >
                      <ImagePlusIcon size={16} />
                    </div>
                    <div
                      className={twMerge(
                        'absolute right-0 z-20 mt-2 w-[350px] overflow-hidden rounded-lg border border-[hsla(var(--app-border))] bg-[hsla(var(--app-bg))] shadow-sm',
                        showHubBannerSetting ? 'flex' : 'hidden'
                      )}
                      ref={hubBannerSettingRef}
                    >
                      <div className="h-full w-full">
                        <div className="mb-2 p-2 pb-0">
                          <Tabs
                            options={[
                              { name: 'Gallery', value: 'gallery' },
                              { name: 'Upload', value: 'upload' },
                            ]}
                            tabStyle="segmented"
                            value={hubBannerOption as string}
                            onValueChange={(value) => setHubBannerOption(value)}
                          />
                        </div>
                        {hubBannerOption === 'gallery' && (
                          <ScrollArea className="h-[350px] w-full">
                            {Array.from({ length: 30 }, (_, i) => i + 1).map(
                              (e) => {
                                return (
                                  <div
                                    key={e}
                                    className="mb-2 h-20 w-full "
                                    onClick={() =>
                                      setBannerHubImage(
                                        `./images/HubBanner/banner-${e}.jpg`
                                      )
                                    }
                                  >
                                    <Image
                                      className="ml-2 mr-2 h-20 w-[334px] overflow-hidden rounded-lg border-b border-[hsla(var(--app-border))] bg-[hsla(var(--app-bg))] object-cover"
                                      width={920}
                                      height={200}
                                      alt="banner-img"
                                      src={`./images/HubBanner/banner-${e}.jpg`}
                                    />
                                  </div>
                                )
                              }
                            )}
                          </ScrollArea>
                        )}
                        {hubBannerOption === 'upload' && (
                          <div
                            className={`m-2 flex h-[172px] w-full cursor-pointer items-center justify-center rounded-md border`}
                            onClick={() => {
                              imageInputRef.current?.click()
                            }}
                            {...getRootProps()}
                          >
                            <div className="flex flex-col items-center justify-center">
                              <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                                <UploadCloudIcon
                                  size={24}
                                  className={
                                    isDragActive
                                      ? 'text-[hsla(var(--primary-bg))]'
                                      : 'text-[hsla(var(--text-secondary))]'
                                  }
                                />
                              </div>
                              <div className="mt-4 text-center">
                                {!isDragActive && (
                                  <>
                                    <span className="text-primary font-bold text-[hsla(var(--primary-bg))]">
                                      Click to upload &nbsp;
                                    </span>
                                    <span className="text-[hsla(var(--text-secondary))]">
                                      or drag and drop
                                    </span>
                                    <p className="text-[hsla(var(--text-secondary))]">
                                      Image size: 920x200
                                    </p>
                                  </>
                                )}
                                {isDragActive && (
                                  <span className="text-primary font-bold text-[hsla(var(--primary-bg))]">
                                    Drop here
                                  </span>
                                )}
                                <input
                                  type="file"
                                  className="hidden"
                                  ref={imageInputRef}
                                  value=""
                                  onChange={handleFileChange}
                                  accept="image/png, image/jpeg, image/jpg"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 top-1/2 z-10 mx-auto w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-xl sm:w-2/6">
                  <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
                    <div className="w-full" ref={dropdownRef}>
                      <ModelSearch onSearchLocal={onSearchUpdate} />
                      <div
                        className={twMerge(
                          'invisible absolute mt-2 w-full overflow-hidden rounded-lg border border-[hsla(var(--app-border))] bg-[hsla(var(--app-bg))] shadow-lg',
                          searchedModels.length > 0 && 'visible'
                        )}
                      >
                        {searchedModels.map((model) => (
                          <div
                            key={model.id}
                            className="z-10 flex cursor-pointer items-center space-x-2 px-4 py-2 hover:bg-[hsla(var(--dropdown-menu-hover-bg))]"
                            onClick={(e) => {
                              setSelectedModel(model)
                              e.stopPropagation()
                            }}
                          >
                            <span className="text-bold flex flex-row text-[hsla(var(--app-text-primary))]">
                              {searchValue.includes('huggingface.co') && (
                                <>
                                  <Image
                                    src={'icons/huggingFace.svg'}
                                    width={16}
                                    height={16}
                                    className="mr-2"
                                    alt=""
                                  />{' '}
                                </>
                              )}
                              {extractModelRepo(model.id)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute right-8 top-8 flex-shrink-0 rounded-md bg-[hsla(var(--app-bg))]">
                  <Button
                    onClick={onImportModelClick}
                    variant="solid"
                    theme="ghost"
                  >
                    <UploadIcon size={16} className="mr-2" />
                    <span>Import</span>
                  </Button>
                </div>
              </div>
              <div className="mt-8 p-4 py-0 sm:px-16">
                <>
                  <div className="flex flex-row">
                    <div className="flex w-full flex-col items-start justify-between gap-4 py-4 first:pt-0 sm:flex-row">
                      <div className="flex items-center gap-x-2">
                        {filterOptions.map((e) => (
                          <div
                            key={e.value}
                            className={twMerge(
                              'rounded-md border duration-200 hover:border-gray-200 hover:bg-gray-200',
                              e.value === filterOption
                                ? 'border-gray-200 bg-gray-200'
                                : 'border-[hsla(var(--app-border))] bg-[hsla(var(--app-bg))]'
                            )}
                          >
                            <Button
                              theme={'ghost'}
                              variant={'soft'}
                              onClick={() => setFilterOption(e.value)}
                            >
                              {e.name}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4 flex w-full justify-end">
                      <Select
                        value={sortSelected}
                        onValueChange={(value) => {
                          setSortSelected(value)
                        }}
                        options={sortMenus}
                      />
                    </div>
                  </div>
                  {(filterOption === 'on-device' || filterOption === 'all') && (
                    <ModelList
                      models={sortedModels}
                      onSelectedModel={(model) => setSelectedModel(model)}
                    />
                  )}
                  {(filterOption === 'cloud' || filterOption === 'all') && (
                    <ModelList
                      models={remoteModelSources}
                      onSelectedModel={(model) => setSelectedModel(model)}
                    />
                  )}
                </>
              </div>
            </>
          </ScrollArea>
        )}
        {selectedModel && (
          <ModelPage
            model={selectedModel}
            onGoBack={() => {
              setSearchValue('')
              setSelectedModel(undefined)
            }}
          />
        )}
      </m.div>
    </CenterPanelContainer>
  )
}

export default HubScreen
