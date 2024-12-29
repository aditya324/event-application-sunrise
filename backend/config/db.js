import mongoose from "mongoose";

const connect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log(error);
  }
};

export default connect;
