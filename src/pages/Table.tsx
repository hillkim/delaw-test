import React from 'react'
import {
  deleteFileFromFirestore,
  getAllUploadedFiles,
  useAppDispatch,
  useAppSelector
} from '../store'
import { EyeIcon, DeleteIcon, SearchIcon } from '../components/icons'

const Table = () => {
  const dispatch = useAppDispatch()
  const files = useAppSelector((state) => state.upload.files)
  const currentUserId = useAppSelector((state) => state.auth.user?.uid)
  const translations = useAppSelector((state) => state.auth.appTranslations)
  const isLoading = useAppSelector((state) => state.upload.loading)

  const [searchQuery, setSearchQuery] = React.useState('')

  React.useEffect(() => {
    dispatch(getAllUploadedFiles(currentUserId))
  }, [])

  const filterFiles = React.useMemo(() => {
    if (searchQuery === '') {
      return files
    }
    return files.filter(
      (item: any) =>
        (item.name &&
          item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.type &&
          item.type.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.uploadedOn &&
          item.uploadedOn.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.sizeOfFile &&
          item.sizeOfFile.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [searchQuery, files])

  const texts = translations.table

  interface UploadedFileType {
    name: string
    type: string
    uploadedOn: string
    numberOfPages: string
    sizeOfFile: string
    actions: {
      name: string
      url: string
      onClick: () => void
      type: 'view' | 'delete'
    }[]
  }

  const renderCell = (text: string, index: number) => {
    return (
      <td
        className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm"
        key={text + index}
      >
        <p className="text-gray-900 whitespace-no-wrap">{text}</p>
      </td>
    )
  }

  const renderActions = (
    actions: {
      name: string
      url: string
      onClick: () => void
      type: 'view' | 'delete'
    }[]
  ) => {
    return (
      <td
        className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm"
        key={actions[0].name}
      >
        <div className="flex items-center">
          {actions.map(({ name, url, onClick, type }, index) => (
            <button
              onClick={onClick}
              className="text-gray-900 whitespace-no-wrap mr-2 items-center flex gap-2 flex-col mx-2"
              key={index}
            >
              {type === 'view' ? (
                <EyeIcon />
              ) : (
                <DeleteIcon className="text-red-500" />
              )}
              {name}
            </button>
          ))}
        </div>
      </td>
    )
  }

  const renderRow = (fileData: UploadedFileType, index: number) => (
    <tr key={fileData.name + index} className="hover:bg-gray-200">
      {Object.values(fileData).map((value, index) => {
        return Array.isArray(value)
          ? renderActions(value)
          : renderCell(value, index)
      })}
    </tr>
  )

  const onDelete = (id: string, fileUrl: string) => {
    dispatch(
      deleteFileFromFirestore(currentUserId, {
        fileUrl,
        docId: id
      })
    )
  }
  const onView = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <div className="bg-white p-8 rounded-md w-full h-screen relative">
      {isLoading && (
        <div className="flex justify-center items-center w-full absolute top-0 left-0 h-full bg-white opacity-50 z-10">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      )}

      <div className=" flex content-center md:items-center  md:justify-between pb-6 flex-col md:flex-row  mt-10">
        <div className="my-3">
          <h2 className="text-gray-600 font-semibold text-lg">{texts.title}</h2>
          <span className="text-sm text-gray-600">{texts.subtitle}</span>
        </div>
        <div className="flex items-center justify-between flex-col md:flex-row gap-2 ">
          <div className="flex bg-gray-50 items-center px-4 py-2 rounded-xl w-full  ">
            <SearchIcon height={20} />
            <input
              className="bg-gray-50 outline-none ml-1 block border-none w-full text-gray-600 active:border-none active:outline-none focus:outline-none focus:border-none"
              type="text"
              name=""
              id=""
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={texts.searchPlaceholder}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  {texts.tableTitles.map((title: string) => (
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-[#4054B2] text-xs font-semibold text-white uppercase tracking-wider text-left rtl:text-right "
                      key={title}
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filterFiles?.length === 0 && (
                  <tr>
                    <td
                      colSpan={texts.tableTitles.length}
                      className="text-center py-5"
                    >
                      {texts.noFiles}
                    </td>
                  </tr>
                )}

                {filterFiles?.map(
                  (
                    {
                      name,
                      type,
                      uploadedOn,
                      numberOfPages,
                      sizeOfFile,
                      url,
                      id
                    }: any,
                    index: number
                  ) =>
                    renderRow(
                      {
                        name,
                        type,
                        uploadedOn: new Date(uploadedOn).toLocaleDateString(), // format date
                        numberOfPages,
                        sizeOfFile,
                        actions: [
                          {
                            name: texts.actions.view,
                            url,
                            onClick: () => {
                              onView(url)
                            },
                            type: 'view'
                          },
                          {
                            name: texts.actions.delete,
                            url,
                            onClick: () => {
                              onDelete(id, url)
                            },
                            type: 'delete'
                          }
                        ]
                      },
                      index
                    )
                )}
              </tbody>
            </table>
            {/* <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
              <span className="text-xs xs:text-sm text-gray-900">
                {texts.showing}
              </span>
              <div className="inline-flex mt-2 xs:mt-0 w-40  flex-row justify-between">
                <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-[#4054B2] font-semibold py-2 px-4 rounded-l">
                  {texts.prev}
                </button>
                &nbsp; &nbsp;
                <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-[#4054B2] font-semibold py-2 px-4 rounded-r">
                  {texts.next}
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
