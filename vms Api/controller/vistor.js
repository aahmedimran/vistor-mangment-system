const vistorModel = require("../models/vistor.model");

const Vistor = {

    AddVistor: async (req, res) => {
        console.log("deportment data received: ", req.body);

        let newVistor = new vistorModel({
            vistorName: req.body.vistorName,
            meetPersonName: req.body.meetPersonName,
            deportment: req.body.deportment,
            enterBy: req.body.enterBy,
        })
        try {
            let response = await newVistor.save()

            console.log("Vistor added: ", response);


            res.send({
                message: "Vistor added",
                data: response
            });

        } catch (error) {

            console.log(error, "error")
            res.status(500).send({
                message: "failed to create Vistor"
            });
        }
    },
    Getvistor :async (req, res) => {
        console.log("Vistor recived :", req.body);
        try {
          let Vistor = await vistorModel.find({}).exec();
          res.send({
            message: "all Vistor",
            data: Vistor,
          });
        } catch (error) {
          res.status(500).send({
            message: "falled to get Vistor",
          });
        }
      },


}
module.exports = Vistor;