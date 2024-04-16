import { useEffect, useState } from "react";
import axios from 'axios'
export default function AddPayments() {

    const [clients, setClients] = useState([]);
    const [client,setClient]=useState("");
    const [amount,setAmount]=useState(0)

    useEffect( () => {
      axios.get(`http://localhost:4000/clients/fetchClients`)
        .then((response) => {
          setClients(response.data.clients);
          console.log(client);
        })
        .catch((error) => {
          console.error("Error fetching payments:", error);
        });
    }, []);

    const addPaymentHandler=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:4000/admin/insertPayments",{clientId:client,amount}).then(result=>{
            if(result.status===201){
                console.log('Inserted');
            }else{
                return;
            }
        })
    }
    console.log(clients);


    return(
            <div className="p-12 flex justify-center items-center h-screen">
                <form onSubmit={addPaymentHandler} className="border border-gray-300 p-6 rounded-lg shadow-lg w-1/3">
                    <select value={client} onChange={(e)=>setClient(e.target.value)} className=" block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option disabled>Choose a client:</option>
                        {clients.map((cl) => (
                            <option key={cl._id} value={cl._id}>{cl.name}</option>
                        ))}
                    </select>
                    <input type="number" min={1} value={amount} onChange={(e)=>setAmount(e.target.value)} className="mt-4 block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Insert</button>
                </form>
            </div>

    );
}