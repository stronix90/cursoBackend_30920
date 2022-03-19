const fs = require('fs');
const random = require('random');

class Contenedor {
  constructor(fileName) {
    this.fileName = fileName;
  }

  // OPERACIONES SOBRE ARCHIVO
  async saveFile(newData) {
    if (!fs.existsSync(this.fileName)) {
      console.log("El archivo no existe");
      return;
    }
    try {
      newData = JSON.stringify(newData);
      await fs.promises.writeFile(this.fileName, newData, "utf-8");
    } catch (error) {
      console.log(error);
    }
  }

  async readFile() {
    try {
      const data = await fs.promises.readFile(this.fileName, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.log("Error al abrir el archivo. Verifique la ruta");
      return [];
    }
  }

  // OPERACIONES SOBRE PRODUCTOS
  getAll = async () => this.readFile();

  save = async (newProduct) => {
    if (newProduct.title && newProduct.price && newProduct.thumbnail) {
      // Obtiene productos del archivo
      const data = await this.readFile();

      // Obtiene nuevo ID y Agrega el nuevo producto
      let newID = data.length == 0 ? 1 : data[data.length - 1].id + 1;

      newProduct.id = newID;
      const newData = [...data, newProduct];

      // Guarda
      this.saveFile(newData);
      return newProduct.id;
    } else
      console.log(
        "El producto que quiere guardar posee datos incompletos o con claves incorrectas.\nSe requiere un producto con title, price y thumbnail"
      );
  };

  getById = async (id, returnPos = false) => {
    const data = await this.readFile();
    const result = data.findIndex((producto) => producto.id == id);

    if (!returnPos) return data[result];
    else return { data: data, position: result };
  };

  getRandom = async () => {
    const data = await this.readFile();
    const randomIndex = random.int(0, data.length - 1);
    return { randomNumber: randomIndex, data: data[randomIndex] };
  };

  deleteById = async (id) => {
    const { data, position } = await this.getById(id, true);
    if (position == -1) return null;

    data.splice(position, 1);
    this.saveFile(data);
  };

  deleteAll() {
    this.saveFile([]);
  }
}

module.exports = Contenedor