const fs = require("fs");
const fileURL = "src/data/productos.json";

const errInvalidData = { error: "Error en los datos ingresados" };
const successDeleted = { Operacion: "Eliminar registro", estado: "OK" };

class ProductsList {
  constructor() {
    this.index = 1;
    this.products = [];
  }

  async getAllProducts() {
    await this.readFile();
    return this.products;
  }

  async getOneProduct(id) {
    id *= 1;
    await this.readFile();
    const index = this.findProduct(id);
    return index == -1 ? -1 : this.products[index];
  }

  async createProduct(product) {
    await this.readFile();
    if (!this.checkProduct(product)) return errInvalidData;

    const newProduct = {
      id: this.index,
      timestamp: Date.now(),
      nombre: product.nombre,
      descripcion: product.descripcion,
      codigo: product.codigo,
      foto: product.foto,
      precio: product.precio,
      stock: product.stock,
    };
    this.products.push(newProduct);
    this.index++;

    this.saveFile();
    return newProduct;
  }

  async updateProduct(id, product) {
    id *= 1;
    await this.readFile();
    if (!this.checkProduct(product)) return errInvalidData;

    const index = this.findProduct(id);
    if (index == -1) return index;

    const updateProduct = {
      id,
      timestamp : Date.now(),
      nombre: product.nombre,
      descripcion: product.descripcion,
      codigo: product.codigo,
      foto: product.foto,
      precio: product.precio,
      stock: product.stock,
    };
    this.products[index] = updateProduct;

    this.saveFile();
    return this.products[index];
  }

  async deleteProduct(id) {
    id *= 1;
    await this.readFile();
    const index = this.findProduct(id);
    if (index == -1) return index;

    this.products.splice(index, 1);
    this.saveFile();
    return successDeleted;
  }

  // AUXILIARES
  checkProduct(product) {
    try {
      const { nombre, descripcion, codigo, foto, precio, stock } = product;
      if (nombre && descripcion && codigo && foto && precio && stock)
        return true;
    } catch {
      return false;
    }
    return false;
  }

  findProduct(id) {
    return this.products.findIndex((product) => product.id == id);
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
        products: this.products,
      });
      await fs.promises.writeFile(fileURL, newData, "utf-8");
    } catch (error) {
      console.log(error);
    }
  }

  async readFile() {
    try {
      const data = await fs.promises.readFile(fileURL, "utf-8");
      const { index, products } = JSON.parse(data);
      this.index = index;
      this.products = products;
    } catch (error) {
      console.log("Error al abrir el archivo. Verifique la ruta");
      return [];
    }
  }
}

const productsList = new ProductsList();
module.exports = productsList;
