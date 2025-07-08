// import mongoose from "mongoose";

//  export const connectDB=async()=>{
//     await mongoose.connect('mongodb+srv://snehareddy:sneha143@cluster0.agpkgrg.mongodb.net/food-del').then(()=>console.log("DB Connected"));
// }

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ DB Connected");
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1);
  }
};


