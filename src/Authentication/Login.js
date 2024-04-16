import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Login() {

    const navigate=useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/login',{email,password})
        .then(result => {

            console.log(result);

            if(result.data.isLoggedIn&&result.data.role===0){

                localStorage.setItem("role",result.data.role);
                localStorage.setItem("id",result.data.id);
                navigate('/clients/payment');

            }else if(result.data.isLoggedIn&&result.data.role===1){

                localStorage.setItem("role",result.data.role);
                localStorage.setItem("id",result.data.id);
                navigate('/employee/paystub');

            }else if(result.data.isLoggedIn&&result.data.role===2){
                localStorage.setItem("role",result.data.role);
                localStorage.setItem("id", result.data.id);
                navigate('/admins/employees');
            } else if(result.data.isLoggedIn&&result.data.role===3){
                localStorage.setItem("role", result.data.role);
                localStorage.setItem("id", result.data.id);
                navigate('superadmin/clients');
            }

        })
        .catch(err => console.log(err))
    }



    return(

        <section className='relative'>
        <div className='flex justify-center items-center min-h-screen '>
            <div className='w-1/3 bg-white rounded-lg shadow p-6 space-y-4'>
                <h1 className="text-xl leading-tight tracking-wide text-black mb-12">
                    Sign in to your account
                </h1>
                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black tracking-wider">Your email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border  sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-400 dark:placeholder-gray-800 dark:text-gray-800" placeholder="example@email.com" required="" value={email} onChange={(e) =>setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black tracking-wider">Your password</label>
                        <input type="password" name="password" id="password" className="bg-gray-50 border  sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-400 dark:placeholder-gray-800 dark:text-gray-800" placeholder="••••••••" required="" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="w-full text-white tracking-wider focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-700">Sign in</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                    </p>

                </form>
            </div>
        </div>

    </section>
        
    );
}