import mongoose from "mongoose";

export const connectDB = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected.");
  } catch (e) {
    console.error("Connection error", e);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB Disconnected");
  } catch (e) {
    console.error("Disconnection error,", e);
  }
};

mongoose.connection.on("connected", () => {
  console.log("connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("disconnected");
});

mongoose.connection.on("error", () => {
  console.log("error");
});

mongoose.connection.on("SIGINT", async () => {
  await mongoose.disconnect();
  process.exit(0);
});
