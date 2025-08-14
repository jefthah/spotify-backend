import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Menghubungkan ke MongoDB menggunakan URI yang ada di .env
    const connection = await mongoose.connect(`${process.env.MONGODB_URL}/spotify`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process jika koneksi gagal
  }
};

export default connectDB;
