const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
        sellerName: {
            type: String,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
        },

        category: {
            type: String,
            required: true,
        },

        brand: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        condition: {
            type: String,
            enum: ["New", "Used"],
            default: "Used",
        },

        manufactureYear: { type: String },


        address: {
            state: { type: String },
            district: { type: String },
            village: { type: String },
            address: { type: String },
        },

        images: [String],


        sold: {
            type: Boolean,
            default: false,
        },

        views: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);
``

const drivable_vehicles = new mongoose.Schema({
    horsePower: { type: String },

    fuelType: {
        type: String,
        enum: ["Diesel", "Petrol", "Electric"],
    },
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Product", productSchema);