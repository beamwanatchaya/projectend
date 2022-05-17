const sql = require("./db.js");

// constructor
const Login = function (login) {
    this.username = login.username;
    this.password = login.password;
    this.name = login.name;
    this.lname = login.lname;
    this.room = login.room;
    this.phone = login.phone;
    this.role = login.role;

};

Login.create = (newLogin, result) => {
    let status = "duplicate"
    sql.query(`SELECT * FROM login WHERE username = ?`, newLogin.username, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.length == 0) {
            // not found Tutorial with the id
            console.log("Noooooo");
            sql.query("INSERT INTO login SET ?", newLogin, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }

                console.log("genusername succeed: ", { id: res.insertId, ...newLogin });
                status = "genusername succeed";
                console.log(res);
                result(null, status);
            });

        }
        if (res.length != 0) {
            console.log(res);
            result(null, status);
        }

    });

};
Login.login = (login, result) => {
    sql.query(`SELECT * FROM login WHERE username = ?  AND password = ?`, [login.username, login.password], (err, res) => {


        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.length == 0) {
            // not found Tutorial with the id
            result(null, "incorrect");
        }
        if (res.length != 0) {
            const userData = new Object()
            const results = JSON.parse(JSON.stringify(res))
            results.forEach(data => {
                userData.user_id = data.id
                userData.username = data.username
                userData.name = data.name
                userData.lname = data.lname
                userData.room = data.room
                userData.phone = data.phone
                userData.role = data.role
            });
            console.log("login succeed");
            result(null, userData);
        }

    });
};
Login.getAll = (title, result) => {
    let query = "SELECT * FROM login";


    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("getalluser: ", res);
        result(null, res);
    });
};

Login.remove = (id, result) => {
    sql.query("DELETE FROM login WHERE id = ?", id, (err, res) => {
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

        console.log("deleted tutorial with id: ", id);
        result(null, res);
    });
};



module.exports = Login;
