import { Router } from "express";
import { findOrders, addToCart, removeFromCart } from "../controllers/order.controller";

export default function OrderRoute(app: any) {
  const router = Router();
  const orders = {
    findOrders: findOrders,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
  };

  // Get orders for a user
  router.get("/user/:id", orders.findOrders);

  // Add a product to cart
  router.post("/user/:id/add", orders.addToCart);

  // Remove a product from cart
  router.delete("/user/:id/product/:product", orders.removeFromCart);

  app.use("/api/orders", router);
}
