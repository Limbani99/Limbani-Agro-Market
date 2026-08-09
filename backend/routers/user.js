var express = require("express");
var route = express.Router();
const { UserRegister, userlogin } = require("../controllers/usercontroller");

route.post("/register", UserRegister)
route.post("/login", userlogin)

module.exports = route;
