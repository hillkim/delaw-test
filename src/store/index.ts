import {
  configureStore,
  combineReducers,
  Action,
  ThunkAction
} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { authReducer } from './auth'
import { uploadReducer } from './upload'

/**
 * @description
 * This is the root reducer for the application.
 * It combines all the reducers from the different slices.
 *
 */

export const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    upload: uploadReducer
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

/**
 * @description
 * This is the root state for the application.
 * It is used to define the type of the useSelector hook.
 *
 */

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store

/**
 * @description
 * This file is used to export all the reducers from the different slices.
 * This is done so that we can import all the reducers from a single file.
 *
 */
export * from './upload'
export * from './auth'
