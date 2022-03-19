const app = require('./app')

app.listen(app.get("port"), () => {
  console.log(`Servidor ejecutandose en puerto ${app.get("port")}`);
});

app.on("error", (error) => {
  console.log(error);
});
