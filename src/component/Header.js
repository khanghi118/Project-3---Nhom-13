import React, { useState } from 'react';
import logo from "../assest/logo.png";
import { Link } from 'react-router-dom';
import { BiUser } from "react-icons/bi";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../redux/userSlice';
import { toast } from 'react-hot-toast';

const Header = () => {
  const userData = useSelector((state) => state.user);
  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch()
  const handleShowMenu = () => {
    setShowMenu(prev => !prev);
  };
  const handleMenuClick = () => {
    setShowMenu(false);
  };
  const handleLogout = () => {
    dispatch(logoutRedux())
    toast.success("Logout Successful")
  }

  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      {/* desktop */}
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-12">
            <img src={logo} className="h-full" alt="Logo" />
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-7">
          <nav className="flex gap-4 md:gap-6 text-base md:text-lg">
            <Link to={""}>Home</Link>
            <Link to={"menu"}>Menu</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
            <div className="relative flex items-center gap-1">
              <BsCartFill className="text-slate-600" />
              <div className="absolute -top-2 -right-2 text-white bg-red-500 h-5 w-5 rounded-full m-0 p-0 text-sm text-center">
                0
              </div>
            </div>
            <div className="flex items-center gap-1 text-slate-600">
              <div className="text-3xl cursor-pointer w-10 h-10 rounded-full" onClick={handleShowMenu}>
                {userData.image ? (
                  <img src={userData.image} className="h-full w-full rounded-full drop-shadow-md" alt="User" />
                ) : (
                  <BiUser />
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
      {/* mobile */}
      {showMenu && (
        <div className="absolute right-0 mt-2 bg-white py-2 px-4 shadow drop-shadow-md flex flex-col">
          <Link to={"newproduct"} className="whitespace-nowrap cursor-pointer mb-2" onClick={handleMenuClick}> New Product</Link>
            {
                userData.image ? <p className="cursor-pointer"onClick={handleLogout}> Logout</p> : <Link to={"login"} className="whitespace-nowrap cursor-pointer" onClick={handleMenuClick}> Login</Link>
            }
          
        </div>
      )}
    </header>
  );
};

export default Header;
