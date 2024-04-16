const db=require("../database").getDb;
const bcrypt=require("bcryptjs");

const objId = require('mongodb').ObjectId;

const PDFDocument=require("pdfkit");
const p=require("path");
const fs=require("fs");
const template=require("../util/template");

exports.createAdmin=async(req,res,next)=>{

    const {name,email,password}=req.body;
    const admins=await db().collection("admins").findOne({email})

    if(admins){
        return res.status(409).json({message:"admin already exists"})
    }

    const encrypted = await bcrypt.hash(password,12);
    const result =await db().collection("admins").insertOne({name,email,password:encrypted, role:2})
    
    return res.status(201).json({message:"created"});
}

exports.fetchSuperAdmins = async (req, res, next) => {
  try {
    
    const superadmins = await db().collection("super-admin").find().toArray();

    res.status(200).json({ superadmins });
  } catch (error) {
    console.error("Error fetching super admins:", error);
    res.status(500).json({ message: "Error fetching super admins" });
  }
};


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

exports.approve = async(req, res, next) => {
    const stubId=req.params.stubId;
    const stub=await db().collection('pay_stubs').updateOne({_id:new objId(stubId)},{$set:{toConfirm:false}})
    return res.status(200).json(stub)
}



exports.fetchPayStub = async (req, res, next) => {
    try {
      
      const employees = await db().collection("pay_stubs").aggregate([{$lookup:{from:"employees",localField:"employeeId",foreignField:"_id",as:"result"}},
      {
          $match: {
              toConfirm: true
          }
      }]).toArray();
  
      res.status(200).json({ employees });
    } catch (error) {
      console.error("Error fetching paystubs:", error);
      res.status(500).json({ message: "Error fetching paystubs" });
    }
  };

  exports.getOneSuperAdmin=async(req,res,next)=>{
    const superadminId=req.params.superadminId;
    const superadmin=await db().collection("super-admin").findOne({ _id: new objId(superadminId) });
    if(superadmin){
      return res.status(200).json(superadmin)
    }
    return res.status(404).json({message:"not found a superadmin"})
  }
