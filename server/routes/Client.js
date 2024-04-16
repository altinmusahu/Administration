const router=require('express').Router();

const clientController = require("../controllers/Clients");
const authController = require("../controllers/Authentication");


router.post("/register",clientController.createClient);
router.post("/login", authController.login);
router.post("/clients/payment/:clientId",clientController.createPayment);
router.get("/clients/fetchRecipts/:clientId", clientController.fetchRecipts);
router.get("/clients/fetchClients", clientController.fetchClients);
router.get("/clients/getPayments/:clientId", clientController.getPayments);
router.put("/edit/:clientId", clientController.editClient);
router.get("/one-clients/:clientId", clientController.getOneClient);
router.delete("/deleteclient/:clientId", clientController.deleteClient);
router.get("/client/fetchAllRecipts", clientController.fetchAllRecipts);

router.get("/getPDFClient/:clientId/:receiptId", clientController.generateReciptPDF);




module.exports=router;