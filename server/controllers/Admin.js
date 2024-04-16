const db=require("../database").getDb;
const bcrypt=require("bcryptjs")
const Stripe = require("stripe");
const objId = require('mongodb').ObjectId;
const stripe = Stripe (
  "sk_test_51NG6ztILh5nwppOnquRWkswBrGm5eQ44zbWixGGHGvq0htV7rzfHBEZatN9rpx4f7wq9XnBpYfA2HXXXLlRXYTfX00CzvoFwMz"
);
const PDFDocument=require("pdfkit")
const p=require("path")
const fs=require("fs")
const template=require("../util/template")

exports.createEmployee=async(req,res,next)=>{

    const {name,email,password, salary}=req.body;
    const employees=await db().collection("employees").findOne({email})

    if(employees){
        return res.status(409).json({message:"employee already exists"})
    }

    const encrypted = await bcrypt.hash(password,12);
    const result =await db().collection("employees").insertOne({name,email,password:encrypted, role:1, salary:+salary})
    
    return res.status(201).json({message:"created"});
}

exports.fetchAdmins = async (req, res, next) => {
  try {
    
    const admins = await db().collection("admins").find().toArray();

    res.status(200).json({ admins });
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ message: "Error fetching admins" });
  }
};




exports.fetchEmployee = async (req, res, next) => {
  try {
    
    const employees = await db().collection("employees").find().toArray();

    res.status(200).json({ employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Error fetching employees" });
  }
};

exports.insertPayment=async(req,res,next)=>{

  const {amount, clientId}=req.body;
  const employees=await db().collection("payments").insertOne({ amount:+amount,status:"Finished", clientId:new objId(clientId) })
  
  return res.status(201).json({message:"created"});
}



exports.getPayments = async(req, res, next) => {
  const clientId = req.params.clientId;
  let unique = Math.random().toFixed(5) * 100000;
  // const path=p.join(__dirname,'..','data')
  const payments = await db().collection("payments").find({ clientId: new objId(req.params.clientId)}).toArray();
  const invoiceName = "invoice-" + ++unique + "_user-" + clientId + ".pdf";
    const filePath = p.join(
      __dirname,
      "..",
      "data",
      invoiceName
    );
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "application/pdf");

    const pdfDoc = new PDFDocument({ size: "A4" });
    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.pipe(res);

    template(pdfDoc, payments);
    pdfDoc.end();
};

exports.addPayStub=async(req,res,next)=>{
  const {salary, daysDifference,averageSalary,DaysOffAmount,expenses,totalAmount,startdate,enddate,employeeId}=req.body;

  try {
    // Insert pay stub into the database
    const result = await db().collection('pay_stubs').insertOne({
      salary,
      daysDifference,
      averageSalary,
      DaysOffAmount,
      expenses: +expenses, 
      totalAmount,
      startdate,
      enddate,
      employeeId: new objId(employeeId),
      toConfirm: true
    });

    // Respond with success message
    return res.status(201).json({ message: "Pay stub created successfully" });
  } catch (error) {
    console.error("Error creating pay stub:", error);
    // Respond with error message
    return res.status(500).json({ message: "Failed to create pay stub" });
  }
};

exports.getOneAdmin=async(req,res,next)=>{
  const adminId=req.params.adminId;
  const admin=await db().collection("admins").findOne({ _id: new objId(adminId) });
  if(admin){
    return res.status(200).json(admin)
  }
  return res.status(404).json({message:"not found a admin"})
}


exports.editAdmin = async (req, res, next) => {
  const { adminId } = req.params;
  const { name, email, password } = req.body;

  try {
    const encrypted=await bcrypt.hash(password,12)
    const admin = await db().collection("admins").updateOne({ _id: new objId(adminId) },{$set:{name,email,password:encrypted}});

    if (admin.modifiedCount === 0) {
      return res.status(500).json({ message: "Failed to update client" });
    }
    res.status(200).json({ message: "Client updated successfully" });

  } catch (error) {
    console.error("Error editing client:", error);
    res.status(500).json({ message: "Error editing client" });
  }
};

exports.deleteAdmin = async (req, res, next) => {
  const { adminId } = req.params;

  try {
    const result = await db().collection("admins").deleteOne({ _id: new objId(adminId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("Error deleting client:", error);
    res.status(500).json({ message: "Error deleting client" });
  }
};

exports.generateReceipt = async (req, res, next) => {
  const { paymentAmount, paymentDate, memo, clientId } = req.body;
  const datePart = paymentDate.slice(0, 10);


  try {
      // Insert receipt into the database
      const result = await db().collection('receipts').insertOne({
          paymentAmount: +paymentAmount,
          paymentDate: datePart,
          memo,
          clientId: new objId(clientId),

      });

      return res.status(201).json({ message: "Receipt generated successfully" });
  } catch (error) {
      console.error("Error generating receipt:", error);
      return res.status(500).json({ message: "Failed to generate receipt" });
  }
};

exports.getReceiptsByClientId = async (req, res, next) => {
  const clientId = req.params.clientId;

  try {
      const receipts = await db().collection("receipts").find({ clientId: new objId(clientId) }).toArray();

      return res.status(200).json({ receipts });
  } catch (error) {
      console.error("Error fetching receipts:", error);
      return res.status(500).json({ message: "Error fetching receipts" });
  }
};