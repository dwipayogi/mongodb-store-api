import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;

const db = {} as any;
db.mongoose = mongoose;
db.uri = uri;
db.orders = require("./order.model").default(mongoose);
db.products = require("./product.model").default(mongoose);

export default db;
