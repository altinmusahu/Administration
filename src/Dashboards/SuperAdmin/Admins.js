import { useEffect, useState } from "react";
import SideBar from "./Sidebar";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function AdminsFetch(){

    const [admins, setAdmins] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [editedClient, setEditedClient] = useState({
        name: "",
        email: "",password:""
    });
    const[admin,setAdmin]=useState();

    useEffect(() => {
        axios.get(`http://localhost:4000/admin/fetchAdmins`)
            .then((response) => {
                setAdmins(response.data.admins);
            })
            .catch((error) => {
                console.error("Error fetching clients:", error);
            });
    }, []);

    const handleEdit = async(id) => {
        const request=await axios.get(`http://localhost:4000/admin/one-admins/${id}`)
        setAdmin(request.data)
        setEditedClient(request.data)
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedClient(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:4000/admin/editAdmin/${admin._id}`, editedClient);
            console.log("Client updated:", response.data);
            // Reload clients after edit
            const clientsResponse = await axios.get(`http://localhost:4000/admin/fetchAdmins`);
            setAdmins(clientsResponse.data.admins);
            setIsUpdating(false);
        } catch (error) {
            console.error("Error updating client:", error);
        }
    };

    const handleDelete = async (adminId) => {
        try {
            await axios.delete(`http://localhost:4000/deleteadmin/${adminId}`);
            
            setAdmins(admins.filter(admin => admin._id !== adminId));
            console.log("Client deleted successfully");
        } catch (error) {
            console.error("Error deleting client:", error);
        }
    };




    return (
        <div className="lg:flex lg:my-10"> 
            <SideBar />
            <div className="lg:relative lg-w-auto ">
                <div className="hidden sm:block absolute z-10 w-0.5 h-full bg-gray-500 rounded-full border-b"></div>

                <div className='w-full mx-20'>
                    <div className="text-black text-2xl font-normal leading-normal">Admins</div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-stone-50 rounded-lg mt-12">
                            <thead>
                                <tr>
                                    <th className="text-left px-4 py-2">Id</th>
                                    <th className="text-left px-4 py-2">Name</th>
                                    <th className="text-left px-4 py-2">Email</th>
                                    <th className="text-left px-4 py-2">Role</th>
                                    <th className="text-left px-4 py-2">Actions</th> {/* New column for actions */}
                                </tr>
                            </thead>
                            <tbody>
                                {admins.map(admin  => (
                                    <tr key={admin._id}>
                                        <td className="border-t px-4 py-2">{admin._id}</td>
                                        <td className="border-t px-4 py-2">{admin.name}</td>
                                        <td className="border-t px-4 py-2">{admin.email}</td>
                                        <td className="border-t px-4 py-2">Admin</td>
                                        <td className="border-t px-4 py-2">
                                            <button onClick={() => {setIsUpdating(true);handleEdit(admin._id)}} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2">Edit</button>
                                            <button onClick={() => handleDelete(admin._id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Button */}
                    <div className="mt-4 text-center">
                        <NavLink to='/superadmin/addadmin' className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                            Add Admin
                        </NavLink>
          
                    </div>
                </div>
            </div>
            {/* Edit Client Modal */}
            {isUpdating && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            {/* Add your edit form here */}
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Admin</h3>
                                        <div className="mt-2">
                                            {/* Your edit form components go here */}
                                            <form onSubmit={handleEditSubmit}>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                                <input type="text" name="name" id="name" className="mt-1 p-2 border border-gray-300 rounded-md" defaultValue={editedClient.name} onChange={handleInputChange} />
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-4">Email</label>
                                                <input type="email" name="email" id="email" className="mt-1 p-2 border border-gray-300 rounded-md" value={editedClient.email} onChange={handleInputChange}/>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-4">Password</label>
                                                <input type="password" name="password" id="password" className="mt-1 p-2 border border-gray-300 rounded-md" value={editedClient.password} onChange={handleInputChange}/>
                                                {/* Add more fields as needed */}
                                                <div className="mt-4">
                                                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Save</button>
                                                    <button type="button" onClick={() => setIsUpdating(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded ml-2">Cancel</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
