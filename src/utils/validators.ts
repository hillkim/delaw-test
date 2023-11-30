export type InputValidationType = 'email' | 'password'

export type InputStateType = {
  value: string
  error: string
}

export const validateInput = (
  input: string,
  options: {
    type: InputValidationType
    minLength?: number
    maxLength?: number
    required?: boolean
  }
) => {
  const { type, minLength, maxLength, required } = options

  if (required && !input) {
    return false
  }

  if (minLength && input.length < minLength) {
    return false
  }

  if (maxLength && input.length > maxLength) {
    return false
  }

  switch (type) {
    case 'email':
      return /\S+@\S+\.\S+/.test(input)
    case 'password':
      return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(input)
    default:
      return true
  }
}
