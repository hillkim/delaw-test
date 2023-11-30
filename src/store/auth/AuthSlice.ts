import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'

interface AuthUser extends User {
  password?: string | null
  confirmPassword?: string | null
  emailAddress?: string | null
}

export interface AuthState {
  user?: AuthUser
  error?: string
  loading?: boolean
  loggedIn?: boolean
  token?: string
  appLanguage?: 'en' | 'he'
  appDirection?: 'ltr' | 'rtl'
}

const initialState: AuthState = {}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload
    },
    setAuthStart: (state) => {
      state.loading = true
      state.error = undefined
    },
    setAuthSuccess: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload
      state.loading = false
      state.error = undefined
    },
    setAuthFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    setAppLanguage: (state, action: PayloadAction<'en' | 'he'>) => {
      state.appLanguage = action.payload
      state.appDirection = action.payload === 'en' ? 'ltr' : 'rtl'
    }
  }
})

export const {
  setUser,
  setAuthStart,
  setAuthSuccess,
  setAuthFailure,
  setAppLanguage
} = authSlice.actions

export const authReducer = authSlice.reducer
