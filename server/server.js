const express = require("express");
const app = express();

const clientRoutes=require("./routes/Client");
const adminRoutes = require("./routes/Admin");
const superadminRouters = require("./routes/SuperAdmin");
const employeeRoutes = require("./routes/Employee");

const cors=require("cors");
const bodyParser=require("body-parser")

const mongoconnect =require("./database").mongoConnect

app.use(express.json());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin',adminRoutes);
app.use('/superadmin',superadminRouters);
app.use('/employee', employeeRoutes);
app.use(clientRoutes)

mongoconnect(() => {
    app.listen(4000,()=>console.log('listening'))
})

