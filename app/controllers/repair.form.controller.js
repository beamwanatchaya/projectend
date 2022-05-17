const Form = require("../models/form.model.js");
const sql = require("../models/db");
// Create and Save a new form
exports.form = (req, res) => {

  console.log("req ===>"  ,  req.body)
 
    // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a form
  const form = new Form({
    name: req.body.name,
    surname: req.body.surname,
    phone: req.body.phone,
    room: req.body.room,
    details: req.body.details,
    date: req.body.date,
    iduser: req.body.iduser,
    status : req.body.status
  });

  // Save form in the database
 Form.create(form, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the form."
      });
    else res.send(data);
  });
};
exports.getform = (req, res) => {
  const title = req.query.title;

  Form.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving form."
      });
    else res.send(data);
  });
};
exports.findOne = (req, res) => {
  Form.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutorial with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.updatestatus = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Form.updatestatus(
    req,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutorial with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Tutorial with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.series = (req, res) => {
  console.log(req)
  Form.getseries((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving form."
      });
    else res.send(data);
  }); 
};
// findstatic
exports.findstatic = (req, response) => {
  console.log(req.params.id)
  let id = req.params.id
  // Form.getstatic((err, data) => {
  //   if (err)
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while retrieving form."
  //     });
  //   else res.send(data);
  // }); 
  let query = `SELECT status,COUNT(id) as count FROM form WHERE iduser = ${id} AND MONTH(date) = MONTH(CURRENT_DATE) GROUP  BY status`;


  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("getallform: ", res);
    response.send(res)
    // result(null, res);
  });
};
exports.updateedit = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Form.editform(
    req,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutorial with id .`
          });
        } else {
          res.status(500).send({
            message: "Error updating Tutorial with id " 
          });
        }
      } else res.send(data);
    }
  );
};
