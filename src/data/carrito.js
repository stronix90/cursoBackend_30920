const fs = require("fs");
const fileURL = "src/data/carrito.json";

const errCartNotFound = { error: "Carrito no encontrado" };
const errProductNotFound = { error: "Producto no encontrado" };
const errProductAlreadyInCart = {
  error: "El producto ya se encuentra en el carrito",
};
const successDeleted = { Operacion: "Eliminar carrito", estado: "OK" };
const successDeletedProductFromCart = {
  Operacion: "Eliminar producto de carrito",
  estado: "OK",
};

const productsList = require("../data/productos");

class cart {
  constructor() {
    this.index = 1;
    this.carts = [];
  }

  async getCart(id) {
    id *= 1;
    await this.readFile();
    const cartIndex = this.findCart(id);
    return cartIndex == -1 ? errCartNotFound : this.carts[cartIndex];
  }

  async createCart() {
    await this.readFile();

    const newCart = {
      id: this.index,
      timestamp: Date.now(),
      products: [],
    };
    this.carts.push(newCart);
    this.index++;

    this.saveFile();
    return newCart.id;
  }

  async addProductToCart(idCart, idProduct) {
    (idCart *= 1), (idProduct *= 1);
    await this.readFile();

    // Get cart index
    const cartIndex = this.findCart(idCart);
    if (cartIndex == -1) return errCartNotFound;

    // Get product
    const product = await productsList.getOneProduct(idProduct);
    if (product == -1) return errProductNotFound;

    // Get product in cart
    const productInCart = this.carts[cartIndex].products.findIndex(
      (cartProduct) => cartProduct.id === product.id
    );
    if (productInCart != -1) return errProductAlreadyInCart;

    this.carts[cartIndex].products.push(product);
    this.carts[cartIndex].timestamp = Date.now()

    this.saveFile();
    return this.carts[cartIndex];
  }

  async deleteCart(id) {
    id *= 1;
    await this.readFile();
    const cartIndex = this.findCart(id);
    if (cartIndex == -1) return errCartNotFound;

    this.carts.splice(cartIndex, 1);
    this.saveFile();
    return successDeleted;
  }

  async deleteProductFromCart(idCart, idProduct) {
    (idCart *= 1), (idProduct *= 1);
    await this.readFile();

    // Get cart index
    const cartIndex = this.findCart(idCart);
    if (cartIndex == -1) return errCartNotFound;

    // Get product in cart
    const productInCartIndex = this.carts[cartIndex].products.findIndex(
      (cartProduct) => cartProduct.id === idProduct
    );
    if (productInCartIndex == -1) return errProductNotFound;

    this.carts[cartIndex].products.splice(productInCartIndex, 1);
    this.carts[cartIndex].timestamp = Date.now()
    
    this.saveFile();
    return successDeletedProductFromCart;
  }

  // AUXILIARES
  findCart(id) {
    return this.carts.findIndex((product) => product.id == id);
  }

  // FILE MANAGEMENT
  async saveFile() {
    if (!fs.existsSync(fileURL)) {
      console.log("El archivo no existe");
      return;
    }
    try {
      const newData = JSON.stringify({
        index: this.index,
        carts: this.carts,
      });
      await fs.promises.writeFile(fileURL, newData, "utf-8");
    } catch (error) {
      console.log(error);
    }
  }

  async readFile() {
    try {
      const data = await fs.promises.readFile(fileURL, "utf-8");
      const { index, carts } = JSON.parse(data);
      this.index = index;
      this.carts = carts;
    } catch (error) {
      console.log("Error al abrir el archivo. Verifique la ruta");
      return [];
    }
  }
}

const cartStorage = new cart();
module.exports = cartStorage;
