let messagesDao;

switch (process.env.PERSISTENCIA) {
    default:
        const messagesDaoMongo = require("./messagesDaoMongo");
        messagesDao = new messagesDaoMongo();
        break;
}

module.exports = { messagesDao };
