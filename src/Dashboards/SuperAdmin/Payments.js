import { useEffect, useState } from "react";
import SideBar from "./Sidebar";
import axios from "axios";

export default function Payments(){

    const [payments, setPayments] = useState([]);


    const clientId=localStorage.getItem("id");
    const payHandler = () => {
        axios
          .post(`http://localhost:4000/clients/payment/${clientId}`)
          .then((result) => {
            localStorage.setItem("sessionId", result.data.sessionId);
            window.location.href = result.data.url;
          });
      };

      useEffect( () => {
        axios.get(`http://localhost:4000/clients/fetchPayment/${clientId}`)
          .then((response) => {
            setPayments(response.data.payments);
          })
          .catch((error) => {
            console.error("Error fetching payments:", error);
          });
      }, [clientId]);

      const generatePdfHandler = () => {
        window.location.href=`http://localhost:4000/clients/getPayments/${clientId}`
      };

    
    return(
<div className="lg:flex lg:my-10"> 
    <SideBar />
    <div className="lg:relative lg-w-auto ">
        <div className="hidden sm:block absolute z-10 w-0.5 h-full bg-gray-500 rounded-full border-b"></div>

        <div className='w-full mx-20'>
            <div className="text-black text-2xl font-normal leading-normal">Payments</div>
            <div className="justify-start items-start gap-8 inline-flex mt-12">
                <div className="bg-blue-700 rounded-xl justify-center items-center flex p-2">
                    <div className="px-4 justify-center items-center flex">
                        <div className="px-2 justify-center items-center gap-2.5 flex">
                            <div className="text-white text-base font-bold leading-normal">All Payments</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-stone-50 rounded-lg mt-12">
                    <thead>
                        <tr>
                            <th className="text-left px-4 py-2">Id</th>
                            <th className="text-left px-4 py-2">Amount</th>
                            <th className="text-left px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {payments.map(payment => 
                        {
                            return(
                        <tr>
                            <td className="border-t px-4 py-2">{payment.paymentId??payment._id}</td>
                            <td className="border-t px-4 py-2">{payment.amount}</td>
                            <td className="border-t px-4 py-2">{payment.status}</td>
                        </tr>
                        )}
                    )}
                    </tbody>
                </table>
            </div>
            {/* Button */}
            <div className="mt-4 text-center">
                <button onClick={payHandler} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Add Payment
                </button>
                <button onClick={generatePdfHandler} className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded ml-4">
                    Generate PDF
                </button>
            </div>
        </div>
    </div>
</div>

    );
}