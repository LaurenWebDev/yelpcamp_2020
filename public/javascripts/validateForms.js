// Bootstrap JS 
// Example starter JavaScript for disabling form submissions if there are invalid fields, validate on client-side using bootstrap
(function () {
  'use strict'

  bsCustomFileInput.init() //may not be needed
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.validated-form')
    // Loop over them and prevent submission
    Array.from(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()