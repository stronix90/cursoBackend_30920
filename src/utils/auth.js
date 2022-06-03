// const passport = require("passport");
// const LocalStrategy = require("passport-local");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPass = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
};

const checkPass = async (password, encryptedPass) => {
    return bcrypt.compare(password, encryptedPass);
};

// passport.use(
//     new LocalStrategy((username, password, done) => {
//         // User.findOne({ username: username }, function (err, user) {
//         //     if (err) {
//         //         return done(err);
//         //     }
//         //     if (!user) {
//         //         return done(null, false);
//         //     }
//         //     if (!user.verifyPassword(password)) {
//         //         return done(null, false);
//         //     }
//         return done(null, user);
//         // });
//     })
// );

module.exports = { hashPass, checkPass };
