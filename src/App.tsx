import React, { ReactElement, useState } from 'react'
import logo from './logo.svg'
import viteLogo from './vite.svg'
import tailwindLogo from './tailwind.svg'
import { Link } from 'react-router-dom'
import UploadForm from './components/Upload'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import Table from './components/Table'
import UpdatePassword from './components/UpdatePassword'

function App(): ReactElement {
  const [count, setCount] = useState(0)

  return (
    <div className="w-screen">
      {/* <LoginForm /> */}
      {/* <SignUpForm /> */}
      <UploadForm />
      {/* <Table /> */}
      {/* <UpdatePassword /> */}
    </div>
  )
}

export default App
