import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import { AppThunk } from '..'
import { setAuthSuccess, setAuthFailure, setAuthStart } from './AuthSlice'
import { app, showErrorMessage } from '../../utils'

export const auth = getAuth(app)

export const signInWithEmail =
  (email: string, password: string): AppThunk =>
  async (dispatch) => {
    dispatch(setAuthStart())
    try {
      //   const userCredential = await signInWithEmailAndPassword(
      //     auth,

      //     email,
      //     password
      //   )
      //   const user = userCredential.user

      //   if (user) {
      //     dispatch(setAuthSuccess(user))
      //   }
      setTimeout(() => {
        throw new Error('Not implemented')
      }, 3000)
    } catch (error) {
      const message = "Couldn't sign in. Please try again."
      dispatch(setAuthFailure(message))
      showErrorMessage(message)
    }
  }
