const config = {
    mongodb: {
        conn: "mongodb+srv://desafioCoder:desafioCoder@cluster0.t7sf8.mongodb.net/coder_d10?retryWrites=true&w=majority",
        options: {
            useNewUrlParse: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        },
    },
};

module.exports = config;