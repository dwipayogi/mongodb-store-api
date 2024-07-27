export default function Order(mongoose: any) {
  const Order = mongoose.model(
    "orders",
    new mongoose.Schema({
      user_id: Number,
      cart_items: [String],
    })
  );

  return Order;
}
