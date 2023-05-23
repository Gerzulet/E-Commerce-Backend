let uid = document.getElementById("UID").textContent
let route = `/api/users/${uid}/documents`


async function uploadFile(formInfo, inputInfo, event) {
  const form = document.getElementById(`${formInfo}`)
  const formData = new FormData(form)


  await fetch(route, {// 
    method: 'POST',
    body: formData,

  })
    .then(() => {
      console.log("Peticion realizada")
    })
    .catch(error => {
      console.log(error)
    })


}


document.getElementById("profilePicForm").addEventListener('submit', async (event) => {
  event.preventDefault()
  uploadFile("profilePicForm")
})
document.getElementById("productImageForm").addEventListener('submit', async (event) => {
  event.preventDefault()
  uploadFile("productImageForm")
})
document.getElementById("idForm").addEventListener('submit', async (event) => {
  event.preventDefault()
  uploadFile("idForm")
})
document.getElementById("locationForm").addEventListener('submit', async (event) => {
  event.preventDefault()
  uploadFile("locationForm")
})
document.getElementById("statusForm").addEventListener('submit', async (event) => {
  event.preventDefault()
  uploadFile("statusForm")
})







// document.getElementById("productImageForm").addEventListener('submit', async (event) => {
//   event.preventDefault()


//   const form = document.getElementById("productImageForm")
//   const formData = new FormData(form)



//   await fetch(route, {// 
//     method: 'POST',
//     body: formData
//   })
//     .then(() => {
//       console.log("Peticion realizada")
//       location.reload()
//     })
//     .catch(error => {
//       console.log(error)
//     })


// })



// document.getElementById("documentForm").addEventListener('submit', async (event) => {
//   event.preventDefault()


//   const form = document.getElementById("documentForm")
//   const formData = new FormData(form)

//   await fetch(route, {// 
//     method: 'POST',
//     body: formData
//   })
//     .then(() => {
//       console.log("Peticion realizada")
//       location.reload()
//     })
//     .catch(error => {
//       console.log(error)
//     })


// })



