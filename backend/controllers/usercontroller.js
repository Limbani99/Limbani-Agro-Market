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

module.exports = { UserRegister, userlogin };