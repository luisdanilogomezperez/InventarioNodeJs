const { ObjectId } = require("mongodb");
const { Database } = require("../database/index");
const { ProductsUtil } = require("./utils");

const COLLECTION = "products";

const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};

const getById = async (id) => {
  const collection = await Database(COLLECTION);
  return collection.findOne({ _id: new ObjectId(id) });
};

const createProduct = async (product) => {
  const collection = await Database(COLLECTION);
  const result = await collection.insertOne(product);
  return result.insertedId;
};

const generateReport = async (name, res) => {
  let products = await getAll();
  ProductsUtil.excelgenerator(products, name, res);
};

const updateProduct = async (id, product) => {
  const collection = await Database(COLLECTION);
  let result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: product });
  return result;
};

const deleteProduct = async (id) => {
  const collection = await Database(COLLECTION);
  let result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result;
}
module.exports.ProductsService = {
  getAll,
  getById,
  createProduct,
  generateReport,
  updateProduct,
  deleteProduct
};
