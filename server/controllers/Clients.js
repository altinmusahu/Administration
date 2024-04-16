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
const createClientInvoice=require("../util/clientTemplate");

exports.createClient=async(req,res,next)=>{

    const {name,email,password}=req.body;
    const client=await db().collection("clients").findOne({email})

    if(client){
        return res.status(409).json({message:"user already exists"})
    }

    const encrypted = await bcrypt.hash(password,12);
    const result =await db().collection("clients").insertOne({name,email,password:encrypted, role:0})
    
    return res.status(201).json({message:"created"});
}


  exports.createPayment = async (req, res, next) => {
  return stripe.checkout.sessions
  .create({
    payment_method_types: ["card"],
    mode: "payment",
    // line_items: data.map((p) => {
       line_items:[{
        price_data: {
          product_data: {
            name: "product1",
            description:'this is a product',
          },
          unit_amount: 1 * 100,
          currency: "usd",
        },
        quantity: 1,
      }],
    success_url: "http://localhost:3000/clients/payment",
    cancel_url: "http://localhost:3000/clients/payment",
  })
  .then(async(session) => {
    // data.forEach((rezervimi) => {
      const result=await db().collection("payments").insertOne({paymentId:session.id,status: "Finished",amount:session.amount_total,clientId:new objId(req.params.clientId)})
      
    return res.status(200).json({ url: session.url, sessionId: session.id });
  })
  .catch((err) => {
    console.log(err);
  });

};

exports.fetchClients = async (req, res, next) => {
  try {
    
    const clients = await db().collection("clients").find().toArray();

    res.status(200).json({ clients });
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ message: "Error fetching clients" });
  }
};


exports.getOneClient=async(req,res,next)=>{
  const clientId=req.params.clientId;
  const client=await db().collection("clients").findOne({ _id: new objId(clientId) });
  if(client){
    return res.status(200).json(client)
  }
  return res.status(404).json({message:"not found a client"})
}

exports.fetchRecipts = async (req, res, next) => {
  try {
    
    const recipts = await db().collection("receipts").find({ clientId: new objId(req.params.clientId)}).toArray();

    res.status(200).json({ recipts });
  } catch (error) {
    console.error("Error fetching recipts:", error);
    res.status(500).json({ message: "Error fetching recipts" });
  }
};

exports.fetchAllRecipts = async (req, res, next) => {
  try {
    
    const recipts = await db().collection("recipts").find().toArray();

    res.status(200).json({ recipts });
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ message: "Error fetching clients" });
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

exports.getOneClient=async(req,res,next)=>{
  const clientId=req.params.clientId;
  const client=await db().collection("clients").findOne({ _id: new objId(clientId) });
  if(client){
    return res.status(200).json(client)
  }
  return res.status(404).json({message:"not found a client"})
}

exports.editClient = async (req, res, next) => {
  const { clientId } = req.params;
  const { name, email, password } = req.body;

  try {
    const encrypted=await bcrypt.hash(password,12)
    const client = await db().collection("clients").updateOne({ _id: new objId(clientId) },{$set:{name,email,password:encrypted}});

    if (client.modifiedCount === 0) {
      return res.status(500).json({ message: "Failed to update client" });
    }
    res.status(200).json({ message: "Client updated successfully" });

  } catch (error) {
    console.error("Error editing client:", error);
    res.status(500).json({ message: "Error editing client" });
  }
};

exports.deleteClient = async (req, res, next) => {
  const { clientId } = req.params;

  try {
    const result = await db().collection("clients").deleteOne({ _id: new objId(clientId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("Error deleting client:", error);
    res.status(500).json({ message: "Error deleting client" });
  }
};

exports.generateReciptPDF = async(req, res, next) => {
  const receiptId = req.params.receiptId;
  const clientId  = req.params.clientId ;

  let unique = Math.random().toFixed(5) * 100000;

  const receipt = await db().collection("receipts").findOne({ _id: new objId(receiptId), clientId: new objId(clientId) });

  if (!receipt) {
    return res.status(404).json({ message: "Receipt not found" });
}

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

    createClientInvoice(pdfDoc, receipt);
    pdfDoc.end();
};



