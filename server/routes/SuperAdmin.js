const router=require('express').Router();

const superadminController = require("../controllers/Super-Admin");


router.get("/fetch", superadminController.fetchSuperAdmins);
router.post("/insertAdmin", superadminController.createAdmin);
router.put("/approve/:stubId", superadminController.approve);
router.get("/fetchPayStubs", superadminController.fetchPayStub);
router.get("/one-superadmin/:superadminId", superadminController.getOneSuperAdmin);


module.exports=router;