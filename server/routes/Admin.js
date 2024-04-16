const router=require('express').Router();

const adminController = require("../controllers/Admin");


router.post("/insertEmployee", adminController.createEmployee);
router.post("/insertPayments", adminController.insertPayment);
router.get("/fetchAdmins", adminController.fetchAdmins);
router.get("/fetchAdmins", adminController.fetchAdmins);
router.post("/expenses", adminController.addPayStub);
router.post("/generate", adminController.generateReceipt);
router.get("/generateOne/:clientId", adminController.getReceiptsByClientId)
router.get("/one-admins/:adminId", adminController.getOneAdmin);
router.put("/editAdmin/:adminId", adminController.editAdmin);
router.delete("/deleteadmin/:adminId", adminController.deleteAdmin);

module.exports=router;