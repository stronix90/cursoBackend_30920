const errInvalidData = { error: "Error al procesar datos" };

class ProductsList {
  constructor(dbConnection, table) {
    this.knex = require("knex")(dbConnection);
    this.table = table;
  }

  async initialLoad() {
    const hasTable = await this.knex.schema.hasTable(this.table);
    if (hasTable) return await this.getAllProducts();

    try {
      await this.knex.schema.createTable(this.table, (table) => {
        table.increments("id"),
          table.string("title"),
          table.float("price"),
          table.string("thumbnail");
      });
      console.log(`La tabla ${this.table} no existia, se ha creado`);
      return [];
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getAllProducts() {
    try {
      const result = await this.knex.from("productos").select();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async createProduct(product, getAll = false) {
    if (!this.checkProduct(product)) return errInvalidData;

    const newProduct = {
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    };

    try {
      const result = await this.knex(this.table).insert(newProduct);
      return getAll ? await this.getAllProducts() : result[0];
    } catch (error) {
      console.log(erro);
      return [];
    }
  }

  async deleteProduct(id, getAll = false) {
    try {
      const result = await this.knex(this.table).where("id", id).del();
      return getAll ? await this.getAllProducts() : result;
    } catch (error) {
      console.log(erro);
    }
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
}

const { myqlConn } = require("../db/conn");
const productsList = new ProductsList(myqlConn, "productos");
module.exports = productsList;
