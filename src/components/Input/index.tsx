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
    <div className="flex flex-col relative mb-10">
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
      {error && (
        <p className="text-red-600 absolute bottom-[-30px] ">{error}</p>
      )}
    </div>
  )
}

export default Input
