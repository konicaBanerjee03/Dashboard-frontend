import React from "react";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { token, setToken } = useAuth();
  const onLogout = () => {
    setToken(null);
  };
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">WebReInvent</div>
        <div>
          <a
            href="/"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Dashboard
          </a>
          <a
            href="/orders"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Orders
          </a>
          <a
            href="/clicks"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Clicks
          </a>
          {token ? <button
            onClick={onLogout}
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Logout
          </button> : <>
          </>}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
