//used to store the products in the database
import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true }, // if we try to add any data in the database without name, it won't get stored
    description: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true }
});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;
