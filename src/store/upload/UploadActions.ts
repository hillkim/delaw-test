import Docxtemplater from 'docxtemplater'
import { PDFDocument } from 'pdf-lib'
import PizZip from 'pizzip'
import {
  deleteObject,
  getDownloadURL,
  getMetadata,
  ref,
  uploadBytesResumable
} from 'firebase/storage'
import {
  auth,
  firestore,
  logger,
  showSuccessMessage,
  storage
} from '../../utils'
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore'
import {
  AppThunk,
  FileDetails,
  setUploadedFiles,
  setUploadingLoading
} from '..'

/**
 * Get number of pages in a file - input file can be a PDF or Word document
 * @param file - input file
 * @returns number of pages in the file
 * @example
 * const file = new File([''], 'file.pdf', { type: 'application/pdf' })
 * const pages = await getNumberOfPages(file)
 * console.log(pages) // 2
 */
export const getNumberOfPages = async (file: File) => {
  const extension = file.name.split('.').pop()?.toLowerCase()
  if (extension === 'pdf') {
    const pdfDoc = await PDFDocument.load(await file.arrayBuffer(), {
      ignoreEncryption: true
    })
    return pdfDoc.getPageCount()
  } else if (extension === 'docx' || extension === 'doc') {
    const content = await file.arrayBuffer()
    const zip = new PizZip(content)
    const doc = new Docxtemplater()
    doc.loadZip(zip)
    return doc.getZip().file(/word\/document.xml/g).length
  } else {
    throw new Error('Invalid file type')
  }
}

/**
 * Upload a file to Firebase Storage
 * @param file - input file
 * @param path - path to upload the file to
 * @param onProgress - callback function to track upload progress
 * @returns download URL of the uploaded file
 */
export const uploadFileToStorage = async (
  file: File,
  path: string,
  onProgress: (progress: number) => void
) => {
  const storageRef = ref(storage, path)
  const uploadTask = uploadBytesResumable(storageRef, file)
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      onProgress(progress)
    },
    (error) => {
      throw error
    }
  )
  await uploadTask
  logger('file_upload', {
    file_name: file.name,
    file_type: file.type,
    file_size: file.size
  })
  return getDownloadURL(storageRef)
}

/**
 * Delete a file from Firebase Storage
 * @param path - path of the file to delete
 */
export const deleteFileFromStorage = async (path: string) => {
  const storageRef = ref(storage, path)
  await deleteObject(storageRef)
}

/**
 * Get metadata of a file from Firebase Storage
 * @param path - path of the file
 * @returns metadata of the file
 */
export const getFileMetadata = async (path: string) => {
  const storageRef = ref(storage, path)
  return getMetadata(storageRef)
}

/**
 * Add file details to Firestore
 * @param fileDetails - file details to add
 * @example
 * const fileDetails = {
 *  name: 'file.pdf',
 * type: 'application/pdf',
 * uploadedOn: '2021-08-01T12:00:00.000Z',
 * numberOfPages: 2,
 * sizeOfFile: '100 KB',
 * url: 'https://firebasestorage.googleapis.com/v0/b/...'
 * }
 */
export const addFileDetailsToFirestore = async (fileDetails: any) => {
  const currentUserId = auth.currentUser?.uid
  try {
    const userPath = `users/${currentUserId}/uploadedFiles`
    const fileRef = collection(firestore, userPath)
    const docRef = await addDoc(fileRef, fileDetails)
    logger('file_details_added', {
      file_name: fileDetails.name,
      file_type: fileDetails.type,
      file_size: fileDetails.sizeOfFile,
      file_url: fileDetails.url
    })
    return docRef.id
  } catch (error) {
    console.log('error', error)
  }
}

/**
 * Upload a file to Firebase Storage and add file details to Firestore
 * @param file - input file
 * @param path - path to upload the file to
 * @param onProgress - callback function to track upload progress
 * @returns download URL of the uploaded file
 */
export const getAllUploadedFiles =
  (currentUserId: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setUploadingLoading(true))
    console.log('currentUserId', currentUserId)
    const userPath = `users/${currentUserId}/uploadedFiles`
    console.log('userPath', userPath)
    const fileRef = collection(firestore, userPath)
    const querySnapshot = await getDocs(fileRef)
    const files = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
    dispatch(setUploadedFiles(files as FileDetails[]))
    dispatch(setUploadingLoading(false))
  }

/**
 * Delete a file from Firebase Storage and Firestore
 * @param currentUserId - current user ID
 * @param fileUrl - download URL of the file to delete
 * @param docId - document ID of the file to delete
 * @example
 * const fileUrl = 'https://firebasestorage.googleapis.com/v0/b/...'
 * const docId = '1234567890'
 * deleteFileFromFirestore(fileUrl, docId)
 * @returns download URL of the uploaded file
 */
export const deleteFileFromFirestore =
  (
    currentUserId: string,
    { fileUrl, docId }: { fileUrl: string; docId: string }
  ): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setUploadingLoading(true))
    const appTranslations = getState().auth.appTranslations
    try {
      const userPath = `users/${currentUserId}/uploadedFiles`
      const fileRef = doc(firestore, userPath, docId)
      await deleteDoc(fileRef)
      // delete file from storage bucket
      await deleteFileFromStorage(fileUrl)
      showSuccessMessage(appTranslations.messages?.fileDeleteSuccess ?? '')
      logger('file_details_deleted', {
        file_url: fileUrl
      })
    } catch (error) {
      console.log('error', error)
    }
    dispatch(getAllUploadedFiles(currentUserId))
    dispatch(setUploadingLoading(false))
  }
