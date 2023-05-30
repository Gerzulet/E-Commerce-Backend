// Agrega un evento clic al botón "Agregar al carrito"
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    addToCart(productId);
  });
});

// Función para agregar un producto al carrito mediante una petición fetch


function addToCart(productId, quantity) {

  let result;
  let cid = document.getElementById("cid").textContent;
  fetch(`/api/carts/${cid}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ pid: productId, quantity }) // Enviar la cantidad como parte del cuerpo de la solicitud
  })
    .then(response => {
      console.log(response)
      if (response.ok) {
        iziToast.success({
          title: "Producto agregado a carrito"
        })
        setTimeout(() => {
          window.location.href = `/api/carts/${cid}`
        }, 1800);
      } else if (response.status !== 200) {
        iziToast.error({
          title: "Ups",
        })
        result = response
        return response.json()
      }
    }
    )
    .then(data => {
      console.log(data)
      console.log(result)
      if (!result.ok) {
        iziToast.error({
          title: "Ha ocurrido un error",
          message: data.message
        })
      }
    })


}

// Mostrar/ocultar el modal
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.close');
const viewCartLink = document.querySelector('#openModalBtn');

function openModal() {
  modal.style.display = 'block';
  fetchProductList(); // Obtener la lista de productos mediante una petición fetch

  // Agregar evento clic al fondo oscuro del modal
  modal.addEventListener('click', closeModal);
  // Evitar que el clic en el contenido del modal cierre el modal
  modalContent.addEventListener('click', event => event.stopPropagation());
  // modal.style.display = 'block';
  // fetchProductList(); // Obtener la lista de productos mediante una petición fetch
}

function closeModal() {


  if (event.target === modal) {
    modal.style.display = 'none';
    // Eliminar el evento clic del fondo oscuro del modal al cerrarlo
    modal.removeEventListener('click', closeModal);
  }
}

modalClose.addEventListener('click', closeModal);
viewCartLink.addEventListener('click', openModal);

// Función para obtener la lista de productos mediante una petición fetch
function fetchProductList() {
  fetch('/api/products?json=true')
    .then(response => response.json())
    .then(data => {
      const productList = document.getElementById('product-list');
      productList.innerHTML = ''; // Limpiar la lista antes de agregar los productos

      // Crear la tabla con la clase CSS modal-table
      const table = document.createElement('table');
      table.classList.add('modal-table');

      const thead = document.createElement('thead');
      thead.classList.add("tablehead")
      const tbody = document.createElement('tbody');

      // Crear encabezados de la tabla
      const headerRow = document.createElement('tr');
      const headers = ['Title', 'Description', 'Category', 'Price', 'Stock', 'Cantidad', 'Acciones'];
      headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);

      // Agregar cada producto a la tabla
      data.docs.forEach(product => {
        const row = document.createElement('tr');
        const { _id, title, description, category, price, stock } = product;

        // Agregar celdas con los datos del producto
        const cells = [title, description, category, price, stock];
        cells.forEach(cellText => {
          const cell = document.createElement('td');
          cell.textContent = cellText;
          row.appendChild(cell);
        });

        // Agregar celda con el input de cantidad
        const quantityCell = document.createElement('td');
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.min = 0;
        quantityInput.max = stock;
        quantityInput.value = 0;
        quantityCell.appendChild(quantityInput);
        row.appendChild(quantityCell);

        // Agregar botón de agregar al carrito
        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Agregar al carrito';
        addToCartButton.addEventListener('click', () => {
          const quantity = parseInt(quantityInput.value, 10);
          if (quantity > 0 && quantity <= stock) {
            addToCart(_id, quantity);
          }
        });
        const actionsCell = document.createElement('td');
        actionsCell.appendChild(addToCartButton);
        row.appendChild(actionsCell);

        tbody.appendChild(row);
      });

      table.appendChild(tbody);
      productList.appendChild(table);
    })
    .catch(error => {
      console.error(error);
    });
}


