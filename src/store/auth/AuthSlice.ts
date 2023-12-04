import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'
import { getAppLanguage } from './AuthActions'
import translations from '../../utils/translations'

interface AuthUser extends User {
  password?: string | null
  confirmPassword?: string | null
  emailAddress?: string | null
}

export interface AuthState {
  user?: AuthUser | null
  error?: string
  loading?: boolean
  appLanguage?: 'en' | 'he'
  appDirection?: 'ltr' | 'rtl'
  appTranslations?: any
}

const initialState: AuthState = {
  appLanguage: (localStorage.getItem('appLanguage') as 'en' | 'he') ?? 'en',
  appDirection: 'ltr',
  appTranslations: translations['en']
}

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
      localStorage.setItem('appLanguage', action.payload)
      state.appDirection = action.payload === 'en' ? 'ltr' : 'rtl'
    },
    setAppTranslations: (state, action: PayloadAction<any>) => {
      state.appTranslations = action.payload
    },
    setAuthUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload
    }
  }
})

export const {
  setUser,
  setAuthStart,
  setAuthSuccess,
  setAuthFailure,
  setAppLanguage,
  setAuthUser,
  setAppTranslations
} = authSlice.actions

export const authReducer = authSlice.reducer
