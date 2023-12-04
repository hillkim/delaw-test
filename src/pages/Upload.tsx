import React from 'react'
import { PrimaryButton } from '../components/Buttons'
import {
  addFileDetailsToFirestore,
  getNumberOfPages,
  setUploadStart,
  uploadFileToStorage,
  useAppDispatch,
  useAppSelector,
  setUploadingLoading
} from '../store'
import Input from '../components/Input'
import { showErrorMessage, showSuccessMessage } from '../utils'

const UploadForm = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const isLoading = useAppSelector((state) => state.upload.loading)
  const translations = useAppSelector((state) => state.auth.appTranslations)
  const uploadTexts = translations.upload

  const [files, setFiles] = React.useState<FileList | null>(null)
  const [numberOfPages, setNumberOfPages] = React.useState<number>(0)
  const [hasToEnterNumberOfPages, setHasToEnterNumberOfPages] =
    React.useState<boolean>(false)

  const supportedFileTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'image/jpg',
    'image/gif',
    'image/bmp',
    'image/tiff'
  ]
  const fileTypesWithNumberOfPages = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword'
  ]

  const getFileType = (file: File) => {
    if (file.type === 'application/pdf') {
      return uploadTexts.files.pdf
    } else if (
      file.type ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      return uploadTexts.files.docx
    } else if (file.type === 'application/msword') {
      return uploadTexts.files.doc
    } else if (file.type === 'image/jpeg') {
      return uploadTexts.files.jpeg
    } else if (file.type === 'image/png') {
      return uploadTexts.files.png
    } else if (file.type === 'image/jpg') {
      return uploadTexts.files.jpg
    } else if (file.type === 'image/gif') {
      return uploadTexts.files.gif
    } else if (file.type === 'image/bmp') {
      return uploadTexts.files.bmp
    } else if (file.type === 'image/tiff') {
      return uploadTexts.files.tiff
    }

    return ''
  }

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
    if (e.target.files) {
      console.log(e.target.files[0].type)
      if (!supportedFileTypes.includes(e.target.files[0].type)) {
        showErrorMessage(uploadTexts.invalidFileType)
        return
      }

      setFiles(e.target.files)
      if (fileTypesWithNumberOfPages.includes(e.target.files[0].type)) {
        setNumberOfPages(await getNumberOfPages(e.target.files[0]))
        setHasToEnterNumberOfPages(false)
      } else {
        setHasToEnterNumberOfPages(true)
        setNumberOfPages(0)
        showSuccessMessage(uploadTexts.addPages)
      }
    }
  }

  const addPageCount = (value: string) => {
    console.log(value)
    if (value === '') {
      setNumberOfPages(0)
      return
    }
    const positiveNumber = /^[0-9\b]+$/
    if (!positiveNumber.test(value)) {
      showErrorMessage(uploadTexts.validNumberOfPages)
      setNumberOfPages(0)
      return
    }

    const pages = parseInt(value)

    if (pages > 0) {
      setNumberOfPages(pages)
    } else {
      showErrorMessage(uploadTexts.validNumberOfPages)
      setNumberOfPages(0)
    }
  }

  const renderAttribute = (
    attributeName: string,
    attributeValue: string | number
  ) => (
    <span className="text-sm text-gray-500 tracking-wide">
      {attributeName} : <b>{attributeValue}</b>
    </span>
  )

  const uploadFile = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    if (!files) {
      return
    }

    dispatch(setUploadStart())
    try {
      const file = files[0]
      // generate local url
      const url = URL.createObjectURL(file)

      const remoteUrl = await uploadFileToStorage(
        file,
        'files/' + getFileType(file) + '/' + file.name,
        (progress) => {
          console.log('progress', progress)
        }
      )

      if (remoteUrl) {
        await addFileDetailsToFirestore({
          name: file.name,
          type: getFileType(file),
          size: file.size,
          uploadedOn: new Date().toISOString(),
          sizeOfFile: `${(file.size / 1000 / 1000).toFixed(2)} MB`,
          numberOfPages,
          url: remoteUrl
        })
      }

      console.log(url)
      console.log(file)
      showSuccessMessage(translations.messages.fileUploadSuccess)
      dispatch(setUploadingLoading(false))
    } catch (error) {
      console.log(error)
      dispatch(setUploadingLoading(false))
    }
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover relative items-center">
      <div className="absolute bg-black opacity-10 inset-0 z-0"></div>
      <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10 mt-10">
        <div className="text-center">
          <h2 className="mt-5 text-3xl font-bold text-gray-900">
            {uploadTexts.title}
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            {uploadTexts.description}
          </p>
        </div>
        <form className="mt-8 space-y-3" action="#">
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">
              {uploadTexts.attachDocument}
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                <div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                  <div className="flex  items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-blue-400 group-hover:text-blue-600 align-middle"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <p className="pointer-none text-gray-500 ">
                    {uploadTexts.dragDropFiles}
                  </p>
                </div>
                <input type="file" className="hidden" onChange={onChange} />
              </label>
            </div>
          </div>
          <p className="text-sm text-gray-300">
            <span>{uploadTexts.fileType}</span>
          </p>

          <div className="flex flex-col  justify-between">
            {files && (
              <>
                <div className=" flex flex-col ">
                  <span className="text-sm text-gray-500 tracking-wide"></span>
                  {files?.[0] && (
                    <>
                      {renderAttribute(uploadTexts.name, files?.[0].name)}
                      {renderAttribute(
                        uploadTexts.size,
                        `${(files?.[0].size / 1000 / 1000).toFixed(2)} MB`
                      )}
                      {renderAttribute(
                        uploadTexts.type,
                        getFileType(files?.[0])
                      )}
                      {numberOfPages > 0 &&
                        renderAttribute(uploadTexts.pages, numberOfPages)}
                    </>
                  )}
                </div>
                <div className="flex  flex-col my-3">
                  {hasToEnterNumberOfPages && (
                    <>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="text-sm  text-gray-500 tracking-wide ">
                          {uploadTexts.filePagesNotSupported}
                        </span>
                      </div>
                      <Input
                        placeholder={uploadTexts.numberOfPages}
                        type="number"
                        required
                        onChange={addPageCount}
                      />
                    </>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="w-full items-center">
            <PrimaryButton
              text={uploadTexts.upload}
              onClick={uploadFile}
              isloading={isLoading && files !== null}
              disabled={numberOfPages === 0 && hasToEnterNumberOfPages}
              customClass="w-full"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default UploadForm
