module.exports = app => {
    const repair = require("../controllers/repair.controller.js");
  
    var router = require("express").Router();
    router.post("/genusername",repair.genusername);
    router.post("/login",repair.login);
    router.post("/edituser",repair.edituser);
    router.get("/getuser",repair.getAll);
    router.get("/deleteuser/:id", repair.delete);
    router.post("/changepass",repair.changepass);
  
    app.use('/api/repair', router);
  };
  