import { Request, Response } from "express";
import db from "../models";
const Order = db.orders;

// Find a single Order with an id
export const findOrders = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  Order.aggregate([
    {
      $match: {
        user_id: id,
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "cart_items",
        foreignField: "code",
        as: "products",
      },
    },
  ])
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(409).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};

// Create and Save a new Order in cart
export const addToCart = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const productCode = String(req.body.product);

  Order.updateOne(
    {
      user_id: id,
    },
    {
      $addToSet: {
        cart_items: productCode,
      },
    },
  )
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(409).send({
        message: err.message || "Some error occurred while adding to cart.",
      });
    });
};

// Remove a product from cart
export const removeFromCart = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const productCode = String(req.params.product);

  Order.updateOne(
    {
      user_id: id,
    },
    {
      $pull: {
        cart_items: productCode,
      },
    },
  )
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(409).send({
        message: err.message || "Some error occurred while removing from cart.",
      });
    });
};