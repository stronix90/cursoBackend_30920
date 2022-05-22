const { faker } = require("@faker-js/faker");

const login = (req, res) => {
    const name = req.query.name;
    req.session.name = name;

    res.redirect("/");
};

const productsTest = (req, res) => {
    const products = generateRandomProducts();
    res.json(products);
};

const generateRandomProducts = (qty = 5) => {
    const productsList = [];

    for (let i = 0; i < qty; i++) {
        const product = {
            id: i + 1,
            title: faker.commerce.product(),
            price: faker.commerce.price(1, 80000, 2),
            thumbnail: faker.image.fashion(500, 500, true),
        };
        productsList.push(product);
    }
    return productsList;
};

module.exports = { productsTest, login };
