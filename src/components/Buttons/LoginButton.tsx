import React from 'react'
import { BeatLoader } from 'react-spinners'

interface LoginButtonProps {
  //props
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  text?: string
  disabled?: boolean
  isloading?: boolean
}

const LoginButton: React.FC<LoginButtonProps> = ({
  onClick,
  text = 'Sign in',
  disabled = false,
  isloading = false
}) => {
  return (
    <button
      className={`flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white active:bg-gray-400 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {isloading ? <BeatLoader color="#fff" size={20} /> : <>{text}</>}
    </button>
  )
}

export default LoginButton
