import mongoose from "mongoose";

 export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://snehareddy:sneha143@cluster0.agpkgrg.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}

