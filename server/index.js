const express = require("express");
const initApp = require("./src/modules/index.router.js");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
const PORT = process.env.PORT;

initApp(app, express);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
