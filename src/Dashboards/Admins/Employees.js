import { useEffect, useState } from "react";
import SideBar from "./Sidebar";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";

export default function EmployeesFetch(){
    const [editingEmployee, setEditingEmployee] = useState(null);

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:4000/employee/fetchEmployees`)
            .then((response) => {
                setEmployees(response.data.employees);
            })
            .catch((error) => {
                console.error("Error fetching clients:", error);
            });
    }, []);

    const handleEdit = (employee) => {
        setEditingEmployee(employee)
    };

    const handleDelete = (employeeId) => {
        // Handle delete action here
        console.log("Delete employee:", employeeId);
    };

    const handleOne = async(id) => {
        const request=await axios.get(`http://localhost:4000/employee/one-employee/${id}`)
        setEmployees(request.data)
    };

    return (
        <div className="lg:flex lg:my-10"> 
            <SideBar />
            <div className="lg:relative lg-w-auto ">
                <div className="hidden sm:block absolute z-10 w-0.5 h-full bg-gray-500 rounded-full border-b"></div>

                <div className='w-full mx-20'>
                    <div className="text-black text-2xl font-normal leading-normal">Employees</div>
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
                                {employees.map(employee  => (
                                    <tr key={employee._id}>
                                        <td className="border-t px-4 py-2">{employee._id}</td>
                                        <td className="border-t px-4 py-2">{employee.name}</td>
                                        <td className="border-t px-4 py-2">{employee.email}</td>
                                        <td className="border-t px-4 py-2">Employee</td>
                                        <td className="border-t px-4 py-2">
                                            <button onClick={() => handleEdit(employee)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2">Edit</button>
                                            <button onClick={() => handleDelete(employee._id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">Delete</button>
                                            <button className="bg-green-700 hover:bg-green-800 text-white font-bold ml-6 py-1 px-5 rounded"><Link to={`/admins/paystub/${employee._id}`}>Add Pay Stub</Link></button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Button */}
                    <div className="mt-4 text-center">
                        <NavLink to='/admins/createEmployees' className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                            Add Employee
                        </NavLink>

                    </div>
                </div>
            </div>
             {/* Edit Client Modal */}
             {editingEmployee && (
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
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Employee</h3>
                                        <div className="mt-2">
                                            {/* Your edit form components go here */}
                                            <form>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                                <input type="text" name="name" id="name" className="mt-1 p-2 border border-gray-300 rounded-md" value={editingEmployee.name} />
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-4">Email</label>
                                                <input type="email" name="email" id="email" className="mt-1 p-2 border border-gray-300 rounded-md" value={editingEmployee.email} />
                                                {/* Add more fields as needed */}
                                                <div className="mt-4">
                                                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Save</button>
                                                    <button type="button" onClick={() => setEditingEmployee(null)} className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded ml-2">Cancel</button>
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
