const express = require("express");
const router = require('./routes/index.route.js')
const cors = require('cors')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectDB = require('./db/connect')
require('dotenv').config()
const PORT = process.env.PORT || 3001;
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

app.get('/', (req, res) => {

  res.send('Hello World!')
})
app.use("/api", router)





const start = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => { console.log(`Example app listening on port ${PORT}`) })
  }
  catch {
    console.log("error")
  }
}
start();
