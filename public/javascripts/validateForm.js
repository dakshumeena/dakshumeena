(() => {
  'use strict'
  const forms = document.querySelectorAll('.needs-validation')

  forms.forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
    })

    // 🔥 THIS PART FIXES "looks good!" text
    form.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', () => {
        if (input.checkValidity()) {
          input.classList.add('is-valid')
          input.classList.remove('is-invalid')
        } else {
          input.classList.add('is-invalid')
          input.classList.remove('is-valid')
        }
      })
    })
  })
})()