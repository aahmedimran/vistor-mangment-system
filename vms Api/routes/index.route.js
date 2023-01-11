const express = require("express");
const User = require("../controller/User")
const deportment = require("../controller/deportment");
const isAuth = require("../controller/isAuth")
const router = express.Router();
// user Routes
router.post("/Login", User.Login);
router.post("/SignUp", User.SignUp);
router.post("/Otp", User.Otp);
router.post("/LogOut", User.LogOut);
router.get("/Profile",isAuth, User.Profile);
router.put("/Update/:id",isAuth, User.Update);

// deportment Routes
router.post("/AddDeportment",isAuth, deportment.AddDeportment);
router.get("/GetDeportment",isAuth, deportment.GetDeportment);
router.get("/GetSingleDeportment/:id",isAuth, deportment.GetSingleDeportment);
router.put("/UpdateDeportment/:id",isAuth, deportment.UpdateDeportment);
router.delete("/DeleteDeportment/:id",isAuth, deportment.DeleteDeportment);
module.exports = router;
