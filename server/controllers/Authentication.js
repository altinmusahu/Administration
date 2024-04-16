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


exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await db().collection("clients").findOne({ email });
    const employee = await db().collection("employees").findOne({ email });
    const admin = await db().collection("admins").findOne({ email });
    const superadmin = await db().collection("super-admin").findOne({ email });

    if (user) {
      const isAuth = await bcrypt.compare(password, user.password);

      if (isAuth) {
        return res.status(200).json({
          message: "Logged In",
          isLoggedIn: true,
          role: user.role,
          id: user._id,
        });
      }

      return res.status(401).json({
        status: "Unauthorized",
        message: "Incorrect password",
        isLoggedIn: false,
      });
    }else if(employee){
        
        const isAuth = await bcrypt.compare(password, employee.password);

      if (isAuth) {
        return res.status(200).json({
          message: "Logged In",
          isLoggedIn: true,
          role: employee.role,
          id: employee._id,
        });
      }

      return res.status(401).json({
        status: "Unauthorized",
        message: "Incorrect password",
        isLoggedIn: false,
      });
    } else if(admin) {
        const isAuth = await bcrypt.compare(password, admin.password);

        if(isAuth) {
            return res.status(200).json({
                message: "Logged In",
                isLoggedIn: true,
                role: admin.role,
                id: admin.id
            })
        }
        return res.status(401).json({
            status: "Unauthorized",
            message: "Incorrect password",
            isLoggedIn: false,
        });
    } else if(superadmin){
        const isAuth = superadmin.password === 'admin123';

        if(isAuth) {
            return res.status(200).json({
                message: "Logged In",
                isLoggedIn: true,
                role: superadmin.role,
                id: superadmin._id
            })
        }
        return res.status(401).json({
            status: "Unauthorized",
            message: "Incorrect password",
            isLoggedIn: false,
        });
    }
  };