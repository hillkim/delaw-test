import Footer from '../components/Footer'
import { GoogleButton, PrimaryButton } from '../components/Buttons'
import Input from '../components/Input'
import { InputStateType, InputValidationType, validateInput } from '../utils'
import React from 'react'
import {
  signInWithEmail,
  signInWithGoogle,
  useAppDispatch,
  useAppSelector
} from '../store'

const LoginForm = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector((state) => state.auth.loading)
  const translations = useAppSelector((state) => state.auth.appTranslations)
  const inputErrors: {
    [key in InputValidationType]?: string
  } = {
    email: translations.login.invalidEmail,
    password: translations.login.invalidPassword
  }

  const [email, setEmail] = React.useState<InputStateType>({
    value: '',
    error: ''
  })
  const [password, setPassword] = React.useState<InputStateType>({
    value: '',
    error: ''
  })

  const onChange = (
    value: string,
    type: InputValidationType,
    setterFunction: React.Dispatch<
      React.SetStateAction<{
        value: any
        error: string
      }>
    >
  ) => {
    const isValid = validateInput(value, {
      type,
      minLength: 6,
      maxLength: 100,
      required: true
    })

    if (isValid) {
      setterFunction({ value, error: '' })
    } else {
      setterFunction({ value, error: inputErrors[type] ?? '' })
    }
  }

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    if (!email.value || !password.value) {
      onChange(email.value, 'email', setEmail)
      onChange(password.value, 'password', setPassword)
      return
    }

    dispatch(signInWithEmail(email.value, password.value))
  }

  const signInUsingoogle = () => {
    dispatch(signInWithGoogle())
  }

  const texts = translations.login

  return (
    <div className="flex min-h-screen">
      {/* <!-- Container --> */}
      <div className="flex flex-row w-full">
        {/* <!-- Sidebar --> */}
        <div className="hidden lg:flex flex-col justify-between bg-[#4E71FF] lg:p-8 xl:p-12 lg:max-w-sm xl:max-w-lg">
          <div className="flex items-center justify-start space-x-3">
            <span className="bg-black rounded-full w-8 h-8 ml-3"></span>
            <a href="#" className="font-medium text-xl text-white">
              Delawvery
            </a>
          </div>
          <div className="space-y-5">
            <h1 className="lg:text-3xl xl:text-5xl xl:leading-snug font-extrabold text-white">
              {texts.subtitle}
            </h1>
            <h2 className="lg:text-xl xl:text-2xl font-medium text-white">
              {texts.subtitle}
            </h2>
          </div>
          <p className="font-medium text-white"></p>
        </div>

        {/* <!-- Login --> */}
        <div className="flex flex-1 flex-col items-center justify-center px-10 relative">
          <div className="flex lg:hidden justify-between items-center w-full py-10">
            <div className="flex items-center justify-start space-x-3">
              <span className="bg-black rounded-full w-6 h-6 ml-2"></span>
              <a href="#" className="font-medium text-lg">
                Delawvery
              </a>
            </div>
          </div>

          {/* <!-- Login box --> */}
          <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md min-w-[300px] md:min-w-[400px] ">
            <div className="flex flex-col space-y-2 text-center">
              <h2 className="text-3xl md:text-4xl font-bold">{texts.signIn}</h2>
              <p className="text-md md:text-xl">{texts.subtitle}</p>
            </div>
            <form className="flex flex-col max-w-md gap-2">
              <Input
                placeholder={texts.email}
                type="email"
                required
                onChange={(value) => onChange(value, 'email', setEmail)}
                error={email.error}
              />
              <Input
                placeholder={texts.password}
                type="password"
                required
                onChange={(value) => onChange(value, 'password', setPassword)}
                error={password.error}
              />

              <PrimaryButton
                text={texts.signIn}
                onClick={onSubmit}
                isloading={isLoading}
              />

              <div className="flex items-end justify-center my-5">
                {texts.dontHaveAccount}&nbsp;
                <a href="/signup" className="font-semibold underline">
                  {texts.signUp}
                </a>
              </div>

              <div className="flex justify-center items-center">
                <span className="w-full border border-black"></span>
                <span className="px-4">{texts.or}</span>
                <span className="w-full border border-black"></span>
              </div>
              <GoogleButton
                text={texts.signInWithGoogle}
                onClick={signInUsingoogle}
              />
            </form>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default LoginForm
