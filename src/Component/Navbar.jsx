import React, { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import auth from "../Firebase/firebase.init";
import Swal from "sweetalert2";

const Navbar = () => {

  const {user, signOutUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      await signOutUser();
      Swal.fire("Success", "Logged out Successfully", "success");
      navigate("/");
    }catch(error){
      Swal.fire("Error", error.message, "error");
    }
  }
  return (
    <div className="bg-[#cccccc] fixed top-0 w-full z-50 shadow-lg">
       <div className="navbar bg-base-200">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Task Me</a>
      </div>
      <div className="flex-none">
        {user ? (
          <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="user"
                src={user.photoURL}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                {user.displayName}
              </a>
              </li>
            <li>
              <a className="justify-between">
                Profile
              </a>
            </li>
            <li>
              <button onClick={handleLogout} className="text-red-500">Logout</button>
            </li>
          </ul>
        </div>
        ):(
          <Link to="/"></Link>
        
        )}
        
      </div>
    </div>
    </div>
   
  );
};

export default Navbar;
