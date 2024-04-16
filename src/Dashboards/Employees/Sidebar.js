import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logout from "../../components/Logout";

export default function SideBar() {


  return (
    <>
      <div className="sm:flex flex-col gap-4 py-6 mx-4">

        <div className="px-14 py-2 rounded-lg justify-center items-center gap-4 inline-flex">

          <NavLink to='#' className="grow shrink basis-0 text-black text-lg font-bold">
            Employee Profile
          </NavLink>
        </div>


        <div className="flex items-center gap-4 px-14 py-2 rounded-lg">
          <NavLink to='/employee/paystub' className="text-black text-base font-medium">
            Pay Stub records 
          </NavLink>
        </div>

         
        {localStorage.getItem("role")&&<Logout/>}

      </div>

    
    </>
  );
}
