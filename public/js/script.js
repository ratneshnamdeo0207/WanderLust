// const { passwordStrength } = require('check-password-strength')
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

  let btns = document.querySelectorAll(".filter");
  for(btn of btns)
{
  btn.addEventListener("click", function (){
    this.children[1].innerText
  })
}



