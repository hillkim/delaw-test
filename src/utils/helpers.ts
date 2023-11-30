import Swal from 'sweetalert2'

const showErrorMessage = (message: string) => {
  Swal.fire({
    icon: 'error',
    title: 'An error occurred!',
    text: message
  }).then()
}

const showSuccessMessage = (message: string) => {
  Swal.fire({
    icon: 'success',
    title: 'Success!',
    text: message
  }).then()
}

export { showErrorMessage, showSuccessMessage }
