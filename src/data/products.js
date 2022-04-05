const errProductNotFound = { error: "Producto no encontrado" };
const errInvalidData = { error: "Error al procesar datos" };
const successDeleted = { Operacion: "Eliminar registro", estado: "OK" };

class ProductsList {
  constructor() {
    this.index = 1;
    this.products = [];
  }

  getAllProducts() {
    return this.products;
  }

  getOneProduct(id) {
    const index = this.findProduct(id);
    return index == -1 ? errProductNotFound : this.products[index];
  }

  createProduct(product) {
    if (!this.checkProduct(product)) return errInvalidData;

    const newProduct = {
      id: this.index,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    };
    this.products.push(newProduct);
    this.index++;

    return newProduct;
  }

  updateProduct(id, product) {
    if (!this.checkProduct(product)) return errInvalidData;

    const index = this.findProduct(id);
    if (index == -1) return errProductNotFound;

    const updateProduct = {
      id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    };
    this.products[index] = updateProduct;

    return this.products[index];
  }

  deleteProduct(id) {
    const index = this.findProduct(id);
    if (index == -1) return errProductNotFound;

    this.products.splice(index, 1);
    return successDeleted;
  }

  // AUXILIARES
  checkProduct(product) {
    try {
      const { title, price, thumbnail } = product;
      if (!title || !price || !thumbnail) return false;
      else return true;
    } catch (error) {
      true;
    }
  }

  findProduct(id) {
    return this.products.findIndex((product) => product.id == id);
  }
}

const productsList = new ProductsList();
module.exports = productsList;

productsList.createProduct({
  title: "Calculadora",
  price: 1500,
  thumbnail: "https://www.matematica.pt/images/256_calculadora.png",
});

productsList.createProduct({
  title: "Escuadra",
  price: 250,
  thumbnail: "https://www.sid.com.uy/imgs/productos/productos31_4375.jpg",
});

productsList.createProduct({
  title: "Reloj",
  price: 500,
  thumbnail: "https://cpng.pikpng.com/pngl/s/215-2156256_reloj-png-imagenes-de-relojes-png-clipart.png",
});
