import { useEffect, useState } from "react";
import SideBar from "../Employees/Sidebar";
import axios from "axios";

export default function PayStubRecordEmployee() {
    const [paystubs, setPayStubs] = useState([]);

    const id = localStorage.getItem("id");
    const payStubId = localStorage.getItem("payStubId");

    useEffect(() => {
        // Fetch payments data from server
        axios.get(`http://localhost:4000/employee/myemployeepaystub/${id}`)
            .then(response => {
                setPayStubs(response.data.employees);
            })
            .catch(error => {
                console.error("Error fetching payments:", error);
            });
    }, []);

    const generatePdfHandler = (payStubId) => {
        window.location.href=`http://localhost:4000/employee/getPDF/${id}/${payStubId}`;
    };
    



    return (
        <div className="lg:flex lg:my-10"> 
            <SideBar />
            <div className="lg:relative lg-w-auto ">
                <div className="hidden sm:block absolute z-10 w-0.5 h-full bg-gray-500 rounded-full border-b"></div>

                <div className='w-full mx-10'>
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
                                    <th className="text-left  py-2">Actions</th>                                    
                                 

                                </tr>
                            </thead>
                            <tbody>
                                {paystubs.map(payst => (
                                    <tr key={payst._id} className="border-b border-gray-200">
                                        <td className="text-left  py-2">{payst.result[0]?.name || '-'}</td>
                                        <td className="text-left  py-2">{payst.salary || '-'}</td>
                                        <td className="text-left  py-2">{payst.daysDifference ? `${payst.daysDifference} - ${payst.startdate} - ${payst.enddate}` : '-'}</td>
                                        <td className="text-left  py-2">{payst.averageSalary ? payst.averageSalary.toFixed(2) : '-'}</td>
                                        <td className="text-left  py-2">{payst.DaysOffAmount ? payst.DaysOffAmount.toFixed(2) : '-'}</td>
                                        <td className="text-left  py-2">{payst.expenses || '-'}</td>
                                        <td className="text-left  py-2">{payst.totalAmount ? payst.totalAmount.toFixed(2) : '-'}</td>
                                        <td>
                                            <button onClick={() => generatePdfHandler(payst._id)}  className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded">
                                                Generate PDF
                                            </button>
                                        </td>
                                    </tr> 
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
