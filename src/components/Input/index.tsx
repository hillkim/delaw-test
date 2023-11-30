import React from 'react'
export { default as DropDown } from './DropDown'

interface InputProps {
  //props
  onChange?: (text: string) => void
  placeholder?: string
  type?: string
  required?: boolean
  error?: string
  value?: string
  disabled?: boolean
}

const Input: React.FC<InputProps> = ({
  onChange,
  placeholder,
  type = 'text',
  required = false,
  error,
  value,
  disabled = false
}) => {
  const isPassword = type === 'password'
  const [showPassword, setShowPassword] = React.useState(false)
  return (
    <div className="flex flex-col space-y-2 relative">
      <input
        type={isPassword && !showPassword ? 'password' : type}
        placeholder={placeholder}
        className={`flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal ${
          error
            ? 'border-red-600 text-red-600  active:border-red-600 focus:border-red-600 outline-none'
            : ''
        }

        `}
        required={required}
        onChange={(e) => onChange?.(e.target.value)}
        value={value}
        defaultValue={value}
        disabled={disabled}
      />
      {isPassword && (
        <div className="absolute right-3 top-[38%] transform -translate-y-1/2 cursor-pointer select-none focus:outline-none hover:text-re ">
          <button
            className="focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm0 0L9 9l6-3 6 3-6 3z"
              />
            </svg>
          </button>
        </div>
      )}

      {error && <p className="text-red-600 absolute bottom-[-25px]">{error}</p>}
    </div>
  )
}

export default Input
