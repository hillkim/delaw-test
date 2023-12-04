import React from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut, useAppDispatch, useAppSelector } from '../store'

const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-logout ml-2"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
    <path d="M7 12h14l-3 -3m0 6l3 -3" />
  </svg>
)

const Header = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const translations = useAppSelector((state) => state.auth.appTranslations)
  const navigate = useNavigate()

  const menuTexts = translations.header

  const menu = [
    {
      label: menuTexts.addFile,
      onClick: () => {
        navigate('/upload')
      }
    },
    {
      label: menuTexts.files,
      onClick: () => {
        navigate('/files')
      }
    },
    {
      label: menuTexts.logout,
      onClick: () => {
        dispatch(signOut())
        navigate('/login')
      },
      icon: <LogoutIcon />
    }
  ]

  return (
    <header className="flex items-center justify-between  border-b-2 border-black py-2 px-2 overflow-auto">
      <div className="flex items-center">
        <img
          className="w-12 h-12 rounded-full"
          src="https://avatars.githubusercontent.com/u/10072417?v=4"
        />
        <div className="flex-col ml-3 hidden md:flex">
          <span className="text-xl font-medium px-3">
            {user?.displayName || user?.email}
          </span>
          <span className="text-sm font-medium text-gray-500"></span>
        </div>
      </div>
      <div className="items-center flex ">
        {menu.map((item) => (
          <button
            className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white active:bg-gray-400 mx-2 gap-1"
            onClick={item.onClick}
            key={item.label}
          >
            {item.label}
            {item.icon}
          </button>
        ))}
      </div>
    </header>
  )
}

export default Header
