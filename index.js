require("dotenv").config();
const app = require("./app.js");
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is lsitening at https://localhost:${PORT}`);
})