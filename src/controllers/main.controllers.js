const Contenedor = require('../data/contenedorClass');
const dataContainer = new Contenedor("src/data/test.json");

const index = (req, res) => {
  res.send(`
    <div>
      <h1>Endpoints</h1>
      <ul>
        
          <li><a href="/productos">/productos</a>: Obtiene todos los productos</li>
        
          <li><a href="/productorandom">/productoRandom</a>: Obtiene un producto al azar</li>

      </ul>
    </div>
    `);
};

const getProductos = async (req, res) => {
  const data = await dataContainer.getAll();
  res.json(data);
};

const getProductoRandom = async (req, res) => {
  const data = await dataContainer.getRandom();
  res.json(data);
};

module.exports = {index, getProductos, getProductoRandom}