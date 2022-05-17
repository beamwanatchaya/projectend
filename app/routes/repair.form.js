module.exports = app => {
  var router = require("express").Router();
  const repairform = require("../controllers/repair.form.controller");
  
  router.post("/form", repairform.form);
  router.get("/getform/:id",repairform.findOne)
  router.get("/getform",repairform.getform)
  router.post("/updatestatus",repairform.updatestatus)
  router.get("/series",repairform.series)
  router.get("/series/:id",repairform.findstatic)
  router.post("/editform",repairform.updateedit)


  app.use('/api/repairForm', router);
};
