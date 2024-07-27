export default function Product(mongoose: any) {
  const Product = mongoose.model(
    "products",
    new mongoose.Schema({
      code: String,
      name: String,
      price: Number,
      description: String,
      imageUrl: String,
      category: String,
      averageRating: Number,
    })
  );

  return Product;
}
