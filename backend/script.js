const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routers/user");
const productRouter = require("./routers/product");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use('/api/user', userRouter);
app.use('/api/product', productRouter)
const PORT = process.env.PORT || 8080;
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/limbani_agro";

mongoose.connect(MONGODB_URL)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
    res.send("Limbani Agro API Server is running");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});