const mongoose = require("mongoose");
const AmbulancesUser = require("../models/Ambulances");
const { signupSchema } = require("../validators/ambulance");
const bcrypt = require("bcrypt");
const bcryptSalt = 8;

exports.get = (req, res, next) => {
  AmbulanceUser.find()
    .then((ambulances) => {
      resp.status(200).json(ambulances);
    })
    .catch((err) => next(err));
};

exports.getById = (req, res) => {
  const id = req.params.id;
  ambulances
    .findById(id)
    .then((ambulance) => {
      res.status(200).json(ambulance);
    })
    .catch((err) => next(err));
};

exports.post = async (req, res, next) => {
  const {
    email,
    driverName,
    password,
    driverCPF,
    licensePlate,
    location,
    destination,
    routesToHopital,
    telephoneNumberAmbulance,
  } = req.body;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  try {
    const hashPass = await bcrypt.hashSync(password, salt);

    const newAmbulance = new AmbulancesUser({
      email,
      driverName,
      hashPass,
      driverCPF,
      licensePlate,
      location,
      destination,
      routesToHopital, 
      telephoneNumberAmbulance
    });
    newAmbulance
      .save()
      .then((ambulance) => {
        res.status(201).json(ambulance);
      })
      .catch((err) => next(err));
  } catch (e) {
    return res.status(401).json({ error: "erro" });
  }
};


