var express = require("express");
var route = express.Router();
const { UserRegister, userlogin, GetAllDealers } = require("../controllers/usercontroller");

route.post("/register", UserRegister);
route.post("/login", userlogin);
route.get("/dealers", GetAllDealers);
route.get("/get-all-dealer", GetAllDealers);

module.exports = route;
