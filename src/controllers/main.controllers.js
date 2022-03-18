import Contenedor from "../data/contenedorClass.js";
const dataContainer = new Contenedor("src/data/test.json");

export const index = (req, res) => {
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

export const getProductos = async (req, res) => {
  const data = await dataContainer.getAll();
  res.json(data);
};

export const getProductoRandom = async (req, res) => {
  const data = await dataContainer.getRandom();
  res.json(data);
};
