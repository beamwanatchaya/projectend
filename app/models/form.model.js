const sql = require("./db.js");

// constructor
const Form = function (form) {
  this.name = form.name;
  this.surname = form.surname;
  this.phone = form.phone;
  this.room = form.room;
  this.details = form.details;
  this.date = form.date;
  this.iduser = form.iduser;
  this.status = form.status;

};

Form.create = (newForm, result) => {
  let status = ""

  console.log("newForm ===>", newForm)
  sql.query("INSERT INTO form SET ?", newForm, (err, res) => {

    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("sendform succeed: ", { id: res.insertId, ...newForm });
    status = "sendform succeed";
    console.log(res);
    result(null, status);
  });





};
Form.getAll = (title, result) => {
  let query = "SELECT * ,DATE_FORMAT(date,'%d/%m/%Y %H:%i:%s') AS dates FROM form";


  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("getallform: ", res);
    result(null, res);
  });
};
Form.findById = (id, result) => {
  sql.query(`SELECT * ,DATE_FORMAT(date,'%d/%m/%Y %H:%i:%s') AS dates  FROM  form WHERE iduser = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found data: ", res[0]);
      result(null, res);
      return;
    }

    // not found l with the id
    result({ kind: "not_found" }, null);
  });
};
Form.updatestatus = (req, result) => {

  sql.query(
    "UPDATE form SET status =? WHERE id = ?",
    [req.body.status, req.body.id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated : ", { messege: "succed" });
      result(null, { messege: "succed" });
    }
  );
};

Form.getseries = (result) => {
  let query = "SELECT status,COUNT(id) as count FROM form WHERE  MONTH(date) = MONTH(CURRENT_DATE) GROUP BY status";


  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
  

    console.log("getallform: ", res);
    result(null, res);
  });
};
Form.getstatic = (result) => {
  let query = "SELECT status,COUNT(id) as count FROM form GROUP BY status";


  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
  

    console.log("getallform: ", res);
    result(null, res);
  });
};

Form.editform = (req, result) => {
  sql.query(
    "UPDATE form SET name = ?, surname = ?, phone = ? , room = ?, details = ?, date = ?   WHERE id = ?",
    [req.body.name, req.body.surname, req.body.phone, req.body.room, req.body.details, req.body.date,  req.body.id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found req with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("edit : ", { messege: "succed" });
      result(null, { messege: "succed" });
    }
  );
};
module.exports = Form;
