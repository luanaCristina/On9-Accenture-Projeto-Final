const mongoose = require("mongoose");
const TransitAgentUser = require("../models/TransitAgents");
const AmbulancesUser = require("../models/Ambulances");
const MessageSend = require("../models/Messages");


exports.get = (req, res, next) => {
    MessageSend.find()
      .then((messagesSend) => {
        res.status(200).json(messagesSend);
      })
      .catch((err) => next(err));
  };

exports.getById = (req, res) => {
  const id = req.params.id;
  MessageSend.findById(id)
    .then((messagesSend) => {
      res.status(200).json(messagesSend);
    })
    .catch((err) => next(err));
};

exports.postNewMessage = async (req, res, next) => {
  let { id } = req.body;
  const userAmbulance = await AmbulancesUser.findById(
    id,
    function (err, AmbulancesUser) {}
  );
  const userAgent = await TransitAgentUser.findById(
    id,
    function (err, TransitAgentUser) {}
  );

  //if (AmbulancesUser.findById(id, function (err, AmbulancesUser) {})) {
  if (userAmbulance) {
    const newMessageAmbulance = MessageSend({
      locationAmbulance: req.body.locationAmbulance,
      destinationHospital: req.body.destinationHospital,
      routesToHopital: req.body.routesToHopital,
      ambulanceName: userAmbulance.driverName,
      ambulancePlate: userAmbulance.licensePlate,
      ambulanceTelephone: userAmbulance.telephoneNumberAmbulance
    });
    newMessageAmbulance
      .save()
      .then((newMessageAmbulance) => {
        return res.status(201).json(newMessageAmbulance);
      })
      .catch((err) => next(err, "There is not an user with this id."));
  } else if (userAgent) {
    const newMessageAgent = new MessageSend({
      transitAgentlocation: req.body.transitAgentlocation,
      agentName: userAgent.transitAgentName,
      telephoneAgent: userAgent.telephoneNumberAgent

    });
    newMessageAgent
      .save()
      .then((newMessageAgent) => {
        return res.status(201).json(newMessageAgent);
      })
      .catch((err) => next(err, "There is not an user with this id."));
  } else {
    return "There is not an user with this id";
  }
};
