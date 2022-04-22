require("dotenv").config();
const app = require("./app");

app.listen(app.get("port"), () => {
  console.log(`Servidor ejecutado en puerto ${app.get("port")}`);
});

app.on("error", (error) => {
  console.log("Se ha producido un error", error);
});
