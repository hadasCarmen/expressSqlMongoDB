import { ObjectId } from "mongodb";
export async function addProduct(conn, product) {
  try {
    const collection = await conn.collection("products");
    await collection.insertOne(product);
    return product;
  } catch (error) {
    if (error.code === 11000) {
      console.log("error duplicated");
    }
  }
}
export async function query(conn) {
  try {
    const collection = await conn.collection("products");
    const products = await collection.find().toArray();
    return products;
  } catch (error) {
    console.log("cant find", error);
  }
}
export async function getById(conn, id) {
  try {
    const collection = await conn.collection("products");
    const objectId = ObjectId.createFromHexString(id);
    const product = await collection.findOne({ _id: objectId });
    return product;
  } catch (error) {
    console.log("cant find", error);
  }
}
