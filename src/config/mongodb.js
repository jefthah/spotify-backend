import mongoose from "mongoose";

const connectDB = async () => {
  // Event listener untuk koneksi yang berhasil
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connection established");
  });

  // Event listener untuk error koneksi
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  // Event listener untuk disconnect
  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB connection disconnected");
  });

  try {
    // Koneksi ke MongoDB Atlas menggunakan URL dari environment variable
    await mongoose.connect(`${process.env.MONGODB_URL}/spotify`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection successful");
  } catch (err) {
    console.error("Error while connecting to MongoDB:", err);
    process.exit(1);  // Keluar dari aplikasi jika koneksi gagal
  }
};

export default connectDB;
