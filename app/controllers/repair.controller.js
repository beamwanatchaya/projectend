const Login = require("../models/login.model.js");

// Create and Save a new Tutorial
exports.genusername = (req, res) => {

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a login
  const login = new Login({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    lname: req.body.lname,
    room: req.body.room,
    phone: req.body.phone,
    role: req.body.role || "user"
  });

  // Save Tutorial in the database
  Login.create(login, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    else res.send(data);
  });
};
exports.login = (req, res) => {
  const login = new Login({
    username: req.body.username,
    password: req.body.password

  });

  Login.login(login, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

exports.getAll = (req, res) => {
  const title = req.query.title;

  Login.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving form."
      });
    else res.send(data);
  });
};

exports.delete = (req, res) => {
  Login.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Tutorial with id " + req.params.id
        });
      }
    } else res.send({ message: `deleted successfully!` });
  });
};
exports.changepass = (req, res) => {
  console.log(req.body)
  Login.changepass (req.body, (err, data) => {
   
    if (err){
      res.status(400).send({
        message: `can not change password ${req.body.id}.` ,status:400
      })
    }
    else{
      res.send(
        data
      );
    }
  }) 
}