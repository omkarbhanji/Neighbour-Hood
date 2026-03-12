import React from "react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {

  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">

      
      <h1 className="text-xl font-semibold text-gray-800">
        CivicTrack
      </h1>

     
      <div className="flex items-center gap-4">

        <span className="text-gray-700">
          Hi, {user?.name}
        </span>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md"
        >
          Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar;