import express from "express";
// import todos from './app/routes/tutorial.routes.js'
import { getConn, initDb } from "./db/mysql.js";
import { connect, createCollection } from "./db/mongodb.js";
import routerProduct from "./routes/products.js";
import routerOrder from "./routes/orders.js"

const app = express();
app.use(express.json());

app.use(async (req, res, next) => {
  req.sqlConn = await getConn();
  req.mongConn = await connect();
  console.log("connected to sqlDB and mongDB successfuly...");
  next();
});


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to elazar to application." });
});
// app.use('/api/todo', todos);
// set port, listen for requests
app.use('/api/products',routerProduct)
app.use('/api/orders',routerOrder)
const PORT = process.env.PORT;
app.listen(PORT, async () => {
  await initDb();
  await createCollection("products");
  console.log(`Server is running on port ${PORT}.`);
});
