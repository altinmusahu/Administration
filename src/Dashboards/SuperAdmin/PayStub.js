import { useEffect, useState } from "react";
import SideBar from "../SuperAdmin/Sidebar";
import axios from "axios";
import Exporter from "./Exporter";

export default function PayStubRecord() {
    const [paystubs, setPayStubs] = useState([]);

    useEffect(() => {
        // Fetch payments data from server
        axios.get("http://localhost:4000/superadmin/fetchPayStubs")
            .then(response => {
                setPayStubs(response.data.employees);
            })
            .catch(error => {
                console.error("Error fetching payments:", error);
            });
    }, []);

    const approvePayStub=async(id)=>{
        const request=await axios.put(`http://localhost:4000/superadmin/approve/${id}`);
        if(request.status===200){
            window.alert("Payment approved")
        }
        return;
    }

    return (
        <div className="lg:flex lg:my-10"> 
            <SideBar />
            <div className="lg:relative lg-w-auto ">
                <div className="hidden sm:block absolute z-10 w-0.5 h-full bg-gray-500 rounded-full border-b"></div>

                <div className='w-full mx-16'>
                    <div className="text-black text-2xl font-normal leading-normal">Pay Stub Record</div>
                    <div className="overflow-x-auto mt-6">
                        <table className="min-w-full bg-stone-50 rounded-lg">
                            <thead>
                                <tr>
                                    <th className="text-left  py-2">Employee Name</th>
                                    <th className="text-left  py-2">Employee Salary</th>
                                    <th className="text-left  py-2">Days Off - Date</th>
                                    <th className="text-left  py-2">Deduction per day</th>
                                    <th className="text-left  py-2">Total detuctions</th>
                                    <th className="text-left  py-2">Expenses</th>
                                    <th className="text-left  py-2">Total Amount</th>
                                    <th className="text-left  py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paystubs.map(payst => (
                                    <tr key={payst._id} className="border-b border-gray-200">
                                        <td className="text-left  py-2">{payst.result[0].name}</td>
                                        <td className="text-left  py-2">{payst.salary}</td>
                                        <td className="text-left  py-2">{payst.daysDifference} - {payst.startdate} - {payst.enddate}</td>
                                        <td className="text-left  py-2">{payst.averageSalary?.toFixed(2)}</td>
                                        <td className="text-left  py-2">{payst.DaysOffAmount?.toFixed(2)}</td>
                                        <td className="text-left  py-2">{payst.expenses}</td>
                                        <td className="text-left  py-2">{payst.totalAmount?.toFixed(2)}</td>
                              
                                        <td className="text-left  py-2"><button className="bg-blue-600 rounded-md py-1 px-2 text-white" onClick={()=>approvePayStub(payst._id)}>Approve</button></td>
                                    </tr> 
                                ))}
                            </tbody>
                        </table>
                    </div>
                                <Exporter jsonData={paystubs} fileName={Math.random().toFixed(6)+" - info"}/>
                </div>
            </div>
        </div>
    );
}
