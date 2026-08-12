const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

const UserRegister = async (req, res) => {
    try {
        const { name, email, password, address, description, skills, phone, profilePicture, role, profile } = req.body;
        const userRole = role || "user";

        if (!email || !name || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        const existinguser = await User.findOne({ email });
        if (existinguser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        const user = await User.create({
            name,
            email,
            password,
            address,
            description,
            skills: skills || [],
            phone,
            profilePicture,
            role: userRole,
            profile
        });

        const token = createToken(user);

        res.status(201).json({
            message: "Seller account created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            },
            token
        });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// user login
const userlogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({
            $or: [
                { email: email },
                { phone: email }
            ]
        });

        if (!user) {
            return res.status(404).json({ message: "Seller account not found" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = createToken(user);

        res.status(200).json({
            message: "Seller login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            },
            token
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// get all dealers
const GetAllDealers = async (req, res) => {
    try {
        const dealers = await User.find({ role: { $in: ["dealer", "user", "seller"] } }).select("-password");
        res.status(200).json(dealers);
    } catch (error) {
        console.error("Get Dealers Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// upload profile image
const Uploadprofileimg = async (req, res) => {
    try {
        const { id, profileimg } = req.body;
        const user = await User.findByIdAndUpdate(id, { profileimg }, { new: true });
        res.status(200).json(user);
    } catch (error) {
        console.error("Upload Profile Image Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// get profile image
const Getprofileimg = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findById(id).select("profileimg");
        res.status(200).json(user);
    } catch (error) {
        console.error("Get Profile Image Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// update user profile
const UpdateUserProfile = async (req, res) => {
    try {
        const { id, name, email, phone, address, description, skills, profileimg, coverimg } = req.body;
        const user = await User.findByIdAndUpdate(id, { name, email, phone, address, description, skills, profileimg, coverimg }, { new: true });
        res.status(200).json(user);
    } catch (error) {
        console.error("Update User Profile Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// get user profile
const GetUserProfile = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findById(id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.error("Get User Profile Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// update user password
const UpdateUserPassword = async (req, res) => {
    try {
        const { id, password } = req.body;
        const user = await User.findByIdAndUpdate(id, { password }, { new: true });
        res.status(200).json(user);
    } catch (error) {
        console.error("Update User Password Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// delete user
const DeleteUser = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findByIdAndDelete(id);
        res.status(200).json(user);
    } catch (error) {
        console.error("Delete User Error:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { UserRegister, userlogin, GetAllDealers, Uploadprofileimg, Getprofileimg, UpdateUserProfile, GetUserProfile, UpdateUserPassword, DeleteUser };