
document.getElementById("nuevoProducto").addEventListener('submit', async (event) => {

  event.preventDefault()
  console.log("En funcion carga de nuevo producto")



  var formValues = {
    title: document.getElementsByName("title")[0].value,
    description: document.getElementsByName("description")[0].value,
    category: document.getElementsByName("category")[0].value,
    price: document.getElementsByName("price")[0].value,
    thumbnail: document.getElementsByName("thumbnail")[0].files[0],
    code: document.getElementsByName("code")[0].value,
    stock: document.getElementsByName("stock")[0].value
  };
  let formData = new FormData();
  for (let key in formValues) {
    formData.append(key, formValues[key]);
  }

  let result = {};
  await fetch('/api/products', {// 
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (response.ok) {
        iziToast.success({
          title: "Producto Creado!"
        })
        setTimeout(() => {
          window.location.href = "/api/products"
        }, 2000);
        result.ok = true
      } else {
        result = response
        return response.json()
      }
    }
    )
    .then(data => {
      console.log(data)
      if (!result || !result.ok) {
        iziToast.error({
          title: "Ha ocurrido un error",
          message: data.error
        })
      }
    })



})






document.getElementById("cartButton").addEventListener('click', async (event) => {
  event.preventDefault()
  let cid = document.getElementById('cid').value
  let data = {
    pid: document.getElementById('pid').value,
    quantity: document.getElementById('quantity').value
  }
  console.log(data)


  await fetch(`/api/carts/${cid}`, {// 
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(data => {
      document.getElementById("message").innerHTML = "Se ha hecho la peticion, puedes comprobarlo en el carrito seleccionado, si eres premium no puedes agregar a tu carrito tus propios productos."
      document.getElementById("cid").value = ""
      document.getElementById("pid").value = ""
      document.getElementById("quantity").value = ""


    }

    )


})

const fetchMessage = document.getElementById("fetchMessage")
const deleteMessage = document.getElementById("deleteMessage")

const deleteButtons = document.querySelectorAll('#deleteProduct');

deleteButtons.forEach(button => {
  button.addEventListener('click', event => {
    const itemId = event.target.dataset.id;
    fetch(`/api/products/${itemId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          deleteMessage.innerHTML = "No tienes permisos para eliminar este producto"
        } else {
          window.location.href = "/api/products"
        }
      })
      .catch(error => {
        console.error('Error al eliminar el elemento', error);
      });
  });
});
