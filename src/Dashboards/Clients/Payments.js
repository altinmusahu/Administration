import React, { useEffect, useState } from "react";
import SideBar from "./Sidebar";
import axios from "axios";

export default function Payments() {
    const [recipts, setRecipts] = useState([]);

    const id = localStorage.getItem("id");

    useEffect(() => {
        axios.get(`http://localhost:4000/clients/fetchRecipts/${id}`)
            .then((response) => {
                setRecipts(response.data.recipts);
            })
            .catch((error) => {
                console.error("Error fetching clients:", error);
            });
    }, []);

    const generatePdfHandler = (receiptId) => {
        window.location.href=`http://localhost:4000/getPDFClient/${id}/${receiptId}`;
    };


    return (
        <div className="lg:flex lg:my-10">
            <SideBar />
            <div className="lg:relative lg-w-auto ">
                <div className="hidden sm:block absolute z-10 w-0.5 h-full bg-gray-500 rounded-full border-b"></div>
                <div className='w-full mx-20'>
                    <div className="text-black text-2xl font-normal leading-normal">Receipts</div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-stone-50 rounded-lg mt-12">
                            <thead>
                                <tr>
                                    <th className="text-left px-4 py-2">Id</th>
                                    <th className="text-left px-4 py-2">Amount</th>
                                    <th className="text-left px-4 py-2">Date</th>
                                    <th className="text-left px-4 py-2">Amount</th>
                                    <th className="text-left px-4 py-2">Actions</th>

                                </tr>
                            </thead>
                            <tbody>
                                {recipts.map(recipt =>
                                    <tr key={recipt._id}>
                                        <td className="border-t px-4 py-2">{recipt._id}</td>
                                        <td className="border-t px-4 py-2">{recipt.paymentAmount}</td>
                                        <td className="border-t px-4 py-2">{recipt.paymentDate}</td>
                                        <td className="border-t px-4 py-2">{recipt.memo}</td>
                                        <td>
                                            <button onClick={() => generatePdfHandler(recipt._id)} className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded ml-4">
                                                Generate PDF
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* Button */}
                    <div className="mt-4 text-center">

                    </div>
                </div>
            </div>
        </div>
    );
}
