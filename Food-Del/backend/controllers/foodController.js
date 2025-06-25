import foodModel from "../models/foodModel.js"; // Ensure the correct path
import fs from "fs"; // Prebuilt function in Node.js

// Add food items
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`; // Using this we will store the uploaded file name

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//  to display all food items in the list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//to display search item

const searchItem = async (req, res) => {
  try {
    // console.log(req.body+" "+req.body.name)
    const search = await foodModel.find({
      $and: [
        { name: { $regex: req.params["name"], $options: "i" } },
        { category: { $regex: req.params["name"], $options: "i" } },
      ],
    });
    res.json({ success: true, data: search });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//function to remove food items

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id); //here food item wth specific id will be stored in food variable
    fs.unlink(`uploads/${food.image}`, () => {}); //used to delte image from uploads
    await foodModel.findByIdAndDelete(req.body.id); //used to delete images from mongo dtabase
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood, searchItem };
