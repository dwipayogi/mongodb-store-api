import { Router } from "express";
import { addData, findAll, findOne } from "../controllers/product.controller";

export default function ProductRoute(app: any) {
  const products = {
    addData: addData,
    findAll: findAll,
    findOne: findOne,
  };
  var router = Router();

  // Create a new Product
  router.post("/", products.addData);

  // Retrieve all Products
  router.get("/", products.findAll);

  // Retrieve a single Product with id
  router.get("/:id", products.findOne);

  app.use("/api/products", router);
}
