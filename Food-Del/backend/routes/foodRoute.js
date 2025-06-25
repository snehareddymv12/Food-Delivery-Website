import express from "express";
import { addFood,listFood ,removeFood ,searchItem} from "../controllers/foodController.js";
import multer from "multer"; // used to create image storage system

const foodRouter = express.Router(); // we can use this Router to create get post or any kind of methods

// Image Storage System
const storage = multer.diskStorage({
    destination: "uploads", // here files are stored in uploads folder
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`); // to create unique file name
    }
});

const upload = multer({ storage: storage }); // by using this we can store the image in upload folder

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood);
foodRouter.get("/search/:name",searchItem);

export default foodRouter;
