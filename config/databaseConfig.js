const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/Auth";

const databaseConnect = () => {
    mongoose.connect(MONGODB_URL)
    .then((conn) => console.log(`Connected to Db : ${conn.connection.host}`))
    .catch((err) => console.log(`Error occurred while connected to Db : ${err}`)); 
}

module.exports = databaseConnect;