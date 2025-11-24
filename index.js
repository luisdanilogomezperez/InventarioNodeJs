const express = require("express");

const { Config } = require("./src/config/index");
const { ProductsAPI } = require("./src/products/index");
const { UsersAPI } = require("./src/users/index");
const { IndexApi, NotFoundApi } = require("./src/index/index");
const debug = require("debug")("app:main");

const app = express();
app.use(express.json());

/**
 * modulos
 */

IndexApi(app);
ProductsAPI(app);
UsersAPI(app);
NotFoundApi(app);

/**
 * server
 */

app.listen(Config.port, () => {
  debug(`Server listening on port ${Config.port}`);
});
