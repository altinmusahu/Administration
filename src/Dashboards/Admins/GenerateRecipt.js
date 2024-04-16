import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useParams, useNavigate } from 'react-router-dom';

export default function GenerateReceiptForm({ clientId }) {

    const params = useParams();
    const nav = useNavigate();


    const [paymentAmount, setPaymentAmount] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const [memo, setMemo] = useState('');

    const [name, setName] = useState('');




    useEffect(() => {
        const id = params.id;
        const fetchClientDetails = async () => {
            try{
                const response = await axios.get(`http://localhost:4000/one-clients/${params.id}`);
                setName(response.data.name);
                console.log(name);
            } catch (error) {
                console.log('error');
            }
        };
        fetchClientDetails();
    }, [params.id])

    const handleSubmit = async (e) => {
        nav('/admins/clients')

        e.preventDefault();
        const clientId = params.id;
        try {
            const response = await axios.post('http://localhost:4000/admin/generate', {
                paymentAmount,
                paymentDate,
                memo,
                clientId,
            });
            if(response.status === 201) {
                console.log("Added");
                nav('/admins/clients')
            } else {
                console.log("not added");
            }
        } catch (error) {
            console.error('Error generating receipt:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto px-4 py-8 bg-white shadow-lg rounded-lg mt-20">
            <h2 className="text-2xl font-semibold mb-4">Generate Receipt</h2>
            <form onSubmit={handleSubmit}>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Client Name</label>
                    <input
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        value={name}
                        disabled
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="paymentAmount" className="block text-gray-700 font-bold mb-2">Payment Amount</label>
                    <input type="number" id="paymentAmount" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500" />
                </div>

                <div className="mb-4">
                    <label htmlFor="paymentDate" className="block text-gray-700 font-bold mb-2">Payment Date</label>
                    <input type="date" id="paymentDate" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500" />
                </div>

                <div className="mb-4">
                    <label htmlFor="memo" className="block text-gray-700 font-bold mb-2">Memo</label>
                    <textarea id="memo" value={memo} onChange={(e) => setMemo(e.target.value)} className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500" rows="4"></textarea>
                </div>

                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Generate Receipt</button>
            </form>
        </div>
    );
}
