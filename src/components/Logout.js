import {useNavigate} from 'react-router-dom' 
export default function Logout(){
    const nav=useNavigate()
    const logout=()=>{
        localStorage.clear();
        nav('/')
    }
    return (
        <button className='bg-red-700 rounded-md w-24 mx-12 py-1 text-white' onClick={logout}>
            Logout
        </button>
    )
}