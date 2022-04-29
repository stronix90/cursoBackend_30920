class Messages {
  constructor(dbConnection, table) {
    this.knex = require("knex")(dbConnection);
    this.table = table;
  }

  async createMessageTable() {
    this.knex.schema
      .createTable(this.table, (table) => {
        table.increments("id"),
          table.string("email"),
          table.string("msg"),
          table.timestamp('created_at').defaultTo(this.knex.fn.now())
      })
      .then(() => true)
      .catch(() => false);
  }

  async getMessages() {
    const hasTable = await this.knex.schema.hasTable(this.table);

    if (hasTable) {
      const messages = await this.knex(this.table).select();
      return messages;
    }
    await this.createMessageTable();
    return [];
  }

  async saveMsn(newMsg) {
    const msg = {
      email: newMsg.email,
      msg: newMsg.msg,
    };

    this.knex(this.table)
      .insert(msg)
      .catch((err) => console.log(err));
  }
}

const { sqliteConn } = require("../db/conn");
const messageStore = new Messages(sqliteConn, "mensajes");
module.exports = messageStore;
