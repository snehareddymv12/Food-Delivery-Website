import express from "express";
import { addToCart,getCart,removeFromCart } from '../controllers/cartController.js';
import authMiddleware from "../middleware/Auth.js";


const cartRouter=express.Router();
//three api endpoints for adding,deleting,getting cart data
cartRouter.post("/add",authMiddleware,addToCart)
cartRouter.post("/remove",authMiddleware,removeFromCart)
cartRouter.post("/get",authMiddleware,getCart)

export default cartRouter;
