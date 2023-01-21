const express = require("express");
const User = require("../controller/User")
const deportment = require("../controller/deportment");
const SubUser = require("../controller/SubUsers");
const Vistor = require("../controller/vistor");
const isAuth = require("../controller/isAuth")
const router = express.Router();
// user Routes
router.post("/Login",User.Login);
router.post("/SignUp", User.SignUp);
 router.post("/Otp", User.Otp);
 router.post("/ResendOtp", User.ResendOtp);
 router.post("/ResetPassword", User.ResetPassword);
router.post("/LogOut", User.LogOut);
router.get("/Profile",isAuth, User.Profile);
router.put("/Update/:id",isAuth, User.Update);
// router.put("/UpdatePassword/:id",isAuth, User.UpdatePassword);
router.post("/UpdatePassword",isAuth, User.UpdatePassword);


// subUserSchema Routes
router.post("/SubUserSignUp",isAuth, SubUser.SubUserSignUp);
router.get("/GetUsers/:id",isAuth, User.GetUsers);
router.get("/GetDeportmentspacific/:id",isAuth, deportment.GetDeportmentspacific);


// deportment Routes
router.post("/AddDeportment",isAuth, deportment.AddDeportment);
router.get("/GetDeportment",isAuth, deportment.GetDeportment);
router.get("/GetSingleDeportment/:id",isAuth, deportment.GetSingleDeportment);
router.put("/UpdateDeportment/:id",isAuth, deportment.UpdateDeportment);
router.delete("/DeleteDeportment/:id",isAuth, deportment.DeleteDeportment);


// Vistor Routes
router.post("/AddVistor",isAuth, Vistor.AddVistor);
router.get("/Getvistor",isAuth, Vistor.Getvistor);



module.exports = router;
