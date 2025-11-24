const express = require("express");
const createError = require("http-errors");
const { Response } = require("../common/response");

module.exports.IndexApi = (app) => { 
    const router = express.Router();

    router.get("/", (req, res) => {
        const menu = {
            products: `https://${req.headers.host}/api/products`,
            users: `https://${req.headers.host}/api/users`
        }
        Response.success(res, 200, "API Inventario", menu)
    })
    app.use("/", router);
}

module.exports.NotFoundApi = (app) => { 
    app.use((req, res) => {
        Response.error(res, new createError.NotFound());
    })
}