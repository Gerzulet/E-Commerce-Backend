
const sendButtons = document.querySelectorAll('#sendButton');

sendButtons.forEach(button => {

  button.addEventListener('click', async (event) => {
    event.preventDefault()

    let uid = event.target.dataset.id;
    let data = {
      role: "premium"
    }
    console.log(uid)
    console.log(data)
    await fetch(`/api/users/premium/${uid}`, {// 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          iziToast.success({
            title: "Usuario actualizado!",
            message: "Recargue la pagina para comprobar los cambios"
          })
          window.location.href = "/api/users/premium"
        } else {
          iziToast.error({
            title: "No se ha actualizado el usuario",
            message: "El usuario no tiene los documentos necesarios"
          })
        }
      })
      .catch(error => {
        console.log(error)
      })

  })
})

