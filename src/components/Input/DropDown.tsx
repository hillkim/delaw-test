import React from 'react'

interface DropDownProps {
  //props
  onChange?: (text: string) => void
  value?: string
  options: {
    value: string
    label: string
  }[]
  placeholder?: string
}

const DropDown = ({ onChange, value, options, placeholder }: DropDownProps) => {
  return (
    <select
      className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal w-32 rtl:text-left "
      onChange={(e) => onChange?.(e.target.value)}
      value={value}
      defaultValue={value}
      placeholder={placeholder}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default DropDown
