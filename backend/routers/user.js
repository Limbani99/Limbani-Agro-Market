var express = require("express");
var route = express.Router();
const {
    UserRegister,
    userlogin,
    GetAllDealers,
    Uploadprofileimg,
    Getprofileimg,
    UpdateUserProfile,
    GetUserProfile
} = require("../controllers/usercontroller");

route.post("/register", UserRegister);
route.post("/login", userlogin);
route.get("/dealers", GetAllDealers);
route.get("/get-all-dealer", GetAllDealers);

route.put("/update-profile", UpdateUserProfile);
route.post("/get-profile", GetUserProfile);
route.put("/upload-profile-img", Uploadprofileimg);
route.post("/get-profile-img", Getprofileimg);

module.exports = route;
