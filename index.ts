import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000;

// define routes
import OrderRoute from "./app/routes/order.routes";
import ProductRoute from "./app/routes/product.routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import db from "./app/models";
db.mongoose
  .connect(db.uri)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err: any) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the application.");
});

OrderRoute(app); // order routes
ProductRoute(app); // product routes

app.get("*", (req: Request, res: Response) => {
  res.status(404).send("Page not found.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
