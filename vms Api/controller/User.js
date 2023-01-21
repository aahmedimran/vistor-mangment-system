const userModel = require("../models/user.model")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer")
const User = {

  Login: async (req, res) => {

    let body = req.body;
    console.log("body", body);

    if (!body.email || !body.password) {
      // null check - undefined, "", 0 , false, null , NaN
      res.status(400).send(
        `required fields missing, request example: 
                  {
                      "email": "abc@abc.com",
                      "password": "12345"
                  }`
      );
      return;
    }

    // check if user already exist // query email user
    userModel.findOne(
      { email: body.email },
      // { email:1, firstName:1, lastName:1, age:1, password:0 },
      "email firstName lastName password isVarifed adminId role",
      (err, user) => {
        if (!err) {

          if (user) {
            // user found
            bcrypt.compare(body.password, user.password).then((isMatched) => {
              console.log("isMatched: ", isMatched);

              if (isMatched && user.isVarifed) {
                //  JWT token

                var token = jwt.sign(
                  {
                    _id: user._id,
                    email: user.email,
                    iat: Math.floor(Date.now() / 1000) - 30,
                    exp: Math.floor(Date.now() / 1000) + 60 * 60,
                  },
                  process.env.JSON_SECRET
                );

                console.log("token :", token);
                //token send on cookies
                res.cookie("token", token, {
                  maxAge: 86_400_00,
                  httpOnly: true, //httpOnly cookies most secure
                });

                res.send({
                  message: "login successful",
                  profile: {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    adminId: user.adminId,
                    role: user.role,
                    _id: user._id,

                  },
                });
                return;
              } else {
                console.log("user not found");
                res.status(401).send({ message: "Incorrect email or password" });
                return;
              }
            });
          } else {
            // user not already exist
            console.log("user not found");
            res.status(401).send({ message: "Incorrect email or password" });
            return;
          }
        } else {
          console.log("db error: ", err);
          res.status(500).send({ message: "login failed, please try later" });
          return;
        }
      }
    );

  },
  SignUp: async (req, res) => {
    let body = req.body
    console.log(body, "body")
    if (!body.firstName || !body.lastName || !body.email || !body.password || !body.role) {
      res.status(400).send(
        `
  required filled missing, request example
  {
  firstName = 'john'
  lastName = 'doe
  email = 'abc@abc.com'
  "role" : "admin,user"
  password = '12345'
  }`
      );
      return
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
            .send({ message: "user already exist,Please try deffrent email" });
          return;
        } else {
          //user not already exist
          const salt = await bcrypt.genSalt(10);
          bcrypt.hash(body.password, salt).then((hashString) => {
            const otp = `${Math.floor(1000 + Math.random() * 900000)}`;

            let transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: process.env.Email_SENDER,
                pass: process.env.PASSWARD_SENDER,
              },
            });

            let mailOptions = {
              from: "aaaaaa@gmail.com",
              to: body.email,
              subject: "Sending Email Using Node.js",
              html: `<p>Enter <b>${otp} </b> in the app to verifiy your email address and complete</p>`,
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }


            });
            userModel.create(
              {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email.toLowerCase(),
                password: hashString,
                role: body.role,
                otp,
              })
              .then((result) => {
                console.log("data saved: ", result);
                res.status(200).send({
                  message: "user is created",
                  data: result


                });
              })
              .catch((err) => {
                console.log("db error: ", err);
                res.status(500).send({ message: "internal server error" });
              });




          });
        }
      } else {
        console.log("db error: ", err);
        res.status(500).send({ message: "db error in query" });
        return;
      }
    });

  },

  Otp: async (req, res) => {
    try {
      let { email, otp } = req.body;
      if (!email || !otp) {
        return res.status(400).send("empty otp details ate not allowed");
      } else {
        const user = await userModel.findOne({ email });
        if (otp === user.otp) {
          await userModel.updateOne({ email }, { isVarifed: true, otp: null });

          return res.status(200).send({ message: "correct otp" });
        } else {
          return res.status(403).send({ message: "incorrect otp" });
        }
      }
    } catch (error) {
      console.log(error, "error");
      res.json({
        status: "failed",
        message: "error.message",
      });
    }
  },

  ResendOtp: async (req, res) => {

    console.log(req.body.email, "req.body.email")
    try {
      let email = req.body.email;
      if (!email) {
        return res.status(400).send("empty email details ate not allowed");
      } else {
        const user = await userModel.findOne({ email });
        if (user.isVarifed) {
          return res.status(200).send({ message: "This User is already verifed" });
        }
        if (email === user.email) {
          const otp = `${Math.floor(1000 + Math.random() * 900000)}`;
          let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.Email_SENDER,
              pass: process.env.PASSWARD_SENDER,
            },
          });

          let mailOptions = {
            from: "aaaaaa@gmail.com",
            to: req.body.email,
            subject: "Sending Email Using Node.js",
            html: `<p>Hi ${user.firstName} please   Enter <b>${otp} </b> in the app to verifiy your email address and complete</p>
              click here to </b>
               <a href = 'localhost:3001/api/Otp${user.email}'>verify now</a> 
              
              `,

          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }

          })

          await userModel.updateOne({ email }, { otp });

          return res.status(200).send({ message: "otp resended" });
        } else {
          return res.status(403).send({ message: "Error in resend  otp" });
        }
      }
    } catch (error) {
      console.log(error, "error");
      res.json({
        status: "failed",
        message: "error.message",
      });
    }
  },

  LogOut: async (req, res) => {

    let body = req.body;
    console.log(body)
    res.cookie("token", "", {
      maxAge: 0,
      httpOnly: true,
    });

    res.send({
      message: "logout successful",
    });


  },

  Profile: async (req, res) => {
    console.log("req.body.token:", req.body.token);
    try {
      let user = await userModel.findOne({ _id: req.body.token._id }).exec();
      res.send(user);
    } catch (error) {
      res.status(500).send({ message: "error getting users" });
    }
  },


  GetUsers: async (req, res) => {
    console.log("data to be edited  :", req.body);

    try {
      let user = await userModel
        .find({ adminId: req.params.id })
        .exec();
      console.log("User", user);

      res.send({
        message: "user  seccesfully",
        data: user,
      });
    } catch (error) {
      res.status(500).send({
        message: "user gettting error",
      });
    }

  },

  Update: async (req, res) => {
    console.log("data to be edited  :", req.body);

    let profileUpdate = {}
    if (req.body.firstName) profileUpdate.firstName = req.body.firstName;
    if (req.body.lastName) profileUpdate.lastName = req.body.lastName;

    try {
      let updated = await userModel
        .findOneAndUpdate({ _id: req.params.id }, profileUpdate, { new: true })
        .exec();

      console.log("profile updated", updated);

      res.send({
        message: "profile updated seccesfully",

        data: updated,
      });
    } catch (error) {
      res.status(500).send({
        message: "falled to updated profile",
      });
    }
  },

  // UpdatePassword: async (req, res) => {
  //   console.log("data :", req.body);
  //   let passwordUpdate = {}
  //   const salt = await bcrypt.genSalt(10);
  //   bcrypt.hash(req.body.password, salt).then(async (hashString) => {
  //     passwordUpdate.password = hashString
  //     try {

  //       let updated = await userModel
  //         .findOneAndUpdate({ _id: req.params.id }, passwordUpdate, { new: true })
  //         .exec();
  //       // 
  //       console.log("password updated", updated);

  //       res.send({
  //         message: "password updated seccesfully",

  //         data: updated,
  //       });
  //     } catch (error) {
  //       res.status(500).send({
  //         message: "falled to updated password",
  //       });
  //     }
  //   })
  // },
  UpdatePassword: async (req, res) => {

    console.log(req.body, "req.body🚗🚗🚗🚗");
    try {
      console.log(req.body, "try");
      let _id = req.body._id;
      let previousPassword = req.body.previousPassword;
      let newPassword = req.body.newPassword;

      if (!_id || !previousPassword || !newPassword) {
        return res.status(400).send("empty password change details ate not allowed");
      } else {
        const user = await userModel.findOne({ _id });
        bcrypt.compare(req.body.previousPassword, user.password).then(async (isMatched) => {
          if (isMatched) {
            const salt = await bcrypt.genSalt(10);
            bcrypt.hash(req.body.newPassword, salt).then(async (hashString) => {
              await userModel.updateOne({ _id }, { password: hashString });

              return res.status(200).send({ message: "Password Update" });
            })
          } else {
            return res.status(403).send({ message: "error Password Update" });
          }

        })
      }
    } catch (error) {
      console.log(error, "error");
      res.json({
        status: "failed",
        message: "error.message",
      });
    }
  },

  ResetPassword: async (req, res) => {
    try {
      let email = req.body.email;
      let newPassword = req.body.newPassword;
      if (!email || !newPassword) {
        return res.status(400).send("empty email details ate not allowed");
      } else {
        const user = await userModel.findOne({ email });
        if (email === user.email) {
          const otp = `${Math.floor(1000 + Math.random() * 900000)}`;
          let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.Email_SENDER,
              pass: process.env.PASSWARD_SENDER,
            },
          });
          let mailOptions = {
            from: "aaaaaa@gmail.com",
            to: req.body.email,
            subject: "Sending Email Using Node.js",
            html: `<p>Hi ${user.firstName} please   Enter <b>${otp} </b> in the app to verifiy your email address and complete</p>
              click here to </b>
               <a href = 'localhost:3001/api/Otp${user.email}'>verify now</a>  `,
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }

          })

          const salt = await bcrypt.genSalt(10);
          bcrypt.hash(req.body.newPassword, salt).then(async (hashString) => {
            await userModel.updateOne({ email }, { password: hashString, isVarifed: false, otp: otp });
            return res.status(200).send({ message: "Reset Password Sucsessfully" });
          })
        } else {
          return res.status(403).send({ message: "incorrect otp" });
        }
      }
    } catch (error) {
      console.log(error, "error");
      res.json({
        status: "failed",
        message: "error.message",
      });
    }
  },


}
module.exports = User