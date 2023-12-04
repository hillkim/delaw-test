import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import Table from './Table'
import UploadForm from './Upload'

export default {
  home: {
    path: '/',
    exact: true,
    component: Table
  },
  login: {
    path: '/login',
    exact: true,
    component: LoginForm
  },
  signup: {
    path: '/signup',
    exact: true,
    component: SignUpForm
  },
  upload: {
    path: '/upload',
    exact: true,
    component: UploadForm
  },
  table: {
    path: '/table',
    exact: true,
    component: Table
  }
}
