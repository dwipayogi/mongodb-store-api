import { productData } from "./productData";
import { orderData } from "./orderData";
import db from "../app/models";

function seedProductData() {
  const Product = db.products;
  Product.deleteMany({})
    .then(() => {
      Product.insertMany(productData)
        .then(() => {
          console.log("Data inserted successfully!");
          process.exit();
        })
        .catch((err: any) => {
          console.log("Cannot insert data!", err);
          process.exit();
        });
    })
    .catch((err: any) => {
      console.log("Cannot delete data!", err);
      process.exit();
    });
}

function seedOrderData() {
  const Order = db.orders;
  Order.deleteMany({})
    .then(() => {
      Order.insertMany(orderData)
        .then(() => {
          console.log("Order data inserted successfully!");
          process.exit();
        })
        .catch((err: any) => {
          console.log("Cannot insert order data!", err);
          process.exit();
        });
    })
    .catch((err: any) => {
      console.log("Cannot delete order data!", err);
      process.exit();
    });
}

db.mongoose
  .connect(db.uri)
  .then(() => {
    console.log("Connected to the database!");
    seedProductData();
    seedOrderData();
  })
  .catch((err: any) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
