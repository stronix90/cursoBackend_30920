socket.on("inicio", (data) => {
  const productContainer = document.getElementById("productContainer");
  productContainer.innerHTML = DOM_drawContainer(data);

  const productsList = document.getElementById("productsList");
  if (data) productsList.appendChild(DOM_drawItems(data));
});

document.getElementById("form1").addEventListener("submit", (e) => {
  e.preventDefault();
  const newProduct = {
    title: document.querySelector("#form1 #title").value,
    price: document.querySelector("#form1 #price").value,
    thumbnail: document.querySelector("#form1 #thumbnail").value,
  };
  socket.emit("newProduct", newProduct);
});

const DOM_drawContainer = (data) => {
  if (!data) {
    return `
      <h5 class="text-center">No hay productos</h5>`;
  } else {
    return `
      <ul id="productsList" style="padding: 0;" class="customRow">
          <li class="row align-items-center">
              <div class="col p-2 ps-3"><b>Producto</b></div>
              <div class="col-2 p-2 text-center"><b>Precio</b></div>
              <div class="col-2 p-2 text-center"><b></b></div>
          </li>
      </ul>`;
  }
};

const DOM_drawItems = (data) => {
  let items = "";

  data?.map((prod) => {
    items += `
          <li class="row align-items-center my-2">
  
              <div class="col-auto p-2">
                <img
                  class="productImage"
                  src="${prod.thumbnail}"
                  alt="${prod.title}"
                />
              </div>
  
              <div class="col p-2">${prod.title}</div>
  
              <div class="col-2 p-2 text-center">${prod.price}</div>
  
              <div class="col-2 p-2 text-center">
                <a
                  href="#"
                  onclick="delProduct(${prod.id})"
                  class="btn customBtn">
                    <i class="fas fa-trash"></i>
                </a>
              </div>
  
          </li>`;
  });
  return document.createRange().createContextualFragment(items);
};

const delProduct = (id) => {
  socket.emit("deleteProduct", id);
};
