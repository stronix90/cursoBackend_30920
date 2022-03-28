let serverMsg = document.getElementById("serverMsg");

// Agrega funciones a botones
document.getElementById("btn_refresh").onclick = function () {
  getProducts();
};

document.getElementById("form1").onsubmit = function (event) {
  createProduct(event);
};

// INTERACCIÓN CON API -------------------
const getProducts = () => {
  fetch("/api/productos")
    .then((response) => response.json())
    .then((data) => fillProducts(data));
};

const delProduct = async (id) => {
  const res = await fetch(`/api/productos/${id}`, {
    method: "DELETE",
  });

  const resJSON = await res.json();
  message(JSON.stringify(resJSON));

  delProductDOM(id);
};

const createProduct = async (e) => {
  e.preventDefault();

  const formData = getFormData();

  axios
    .post("/api/productos", formData)
    .then((response) => {
      message(JSON.stringify(response.data));
      getProducts();
    })
    .catch((error) => {
      message(error);
    });
};

const uploadProduct = (id) => {};

//----------------------------------------
//
//
// MANEJO DOM ----------------------------
const fillProducts = (products) => {
  const ul = document.getElementById("productsList");
  let li = "";

  products.map((product, index) => {
    li += `
    <li class="row align-items-center" id="item_${product.id}">
        <div class="col-8">${product.title}</div>
        <div class="col-3">${product.price}</div>
        <div class="col-1"><a href="#" onclick="delProduct(${product.id})" class="btn btn-light"><i class="fas fa-trash"></i></a></div>
    </li>`;
  });
  ul.innerHTML = li;
};

const delProductDOM = (id) => {
  document.getElementById(`item_${id}`).remove();
};
//----------------------------------------
//
//
// AUXILIARES
const getFormData = () => {
  let formData = {};
  const form = document.getElementById("form1");
  const data = new FormData(form);
  for (var [key, value] of data) {
    formData = { ...formData, [key]: value };
  }
  return formData;
};

const message = (msg) => {
  serverMsg.innerText = msg;
  setTimeout(() => {
    serverMsg.innerText = "";
  }, 4000);
};
