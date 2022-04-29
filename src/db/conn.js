const myqlConn = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "mibase",
  },
};

const sqliteConn = {
  client: "sqlite3",
  connection: {
    filename: "src/db/ecommerce.sqlite",
  },
};

module.exports = {myqlConn, sqliteConn};
