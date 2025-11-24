const { ProductsService } = require("./services");
const debug = require("debug")("app:module-products-controller");
const { Response } = require("../common/response");
const createError = require("http-errors");

module.exports.ProductsController = {
  getProducts: async (req, res) => {
    try {
      let products = await ProductsService.getAll();
      Response.success(res, 200, "Lista de productos.", products);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  getProduct: async (req, res) => {
    try {
      let {
        params: { id },
      } = req;
      let product = await ProductsService.getById(id);
      if (!product) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `Producto ${id}`, product);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createProduct: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        return Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await ProductsService.createProduct(body);
        Response.success(res, 201, "Producto creado", { insertedId });
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { params : { id }, body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const result = await ProductsService.updateProduct(id, body);
        if (!result.matchedCount) {
          Response.error(res, new createError.NotFound());
        } else {
          Response.success(res, 200, `Producto ${id} actualizado`, body);
        }
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  deleteProduct: (req, res) => {
    try {
      const { params: { id } } = req;
      let result = ProductsService.deleteProduct(id);
      if (!result) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `Producto ${id} eliminado`);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  generateReport: async (req, res) => {
    try {
      await ProductsService.generateReport("Inventario", res);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createProductMultiples: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        return Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await ProductsService.createProductMultiples(body);
        Response.success(res, 201, "Razones agregadas", { insertedId });
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  }
};
