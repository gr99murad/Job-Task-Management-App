import React, { useContext, useState } from "react";

import AuthContext from "../context/AuthContext/AuthContext";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../Firebase/firebase.init";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";

const Login = () => {
    
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);

    

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // store user details in db
      await fetch('https://task-management-app-server-mu.vercel.app/users', {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        }),
      })
      Swal.fire("success", "Google Login successful!", "success");
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
      Swal.fire("error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      
      <div className="hero bg-gray-300 py-24 min-h-screen">
        <div className="hero-content flex-col ">
          <h1 className="text-3xl font-bold ">Task Management App</h1>
          
          <div className="card bg-[#e2d8d8] w-full max-w-sm shrink-0 shadow-2xl p-4">
            <h1 className=" ml-8 mt-4 text-5xl font-bold">Login Now!</h1>
            

            <div className="text-center mt-4">
              <button
                onClick={handleGoogleSignIn}
                className="btn bg-[#bea7a7] text-text"
                disabled={loading}
              >
                {loading ? (
                  "Loading..."
                ) : (
                  <>
                    <FaGoogle className="text-xl"></FaGoogle>
                    <span>Login with Google</span>
                  </>
                )}
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};


export default Login;