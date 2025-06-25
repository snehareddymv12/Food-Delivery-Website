import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";

import crypto from "crypto";
import dotenv from 'dotenv';

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//placing user order in the frontend

const placeOrder = async (req, res) => {
  const frontend_url = " http://localhost:5174";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Create Razorpay order
    const options = {
      amount: newOrder.amount * 100, // Amount in paise
      currency: "INR",
      receipt: newOrder._id.toString(),
    };
    const razorpayOrder = await razorpay.orders.create(options);

    res.json({ success: true, razorpayOrder, orderId: newOrder._id });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Verifying Razorpay payment
// Verifying Razorpay payment
// Verifying Razorpay payment
const verifyOrder = async (req, res) => {
  const { orderId, paymentId, signature, newOrderId } = req.body;
  console.log("Received data for verification:", { orderId, paymentId, signature, newOrderId });
  try {
    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${orderId}|${paymentId}`);
    const digest = shasum.digest("hex");

    if (digest === signature) {
      await orderModel.findByIdAndUpdate(newOrderId, { payment: true, status: "Food Processing" });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(newOrderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.error("Verification error", error);
    res.json({ success: false, message: "Error" });
  }
};



//user orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//Listing orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//api for updating order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
