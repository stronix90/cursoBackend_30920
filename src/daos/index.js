let messagesDao;
let usersDao;

switch (process.env.PERSISTENCIA) {
    default:
        const messagesDaoMongo = require("./messagesDaoMongo");
        messagesDao = new messagesDaoMongo();

        const usersDaoMongo = require("./UserDaoMongo");
        usersDao = new usersDaoMongo();
        break;
}

module.exports = { messagesDao, usersDao };
