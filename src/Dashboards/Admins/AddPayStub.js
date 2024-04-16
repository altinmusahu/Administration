import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useParams, useNavigate } from 'react-router-dom';

export default function AddPayStub() {
    const params = useParams();
    const navigate = useNavigate();

    const [startdate, setStartDate] = useState('');
    const [enddate, setEndDate] = useState('');
    const [expenses, setExpenses] = useState('');
    const [salary, setSalary] = useState('');
    const [name, setName] = useState('');

    const [validationError, setValidationError] = useState('');


    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/employee/one-employee/${params.id}`);
                setSalary(response.data.salary);
                setName(response.data.name);
            } catch (error) {
                console.error('Error fetching employee details:', error);
            }
        };
        fetchEmployeeDetails();
    }, [params.id]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const employeeId = params.id;

        if(new Date(startdate) > new Date(enddate) ) {
            setValidationError('Start date cannot be greater than end date');
            alert('Start date cannot be greater than end date');
            return;
        }

        const weekendDays = [0,6];
        const startDayOfWeek = new Date(startdate).getDay();
        const endDayOfWeek = new Date(enddate).getDay();
        if(weekendDays.includes(startDayOfWeek) || weekendDays.includes(endDayOfWeek)) {
            setValidationError('Weekend days (saturday and sunday) are not allowed to add');
            alert('Weekend days (saturday and sunday) are not allowed to add');
            return;
        }



        try {
            const response = await axios.post("http://localhost:4000/admin/expenses", {
                salary,
                daysDifference,
                averageSalary,
                DaysOffAmount,
                expenses,
                totalAmount,
                startdate,
                enddate,
                employeeId
            });
            if (response.status === 201) {
                console.log('Added');
                navigate('/admins/employees');
            } else {
                console.log("not added");
            }
        } catch (error) {
            console.error('Error adding pay stub:', error);
        }
    };

    // Calculations
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = days.getDate();
    const weekendDays = [0, 6];
    let weekend = 0;
    for (let day = 1; day <= daysInMonth; day++) {
        const currentDay = new Date(year, month, day);
        const dayOfWeek = currentDay.getDay();
        if (weekendDays.includes(dayOfWeek)) {
            weekend++;
        }
    }
    const daysOn = daysInMonth - weekend;
    const averageSalary = salary / daysOn;
    const differenceInMs = new Date(enddate) - new Date(startdate);
    const daysDifference = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
    const DaysOffAmount = daysDifference * averageSalary;
    const totalAmount = salary - DaysOffAmount - expenses;

    return (
        <div className="p-12 flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="border border-gray-300 p-6 rounded-lg shadow-lg w-2/5">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Employee Name</label>
                    <input
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        value={name}
                        disabled
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Salary Amount</label>
                    <input
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        value={salary}
                        disabled
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startdate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 custom-datepicker"
                        max={`${year}-${(month + 1).toString().padStart(2, '0')}-${daysInMonth.toString().padStart(2, '0')}`}
                        min={`${year}-${(month + 1).toString().padStart(2, '0')}-01`}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                    <input
                        type="date"
                        id="endDate"
                        value={enddate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 custom-datepicker"
                        max={`${year}-${(month + 1).toString().padStart(2, '0')}-${daysInMonth.toString().padStart(2, '0')}`}
                        min={`${year}-${(month + 1).toString().padStart(2, '0')}-01`}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Expenses</label>
                    <input
                        type="number"
                        min={1}
                        step={0.01}
                        value={expenses}
                        onChange={(e) => setExpenses(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white mb-4 py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                >
                    Register Record
                </button>
                <NavLink to='/admins/employees'
                    className="w-full bg-red-700 text-white py-2 px-6 rounded-md "
                >
                    Back
                </NavLink>
            </form>
        </div>
    );
}
