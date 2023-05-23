

document.getElementById("sendButton").addEventListener('click', async (event) => {
  event.preventDefault()
  let uid = document.getElementById('uid').value
  let data = {
    role: document.getElementById('role').value,
  }
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
        console.log(response)
        let message = document.getElementById("message").textContent = "Cambios realizados, recargue la pagina"
      } else {
        let message = document.getElementById("message").textContent = "EL usuario no tiene todos los documentos actualizados"
      }
    })
    .catch(error => {
      console.log(error)
    })


})


