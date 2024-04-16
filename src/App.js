import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Authentication/Register";
import Login from "./Authentication/Login";
import Sidebar from "./Dashboards/Clients/Sidebar";
import Payments from "./Dashboards/Clients/Payments";
import AddEmployees from "./Dashboards/Admins/AddEmployees";
import AddPayments from "./Dashboards/Admins/AddPayments";
import AddAdmin from "./Dashboards/SuperAdmin/AddAdmin";
import PayStubRecord from "./Dashboards/SuperAdmin/PayStub";
import AddPayStub from "./Dashboards/Admins/AddPayStub";
import ClientsFetch from "./Dashboards/SuperAdmin/Clients";
import EmployeesFetch from "./Dashboards/Admins/Employees";
import AdminsFetch from "./Dashboards/SuperAdmin/Admins";
import EmployeesFetchSuperAdmin from "./Dashboards/SuperAdmin/Employees";
import PayStubRecordEmployee from "./Dashboards/Employees/PayStub";
import ClientsFetchAdmin from "./Dashboards/Admins/Clients";
import GenerateReceiptForm from "./Dashboards/Admins/GenerateRecipt";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/clients/payment" element={< Payments/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/admins/createEmployees" element={<AddEmployees />} />
        <Route path="/admin/payments" element={<AddPayments />}/>
        <Route path="/superadmin/addadmin" element={<AddAdmin />} />
        <Route path="/superadmin/paystub" element={<PayStubRecord />}/>
        <Route path="/employee/paystub" element={<PayStubRecordEmployee />}/>

        <Route path="/admins/paystub/:id" element={<AddPayStub />} />
        <Route path="/superadmin/clients" element={<ClientsFetch />} />
        <Route path="/superadmin/employees" element={<EmployeesFetchSuperAdmin />} />
        <Route path="/superadmin/admins" element={<AdminsFetch />} />
        <Route path="/admins/employees" element={<EmployeesFetch />} />
        <Route path="/admins/clients" element={<ClientsFetchAdmin />} />
        <Route path="/admins/generaterecipt/:id" element={<GenerateReceiptForm />} />






      </Routes>
    </Router>
  );
}

export default App;
