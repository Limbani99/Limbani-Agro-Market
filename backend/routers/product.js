const express = require("express");
const route = express.Router();
const { AddProduct, UpdateProduct, DeleteProduct, GetProduct, GetAllProduct } = require("../controllers/productController");

route.post("/", AddProduct);
route.post("/add-product", AddProduct);
route.delete("/delete-product/:id", DeleteProduct);
route.put("/update-product/:id", UpdateProduct);
route.get("/get-product-by-id/:id", GetProduct);
route.get("/get-all-product", GetAllProduct);

module.exports = route;