const jwt = require ("jsonwebtoken");

function  isAuth(req, res, next) {

    console.log("req.cookies ", req.cookies.token);
  
    if (!req.cookies.token) {
      res.status(401).send("include http-only crediential with every request");
  
      return;
    }
    jwt.verify(req.cookies.token, process.env.JSON_SECRET, function (err, decodedData) {
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
};
module.exports =isAuth