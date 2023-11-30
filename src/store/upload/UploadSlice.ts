import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FileDetails {
  name: string
  type: string
  uploadedOn: string
  numberOfPages: string
  sizeOfFile: string
}

export interface UploadState {
  fileDetails?: FileDetails
  error?: string
  loading?: boolean
  files?: FileDetails[]
}

const initialState: UploadState = {}

export const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setFileDetails: (state, action: PayloadAction<FileDetails>) => {
      state.fileDetails = action.payload
    },
    setUploadStart: (state) => {
      state.loading = true
      state.error = undefined
    },
    setUploadSuccess: (state, action: PayloadAction<FileDetails>) => {
      state.fileDetails = action.payload
      state.loading = false
      state.error = undefined
    },
    setUploadFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const {
  setFileDetails,
  setUploadStart,
  setUploadSuccess,
  setUploadFailure
} = uploadSlice.actions

export const uploadReducer = uploadSlice.reducer
