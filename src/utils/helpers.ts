import Swal from 'sweetalert2'

const showErrorMessage = (message: string) => {
  const language = localStorage.getItem('appLanguage') ?? 'en'
  Swal.fire({
    icon: 'error',
    title: language === 'en' ? 'Error!' : 'שגיאה!',
    text: message,
    confirmButtonText: language === 'en' ? 'OK' : 'אישור'
  }).then()
}

const showSuccessMessage = (message: string) => {
  const language = localStorage.getItem('appLanguage') ?? 'en'
  Swal.fire({
    icon: 'success',
    title: language === 'en' ? 'Success!' : 'הצלחה!',
    text: message,
    confirmButtonText: language === 'en' ? 'OK' : 'אישור'
  }).then()
}

const showInfoMessage = (message: string, onClickCallback?: () => void) => {
  const language = localStorage.getItem('appLanguage') ?? 'en'
  Swal.fire({
    icon: 'info',
    title: language === 'en' ? 'Info!' : 'מידע!',
    text: message,
    confirmButtonText: language === 'en' ? 'OK' : 'אישור'
  }).then(onClickCallback?.bind(null))
}

export { showErrorMessage, showSuccessMessage, showInfoMessage }
