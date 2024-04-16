const router=require('express').Router();

const employeeController = require("../controllers/Employees");


router.get("/fetchEmployees", employeeController.fetchEmployees);
router.get("/one-employee/:employeeId", employeeController.getOneEmployee);
router.get("/myemployeepaystub/:employeeId", employeeController.fetchPayStub);
router.get("/getPDF/:employeeId/:stubId", employeeController.generatePDF);
router.get("/one-employee/:employeeId", employeeController.getOneEmployee);
router.put("/editEmployee/:employeeId", employeeController.editEmployee);
router.delete("/deleteemployee/:employeeId", employeeController.deleteEmployee);
router.get("/getSalary:/employeeId", employeeController.getSalary);


module.exports=router;