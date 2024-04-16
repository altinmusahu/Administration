const db=require("../database").getDb;
const bcrypt=require("bcryptjs")
const objId = require('mongodb').ObjectId;

const PDFDocument=require("pdfkit")
const p=require("path")
const fs=require("fs")
const template=require("../util/employeeTemplate")



exports.fetchEmployees = async (req, res, next) => {
  try {
    
    const employees = await db().collection("employees").find().toArray();

    res.status(200).json({ employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Error fetching employees" });
  }
};


exports.getOneEmployee=async(req,res,next)=>{
    const employeeId=req.params.employeeId;
    const employee=await db().collection("employees").findOne({ _id: new objId(employeeId) });
    if(employee){
      return res.status(200).json(employee)
    }
    return res.status(404).json({message:"not found a employee"})
  }



  exports.fetchPayStub = async (req, res, next) => {
    try {
        const employee = req.params.employeeId;
      const employees = await db().collection("pay_stubs").aggregate([{$lookup:{from:"employees",localField:"employeeId",foreignField:"_id",as:"result"}},
      {
          $match: {
              toConfirm: false,
                employeeId:new objId(employee)
          }
      }]).toArray();
  
      res.status(200).json({ employees });
    } catch (error) {
      console.error("Error fetching paystubs:", error);
      res.status(500).json({ message: "Error fetching paystubs" });
    }
  };

  exports.generatePDF = async(req, res, next) => {
    const stubId = req.params.stubId;
    const employeeId = req.params.employeeId;

    let unique = Math.random().toFixed(5) * 100000;

    const employees = await db().collection("pay_stubs").aggregate([{$lookup:{from:"employees",localField:"employeeId",foreignField:"_id",as:"result"}},
    {
        $match: {
            toConfirm: false,
            _id: new objId(stubId),
            employeeId:new objId(employeeId)
        }
    }]).toArray();
    const invoiceName = "invoice-" + ++unique + "_user-" + employeeId + ".pdf";
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
  
      template(pdfDoc, employees);
      pdfDoc.end();
  };

  exports.editEmployee = async (req, res, next) => {
    const { employeeId } = req.params;
    const { name, email, password } = req.body;
  
    try {
      const encrypted=await bcrypt.hash(password,12)
      const employee = await db().collection("employees").updateOne({ _id: new objId(employeeId) },{$set:{name,email,password:encrypted}});
  
      if (employee.modifiedCount === 0) {
        return res.status(500).json({ message: "Failed to update client" });
      }
      res.status(200).json({ message: "Client updated successfully" });
  
    } catch (error) {
      console.error("Error editing client:", error);
      res.status(500).json({ message: "Error editing client" });
    }
  };
  exports.deleteEmployee = async (req, res, next) => {
    const { employeeId } = req.params;
  
    try {
      const result = await db().collection("employees").deleteOne({ _id: new objId(employeeId) });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Client not found" });
      }
  
      res.status(200).json({ message: "Client deleted successfully" });
    } catch (error) {
      console.error("Error deleting client:", error);
      res.status(500).json({ message: "Error deleting client" });
    }
  };

  exports.getSalary = async (req, res, next) => {
    const employeeId = req.params.employeeId;
  
    try {
      const employee = await db().collection("employees").findOne({ _id: new objId(employeeId) });
  
      if (employee) {
        const salary = employee.salary;
        return res.status(200).json({ salary });
      } else {
        return res.status(404).json({ message: "Employee not found" });
      }
    } catch (error) {
      console.error("Error fetching employee salary:", error);
      return res.status(500).json({ message: "Error fetching employee salary" });
    }
  };
  