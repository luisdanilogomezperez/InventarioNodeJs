const { ObjectId } = require("mongodb");
const { Database } = require("../database/index");

const COLLECTION = "users";

const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};

const getById = async (id) => {
  const collection = await Database(COLLECTION);
  return collection.findOne({ _id: new ObjectId(id) });
};

const createUsers = async (product) => {
  const collection = await Database(COLLECTION);
  const result = await collection.insertOne(product);
  return result.insertedId;
};

const updateUsers = async (id, product) => {
  const collection = await Database(COLLECTION);
  let result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: product });
  return result;
};

const deleteUsers = async (id) => {
  const collection = await Database(COLLECTION);
  let result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result;
}
module.exports.UsersService = {
  getAll,
  getById,
  createUsers,
  updateUsers,
  deleteUsers
};
