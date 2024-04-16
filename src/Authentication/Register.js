import { useState } from "react";
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

export default function Register() {

    const nav = useNavigate();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/register', {name, email, password})
        .then(result => console.log(result))
        .catch(err => console.log(err))

        nav('/');



    }

    return(

        <section className='relative'>
        <div className='flex justify-center items-center min-h-screen '>
            <div className='w-1/3 bg-white rounded-lg shadow p-6 space-y-4'>
                <h1 className="text-xl leading-tight tracking-wide text-black mb-12">
                    Register as a Client
                </h1>
                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black tracking-wider">Client name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="bg-gray-50 border  sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-400 dark:placeholder-gray-800 dark:text-gray-800"
                            placeholder="Altin Musahu"
                            required=""
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black tracking-wider">Client email</label>
                        <input 
                            type="email"
                            name="email"
                            id="email"
                            className="bg-gray-50 border  sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-400 dark:placeholder-gray-800 dark:text-gray-800"
                            placeholder="example@email.com"
                            required=""
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black tracking-wider">Client password</label>
                        <input 
                            type="password"
                            name="password"
                            id="password" 
                            className="bg-gray-50 border  sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-400 dark:placeholder-gray-800 dark:text-gray-800" 
                            placeholder="••••••••" 
                            required="" 
                            onChange={(e) => setPassword(e.target.value)}

                        />
                    </div>
   
                    <button type="submit" className="w-full text-white tracking-wider focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-700">Register</button>

                </form>
            </div>
        </div>

    </section>
        
    );
}