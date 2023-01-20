const deportmentModel = require("../models/deportment.model")
const deportment = {

  AddDeportment: async (req, res) => {

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

      console.log(error,"error")
      res.status(500).send({
        message: "failed to create deportment"
      });
    }

  },

  GetDeportment: async (req, res) => {


    console.log("deportment recived :", req.body);

    try {
      let deportment = await deportmentModel.find({}).exec();
      res.send({
        message: "all deportment",
        data: deportment,
      });
    } catch (error) {
      res.status(500).send({
        message: "falled to get deportment",
      });
    }

  },

  GetSingleDeportment: async (req, res) => {
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
  },

  UpdateDeportment: async (req, res) => {

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
  },

  GetDeportmentspacific: async (req, res) => {
    console.log("data to be edited  :", req.body);

    try {
      let deportment = await deportmentModel
        .find({ createdBy: req.params.id  } || {adminId: req.params.id })
        .exec();
      console.log("deportment", deportment);

      res.send({
        message: "deportment  seccesfully",
        data: deportment,
      });
    } catch (error) {
      res.status(500).send({
        message: "deportment gettting error",
      });
    }

  },



DeleteDeportment :async(req,res)=>{
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

}

}
module.exports = deportment;

