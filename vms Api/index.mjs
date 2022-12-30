import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { stringToHash, varifyHash } from "bcrypt-inzi";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import nodemailer from 'nodemailer'

const port = process.env.port || 3001;
const SECRET = process.env.SECRET || "topsecret";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "*"],

    credentials: true,
  })
);


let dbURI =
  process.env.MONGOOSEDBURI ||
  "mongodb+srv://abc:abc@cluster0.olyure1.mongodb.net/socialmediaapp?retryWrites=true&w=majority";
mongoose.connect(dbURI);



// userSchema 
let userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isVarifed: { type: Boolean, default:false },
  otp:{type :String}

}, {
  timestamps: true
})
const userModel = mongoose.model("User", userSchema);




// deportmentSchema
let deportmentSchema = new mongoose.Schema({
  deportmentName: { type: String, required: true, trim: true },
  contactPerson: { type: String, required: true },
  createdBy: { type: String, required: true }
}
,
{
  timestamps: true
},

)
const deportmentModel = mongoose.model("deportment", deportmentSchema);





app.post("/verifyOTP", async (req, res) => {
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
});




// signUp

app.post('/signup', (req, res) => {
  let body = req.body
  console.log(body, "body")
  if (!body.firstName || !body.lastName || !body.email || !body.password) {
    res.status(400).send(
      `
required filled missing, request example
{
firstName = 'john'
lastName = 'doe
email = 'abc@abc.com'
password = '12345'
}`
    );
    return
  }

  // check if user already exist // query email user

  userModel.findOne({ email: body.email }, (err, user) => {
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

        stringToHash(body.password).then((hashString) => {

          const otp = `${Math.floor(1000 + Math.random() * 900000)}`;

          let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "ahmed.eng2709@gmail.com",
              pass: "reylbhjxktkesqne",
            },
          });

          let mailOptions = {
            from: "ahmed.eng2709@gmail.com",
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
              otp,
            })
            .then((result) => {
              console.log("data saved: ", result);
              res.status(200).send({ message: "user is created" });
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
});


// login

app.post("/login", (req, res) => {
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
    "email firstName lastName password isVarifed",
    (err, user) => {
      if (!err) {

        if (user) {
          // user found
          varifyHash(body.password, user.password).then((isMatched ) => {
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
                SECRET
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
});


// Middle ware

app.use(function (req, res, next) {

  console.log("req.cookies ", req.cookies.token);

  if (!req.cookies.token) {
    res.status(401).send("include http-only crediential with every request");

    return;
  }
  jwt.verify(req.cookies.token, SECRET, function (err, decodedData) {
    if (!err) {
      console.log("decodedData :", decodedData);

      const nowDate = new Date().getTime() / 1000;

      if (decodedData.exp < nowDate) {
        //expire after 5 min (in milis)

        res.status(401).send("token expired");

      } else {
        // issue new token
        // var token = jwt.sign(
        //   {
        //     id: decodedData.id,
        //     name: decodedData.name,
        //     email: decodedData.email,
        //   },
        //   SERVER_SECRET
        // );
        // res.cookie("jToken", token, {
        //   maxAge: 86_400_00,
        //   httpOnly: true,
        // });

        console.log("token approved");
        req.body.token = decodedData;

        next();
      }
    } else {
      res.status(401).send("invalid token");
    }
  });
});





// logOut Handler

app.post("/logout", (req, res) => {
  let body = req.body;

  res.cookie("token", "", {
    maxAge: 0,
    httpOnly: true,
  });

  res.send({
    message: "logout successful",
  });
});





// edit profile
app.put("/profile/:id", async (req, res) => {
  console.log("data to be edited  :", req.body);

  let pupdate = {}
  if (req.body.firstName) pupdate.firstName = req.body.firstName;
  if (req.body.lastName) pupdate.lastName = req.body.lastName;
  if (req.body._id) pupdate._id = req.body._id;
  try {
    let updated = await userModel
      .findOneAndUpdate({ _id: req.params.id }, pupdate, { new: true })
      .exec();


    res.send({
      message: "profile updated seccesfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).send({
      message: "falled to updated profile",
    });
  }

})

//get profile 
app.get("/profile", async (req, res) => {
  console.log("req.body.token:", req.body.token);
  try {
    let user = await userModel.findOne({ _id: req.body.token._id }).exec();
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: "error getting users" });
  }
});



// create new deportment

app.post("/deportment", async (req, res) => {

  console.log("deportment data received: ", req.body);

  let newDeportment = new deportmentModel({
    deportmentName: req.body.deportmentName,
    contactPerson: req.body.contactPerson,
    createdBy: req.body.createdBy,
  })
  try {
    let response = await newDeportment.save()

    console.log("deportment added: ", response);


    res.send({
      message: "deportment added",
      data: response
    });

  } catch (error) {
    res.status(500).send({
      message: "failed to create deportment"
    });
  }
})



// get deportment

app.get("/deportment", async (req, res) => {
  console.log("deportment recived :", req.body);

  try {
    let deportment = await deportmentModel.find({}).exec();

    // console.log("all deportment");

    res.send({
      message: "all deportment",
      data: deportment,
    });
  } catch (error) {
    res.status(500).send({
      message: "falled to get deportment",
    });
  }
  console.log("all deportment 🚑🚑🚑🚑🚑🚑");
});





// single deportment
app.get("/deportment/:id", async (req, res) => {
  console.log("deportment: ", req.body);

  try {
    let deportment = await deportmentModel.findOne({ _id: req.params.id }).exec();

    console.log("deportment", deportment);

    res.send({
      message: "deportment ",
      data: deportment,
    });
  } catch (error) {
    res.status(500).send({
      message: "falled to get deportment",
    });
  }
});


app.put("/deportment/:id", async (req, res) => {
  console.log("data to be edited  :", req.body);

  let update = {}

  if (req.body.deportmentName) update.deportmentName = req.body.deportmentName;
  if (req.body.contactPerson) update.contactPerson = req.body.contactPerson;


  try {
    let updated = await deportmentModel
      .findOneAndUpdate({ _id: req.params.id }, update, { new: true },)
      .exec();
    console.log("deportment data updated", updated);

    res.send({
      message: "deportment data updated seccesfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).send({
      message: "falled to updated deportment data",
    });
  }
});

//delete  deportment

app.delete("/deportment/:id", async (req, res) => {
  console.log("data to be edited  :", req.body);

  try {
    let deleted = await deportmentModel
      .deleteOne({ _id: req.params.id })
      .exec();
    console.log("deportment deleted", deleted);

    res.send({
      message: "deportment deleted seccesfully",
      data: deleted,
    });
  } catch (error) {
    res.status(500).send({
      message: "falled to deleted deportment",
    });
  }
});




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on("connected", function () {
  //connected
  console.log("Mongoose is connected");
});

mongoose.connection.on("disconnected", function () {
  //disconnected
  console.log("Mongoose is disconnected");
  process.exit(1);
});

mongoose.connection.on("error", function (err) {
  //any error
  console.log("Mongoose connection error: ", err);
  process.exit(1);
});

process.on("SIGINT", function () {
  /////this function will run jst before app is closing
  console.log("app is terminating");
  mongoose.connection.close(function () {
    console.log("Mongoose default connection closed");
    process.exit(0);
  });
});