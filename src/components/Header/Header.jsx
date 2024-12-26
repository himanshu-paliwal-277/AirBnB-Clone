import search_icon from "../../assets/icons/search-icon.svg";
import world_icon from "../../assets/icons/world-icon.svg";
import menu_icon from "../../assets/icons/menu-icon.svg";
import user_icon from "../../assets/icons/user-icon-2.svg";
import { useLocation } from "react-router-dom";
import airbnb_logo_1 from "../../assets/logo/air-bnb-logo-3.png";
import airbnb_logo_2 from "../../assets/logo/air-bnb-logo-2.png";
import Navbar from "../Nabar/Navbar";
import { useState } from "react";
import Modal from "react-modal";
import SignUpModal from "../SignUpModal/SignUpModal";
import LoginModal from "../LoginModal/LoginModal";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../firebase/firebase.js";

function Header() {
  const path = useLocation();
  // const [selectedButton, setSelectedButton] = useState("Explore");
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useAuth();

  function handleLogout() {
    try {
      auth.signOut();
      console.log("Logout successful!");
    } catch (error) {
      console.log(error);
      alert("error in logout");
    }
  }

  return (
    <>
      {/* Header */}
      <header
        className={`bg-white ${
          path.pathname === "/"
            ? "sm:px-10 xl:px-[80px] px-6 sticky top-0 z-20"
            : "xl:px-[160px] sm:px-10 hidden sm:block"
        }`}
      >
        {/* Desktop Header */}
        <div
          className={`sm:flex hidden sm:justify-between  py-4 border-b-[1px]`}
        >
          {/* logo */}
          <div className="lg:w-[22%] flex items-center">
            <img
              className="h-8 hidden xl:block"
              src={airbnb_logo_1}
              alt="air bnb logo"
            />
            <img
              className="h-10 block xl:hidden"
              src={airbnb_logo_2}
              alt="air bnb logo"
            />
          </div>
          {/* Search Bar */}
          <div className="flex items-center justify-center ">
            <div className="flex items-center border border-gray-300 rounded-full hover:shadow-md shadow-sm px-2">
              <button className="px-4 py-3 font-medium text-sm">
                Anywhere
              </button>
              <span className="h-6 w-px bg-gray-200" />
              <button className="px-4 py-3 font-medium text-sm">
                Any week
              </button>
              <span className="h-6 w-px bg-gray-200" />
              <button className="px-4 py-3 font-medium text-sm text-gray-600">
                Add guests
              </button>
              <div className="bg-orange-500 p-[10px] rounded-full">
                <img className="w-3 h-3 invert" src={search_icon} alt="" />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1 relative">
            <button className="hover:bg-gray-100 font-semibold px-3 py-2 rounded-full text-sm">
              Airbnb your home
            </button>
            <button className="p-3 hover:bg-gray-100 rounded-full">
              <img className="w-4 h-4" src={world_icon} alt="" />
            </button>
            {/* Menu Button */}
            <button
              onClick={() => setMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 border border-gray-300 rounded-full p-2 hover:shadow-md cursor-pointer"
            >
              <div className="px-2">
                <img className="w-4 h-4" src={menu_icon} alt="menu icon" />
              </div>
              <div
                className={`${
                  currentUser && "bg-gray-700"
                } flex items-center justify-center text-white w-8 h-8 text-xs rounded-full`}
              >
                {currentUser && currentUser.username.slice(0, 1)}
                {!currentUser && (
                  <img
                    src={user_icon}
                    className="w-full opacity-60"
                    alt="user_icon"
                  />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="sm:hidden flex pt-3 mb-4">
          <button
            className="rounded-full w-full py-4 font-semibold"
            style={{ boxShadow: "0px 1px 10px #00000029" }}
          >
            <div className="flex items-center justify-center gap-2">
              <img className="w-3 h-3" src={search_icon} alt="search icon" />
              <span>Start your search</span>
            </div>
          </button>
        </div>

        {/* Navbar */}
        <div className={` ${path.pathname === "/" ? "" : "hidden"}`}>
          <Navbar />
        </div>
      </header>

      {/* {currentUser ? (
        <div>
          <p>Username: {currentUser.username}</p>
          <p>Email: {currentUser.email}</p>
        </div>
      ) : (
        <p>Please log in to view your dashboard.</p>
      )} */}

      {/* Menu Modal */}
      <Modal
        isOpen={isMenuOpen}
        onRequestClose={() => setMenuOpen(false)}
        className="fixed top-20 right-20 w-60 bg-white rounded-lg"
        overlayClassName="fixed inset-0 z-20"
      >
        <div
          className="flex flex-col py-2 rounded-xl bg-white"
          style={{ boxShadow: "0px 1px 10px #00000029" }}
        >
          {/* display menu if user is not logged in */}
          {!currentUser && (
            <div>
              <div className="border-b-[1px] pb-2 borderr-gray-300">
                <button
                  onClick={() => {
                    setSignUpOpen(true);
                    setMenuOpen(false);
                  }}
                  className="py-2 px-5 w-full text-start rounded hover:bg-gray-100"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    setLoginOpen(true);
                    setMenuOpen(false);
                  }}
                  className="py-2 px-5 w-full text-start rounded hover:bg-gray-100"
                >
                  Log in
                </button>
              </div>
              <div className="pt-2">
                <button className="py-2 px-5 w-full text-start rounded hover:bg-gray-100">
                  Airbnb your home
                </button>
                <button className="py-2 px-5 w-full text-start rounded hover:bg-gray-100">
                  Host an experience
                </button>
                <button className="py-2 px-5 w-full text-start rounded hover:bg-gray-100">
                  Help Centre
                </button>
              </div>
            </div>
          )}
          {currentUser && (
            <div>
              <div className="border-b-[1px] pb-2 borderr-gray-300">
                <button className="py-2 px-5 w-full text-start rounded hover:bg-gray-100">
                  Messages
                </button>
                <button className="py-2 px-5 w-full text-start rounded hover:bg-gray-100">
                  Notifications
                </button>
                <button className="py-2 px-5 w-full text-start rounded hover:bg-gray-100">
                  Trips
                </button>
                <button className="py-2 px-5 w-full text-start rounded hover:bg-gray-100">
                  Wishlists
                </button>
              </div>
              <div className="pt-2 border-b-[1px] pb-2 borderr-gray-300">
                <button className="py-2 px-5 w-full text-start rounded hover:bg-gray-100">
                  Airbnb your home
                </button>
                <button className="py-2 px-5 w-full text-start rounded hover:bg-gray-100">
                  Host an experience
                </button>
                <button className="py-2 px-5 w-full text-start rounded hover:bg-gray-100">
                  Account
                </button>
              </div>
              <div className="pt-2">
                <button className="py-2 px-5 w-full text-start rounded hover:bg-gray-100">
                  Help Centre
                </button>
                <button
                  onClick={() => handleLogout()}
                  className="py-2 px-5 w-full text-start rounded hover:bg-gray-100"
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Sign Up Modal */}
      <SignUpModal isOpen={isSignUpOpen} onClose={() => setSignUpOpen(false)} />

      {/* Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}

export default Header;
