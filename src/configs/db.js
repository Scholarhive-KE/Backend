const mongoose = require("mongoose");

// DB Connection Function
const connectDB = async () => {
  try {
    if (process.env.MONGO_URI) {
      MONGO_URI = process.env.MONGO_URI;
    } else {
      console.error(
        "Make sure MONGO_URI is present in the environment variables"
      );
      process.exit(1);
    }
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
