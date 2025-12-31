import { addProduct, getById, query } from "../services/products.js";
import { ObjectId } from "mongodb";

export const createProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const product = {
    name,
    description: description || "Gaming laptop",
    price: price || 999,
    category: category || "Electronics",
    stock: stock || 10,
  };
  try {
    const newProduct = await addProduct(req.mongConn, product);
    res.json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(409).send("cant add product");
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await query(req.mongConn);
    res.json(products);
  } catch (error) {
    res.status(404).send("cant find products");
  }
};
export const getProduct = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, data: {}, message: "Invalid id format" });
  }
  try {
    const product = await getById(req.mongConn, id);
    res.json(product);
  } catch (error) {
    res.status(404).send("cant find product");
  }
};
