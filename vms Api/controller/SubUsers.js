const userModel = require("../models/user.model")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


const SubUser = {
    SubUserSignUp: async (req, res) => {
        let body = req.body;
        console.log("body", body)
        if (!body.firstName || !body.lastName || !body.email || !body.password || !body.adminId) {
            res.status(400).send(
                `required field missing, request example :
                {
                    firstName :"john"
                    lastName :"doe"
                    email  :"abd@abc.com
                    password :"12345"
                    role : "user"
                    adminId : "12abc456aa6b5a5fc5cf35ef"
                }`
            );
            return;
        }

        // check if user already exist // query email user

        userModel.findOne({ email: body.email }, async (err, user) => {
            if (!err) {
                console.log("user");

                if (user) {
                    //user already exist
                    console.log("user already exist :", user);
                    res
                        .status(400)
                        .send({ message: "user already exist,,Please try deffrent email" });
                    return;
                } else {
                    //user not already exist
                    const salt = await bcrypt.genSalt(10);
                    bcrypt.hash(body.password, salt).then((hashString) => {
                        userModel.create(
                            {
                                firstName: body.firstName,
                                lastName: body.lastName,
                                adminId: body.adminId,
                                role: "user",
                                isVarifed: true,
                                email: body.email.toLowerCase(),
                                password: hashString,
                            },
                            (err, result) => {
                                if (!err) {
                                    console.log("data saved:", result);
                                    res.status(201).send({ message: "user is created" });
                                } else {
                                    console.log("db error: ", err);
                                    res.status(500).send({ message: "internal server error" });
                                }
                            }
                        );
                    });
                }
            } else {
                console.log("db error: ", err);
                res.status(500).send({ message: "db error in query" });
                return;
            }
        });
    }

}

module.exports = SubUser