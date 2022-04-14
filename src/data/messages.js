const fileName = "src/data/messages.json";
const fs = require("fs");

class Messages {
  constructor() {
    this.messages = [];
  }

  // OPERACIONES SOBRE ARCHIVO
  async saveFile(newData) {
    if (!fs.existsSync(fileName)) {
      console.log("El archivo no existe");
      return;
    }
    try {
      newData = JSON.stringify(newData);
      await fs.promises.writeFile(fileName, newData, "utf-8");
    } catch (error) {
      console.log(error);
    }
  }

  async readFile() {
    try {
      const data = await fs.promises.readFile(fileName, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.log("Error al abrir el archivo. Verifique la ruta");
      return [];
    }
  }
}

const messageStore = new Messages();
module.exports = messageStore;
