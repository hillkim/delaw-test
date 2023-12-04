import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { AppThunk } from '..'
import {
  setAuthSuccess,
  setAuthFailure,
  setAuthStart,
  setAuthUser,
  setAppLanguage,
  setAppTranslations
} from './AuthSlice'
import { auth, showErrorMessage, showSuccessMessage, logger } from '../../utils'
import translations from '../../utils/translations'

export const signInWithEmail =
  (email: string, password: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setAuthStart())
    const appTranslations = getState().auth.appTranslations

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      if (user) {
        dispatch(setAuthSuccess(user))
        logger('user_login', {
          method: 'email'
        })
        showSuccessMessage(appTranslations.messages?.signInSuccess ?? '')
      }
      setTimeout(() => {
        throw new Error('Not implemented')
      }, 3000)
    } catch (error) {
      const message = appTranslations.messages?.signInFailed ?? ''
      dispatch(setAuthFailure(message))
      showErrorMessage(message)
    }
  }

export const signUpWithEmail =
  (email: string, password: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setAuthStart())
    const appTranslations = getState().auth.appTranslations
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      if (user) {
        dispatch(setAuthSuccess(user))
        showSuccessMessage(appTranslations.messages?.signUpSuccess ?? '')
        logger('user_signup', {
          method: 'email'
        })
      }
      setTimeout(() => {
        throw new Error('Not implemented')
      }, 3000)
    } catch (error) {
      const message = appTranslations.messages?.signUpFailed ?? ''
      dispatch(setAuthFailure(message))
      logger('user_signup_failed', {
        method: 'email',
        error: error
      })
      showErrorMessage(message)
    }
  }

export const signInWithGoogle = (): AppThunk => async (dispatch, getState) => {
  dispatch(setAuthStart())
  const appTranslations = getState().auth.appTranslations
  try {
    const provider = new GoogleAuthProvider()
    const userCredential = await signInWithPopup(auth, provider)
    const user = userCredential.user
    console.log(user)
    if (user) {
      dispatch(setAuthSuccess(user))
      showSuccessMessage(appTranslations.messages?.signInSuccess ?? '')
      logger('user_login', {
        method: 'google'
      })
    }
  } catch (error) {
    const message = appTranslations.messages?.signInFailed ?? ''
    dispatch(setAuthFailure(message))
    showErrorMessage(message)
    logger('user_login_failed', {
      method: 'google',
      error: error
    })
  }
}

export const signOut = (): AppThunk => async (dispatch, getState) => {
  dispatch(setAuthStart())
  const appTranslations = getState().auth.appTranslations
  try {
    logger('user_logout')
    await auth.signOut()
    dispatch(setAuthUser(null as any))
    dispatch(setAuthSuccess(null as any))
  } catch (error) {
    const message = appTranslations.messages?.signOutFailed ?? ''
    dispatch(setAuthFailure(message))
    showErrorMessage(message)
    logger('user_logout_failed', {
      error: error
    })
  }
}

export const getAppLanguage = (): AppThunk => async (dispatch) => {
  const currentLanguage = localStorage.getItem('appLanguage')
  const languageFromLcale = navigator.language.includes('en') ? 'en' : 'he'
  const language = (currentLanguage as 'en' | 'he') ?? languageFromLcale
  dispatch(setAppLanguage(language))
  dispatch(setAppTranslations(translations[language]))
}

export const setAppLanguageToLocalStorage =
  (language: 'en' | 'he'): AppThunk =>
  async (dispatch) => {
    localStorage.setItem('appLanguage', language)
    dispatch(setAppLanguage(language))
    dispatch(setAppTranslations(translations[language]))
  }
