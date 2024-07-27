import { Request, Response } from "express";
import db from "../models";
const Product = db.products;

// Create and Save a new Product
export const addData = (req: Request, res: Response) => {

  // Create a Product
  const product = new Product({
    code: req.body.code,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imageUrl: req.body.imageurl,
    category: req.body.category,
    averageRating: 0,
  });

  // Save Product in the database
  product
    .save(product)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product.",
      });
    });
};

// Retrieve all Products from the database.
export const findAll = (req: Request, res: Response) => {
  Product.find()
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    });
};

// Find a single Product with an id
export const findOne = (req: Request, res: Response) => {
  const id = req.params.id;

  Product.findById(id)
    .then((data: any) => {
      if (!data)
        res.status(404).send({ message: "Not found Product with id " + id });
      else res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({ message: "Error retrieving Product with id=" + id });
    });
};
