import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginForm from './pages/LoginForm'
import SignUpForm from './pages/SignUpForm'
import UploadForm from './pages/Upload'
import Table from './pages/Table'
import { onAuthStateChanged } from 'firebase/auth'
import {
  getAllUploadedFiles,
  getAppLanguage,
  setAppLanguageToLocalStorage,
  setAuthUser,
  useAppDispatch,
  useAppSelector
} from './store'
import React from 'react'
import { auth } from './utils'
import Header from './components/Header'
import { DropDown } from './components/Input'
import Footer from './components/Footer'

const App = () => {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = React.useState(true)
  const user = useAppSelector((state) => state.auth.user)
  const appDirection = useAppSelector((state) => state.auth.appDirection)
  const appLanguage = useAppSelector((state) => state.auth.appLanguage)

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('user', user)
        dispatch(setAuthUser(user))
        dispatch(getAllUploadedFiles(user.uid))
        setIsLoading(false)
        if (location.pathname === '/login' || location.pathname === '/signup') {
          navigate('/')
        }
      } else {
        if (location.pathname !== '/login' && location.pathname !== '/signup') {
          navigate('/login')
        }
      }
      setIsLoading(false)
    })
    dispatch(getAppLanguage())
    return () => {
      unsubscribe()
    }
  }, [])

  const location = window.location
  const navigate = (loc: string) => window.location.replace(loc)

  const authPages = ['/login', '/signup']
  const isAuthPage = authPages.includes(location.pathname)

  return (
    <BrowserRouter>
      <div className="w-screen h-screen relative" dir={appDirection}>
        <div
          className={`absolute z-10 w-32 ${isAuthPage ? 'top-9  ' : 'top-20'}
          ${appDirection === 'rtl' ? 'left-10' : 'right-10'} `}
        >
          <DropDown
            options={[
              { value: 'en', label: 'English' },
              { value: 'he', label: 'עברית' }
            ]}
            value={appLanguage}
            onChange={(value) => {
              dispatch(setAppLanguageToLocalStorage(value as 'he' | 'en'))
            }}
          />
        </div>
        {!isAuthPage && user && <Header />}
        {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<UploadForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/upload" element={<UploadForm />} />
            <Route path="/files" element={<Table />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        )}
        {!isAuthPage && user && <Footer />}
      </div>
    </BrowserRouter>
  )
}

export default App
