const { UsersService } = require("./services");
const debug = require("debug")("app:module-users-controller");
const { Response } = require("../common/response");
const createError = require("http-errors");

module.exports.UsersController = {
  getUsers: async (req, res) => {
    try {
      let users = await UsersService.getAll();
      Response.success(res, 200, "Lista de usuarios.", users);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  getUser: async (req, res) => {
    try {
      let {
        params: { id },
      } = req;
      let user = await UsersService.getById(id);
      if (!user) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `Usuario ${id}`, user);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createUser: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        return Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await UsersService.createUsers(body);
        Response.success(res, 201, "Usuario creado", { insertedId });
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  updateUser: async (req, res) => {
    try {
      const { params : { id }, body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const result = await UsersService.updateUsers(id, body);
        if (!result.matchedCount) {
          Response.error(res, new createError.NotFound());
        } else {
          Response.success(res, 200, `Usuario ${id} actualizado`, body);
        }
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  deleteUser: (req, res) => {
    try {
      const { params: { id } } = req;
      let result = UsersService.deleteUsers(id);
      if (!result) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `Usuario ${id} eliminado`);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  }
};
