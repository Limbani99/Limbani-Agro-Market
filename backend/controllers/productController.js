const Product = require("../models/Product");

//add product in db
const AddProduct = async (req, res) => {

    const { sellerId, seller, sellerName, title, productName, description, category, brand, model, price, condition, manufactureYear, horsePower, fuelType, state, district, village, address, images } = req.body;

    try {
        const product = await Product.create({
            sellerId: sellerId || null,
            sellerName: sellerName || (typeof seller === 'string' ? seller : "Farmer / Dealer"),
            title: title || productName || "Agricultural Machinery",
            description,
            category: category || "Equipment",
            brand: brand || "General",
            model,
            price: price || "Contact for Price",
            condition: condition || "Used",
            manufactureYear,
            horsePower,
            fuelType,
            state,
            district,
            village,
            address,
            images: images || [],
        });
        res.status(201).json({
            message: "Product added successfully",
            product
        });
    } catch (error) {
        console.error("Add Product Error:", error);
        res.status(500).json({ message: error.message });
    }
}

//update product
const UpdateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { seller, title, description, category, brand, model, price, condition, manufactureYear, horsePower, fuelType, state, district, village, address, images } = req.body;
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        console.error("Update Product Error:", error);
        res.status(500).json({ message: error.message });
    }
}

//delete product
const DeleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully", product });
    } catch (error) {
        console.error("Delete Product Error:", error);
        res.status(500).json({ message: error.message });
    }
}

//get product by id
const GetProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product fetched successfully", product });
    } catch (error) {
        console.error("Get Product Error:", error);
        res.status(500).json({ message: error.message });
    }
}

//get all product
const GetAllProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ message: "Products fetched successfully", products });
    } catch (error) {
        console.error("Get All Product Error:", error);
        res.status(500).json({ message: error.message });
    }
}

//get product by category
const GetProductByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ category });
        res.status(200).json({ message: "Products fetched successfully", products });
    } catch (error) {
        console.error("Get Product By Category Error:", error);
        res.status(500).json({ message: error.message });
    }
}

//get product by category and state
const GetProductByCategoryAndState = async (req, res) => {
    try {
        const { category, state } = req.params;
        const products = await Product.find({ category, state });
        res.status(200).json({ message: "Products fetched successfully", products });
    } catch (error) {
        console.error("Get Product By Category And State Error:", error);
        res.status(500).json({ message: error.message });
    }
}

//get product by category, state and district
const GetProductByCategoryStateAndDistrict = async (req, res) => {
    try {
        const { category, state, district } = req.params;
        const products = await Product.find({ category, state, district });
        res.status(200).json({ message: "Products fetched successfully", products });
    } catch (error) {
        console.error("Get Product By Category State And District Error:", error);
        res.status(500).json({ message: error.message });
    }
}


module.exports = { AddProduct, UpdateProduct, DeleteProduct, GetProduct, GetAllProduct, GetProductByCategory, GetProductByCategoryAndState, GetProductByCategoryStateAndDistrict }