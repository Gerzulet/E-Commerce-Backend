
const deleteButtons = document.querySelectorAll('#deleteProduct');

deleteButtons.forEach(button => {
  button.addEventListener('click', event => {
    const itemId = event.target.dataset.id;
    fetch(`/api/products/${itemId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          iziToast.error({
            title: "Ups",
            message: "No puedes eliminar este producto"
          })
        } else {
          iziToast.success({
            title: "Producto Eliminado"
          })

          setTimeout(() => {
            window.location.href = "/api/products"

          }, 900);
        }
      })
      .catch(error => {
        console.error('Error al eliminar el elemento', error);
      });
  });
});


// Modal para carga de productos
const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('modal');
const closeModal = document.getElementsByClassName('close')[0];

openModalBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});
