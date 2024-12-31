import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import search_icon from "../assets/icons/search-icon-2.svg";
import search_icon_red from "../assets/icons/search-icon-2-red.svg";
import heart_icon from "../assets/icons/heart-icon-2.svg";
import heart_icon_red from "../assets/icons/heart-icon-2-red.svg";
import user_icon from "../assets/icons/user-icon.svg";
import user_icon_red from "../assets/icons/user-icon-red.svg";
import airbnb_icon from "../assets/icons/airbnb-icon.svg";
import airbnb_icon_red from "../assets/icons/airbnb-icon-red.svg";
import message_icon from "../assets/icons/message-icon.svg";
import message_icon_red from "../assets/icons/message-icon-red.svg";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function MainLayout() {
  const [selectedButton, setSelectedButton] = useState("Explore");
  const navigate = useNavigate();
  const path = useLocation();
  const {currentUser} = useAuth();

  useEffect(() => {
    if (path.pathname === "/") {
      setSelectedButton("Explore");
    }
    if (path.pathname === "/wishlist") {
      setSelectedButton("Wishlists");
    }
    if (path.pathname === "/login") {
      setSelectedButton("Log in");
    }
    if (path.pathname === "/profile") {
      setSelectedButton("Profile");
    }
    if (path.pathname === "/trips") {
      setSelectedButton("Trips");
    }
    if (path.pathname === "/messages") {
      setSelectedButton("Messages");
    }
  }, [path]);

  return (
    <>
      <div className="relative">
        <Header />
        <main className="">
          <Outlet />
        </main>
        <Footer />
      </div>

      {/* Mobile View Bottom Bar */}
      <div className={`${path.pathname.startsWith("/listing-details/") && "hidden"} ${path.pathname.startsWith("/booking/") && "hidden"} sm:hidden fixed bottom-0 w-full h-16 bg-white z-20 flex items-center justify-center`}>
        <div className={`${currentUser ? "flex justify-between w-full px-6": "flex gap-[50px]"}`}>
          {/* Eplore Button */}
          <button
            onClick={() => {
              setSelectedButton("Explore");
              navigate("/");
            }}
            className={`flex flex-col items-center gap-1 ${
              selectedButton === "Explore" ? "opacity-100" : "opacity-60"
            }`}
          >
            <img
              className={`w-6 h-6`}
              src={selectedButton === "Explore" ? search_icon_red : search_icon}
              alt="search icon"
            />
            <span
              className={`text-[10px] font-semibold ${
                selectedButton === "Explore" ? "text-[#E81948]" : ""
              }`}
            >
              Explore
            </span>
          </button>
          {/* Wishlists Button */}
          <button
            onClick={() => {
              setSelectedButton("Wishlists");
              navigate("/wishlist");
            }}
            className={`${currentUser ? "" : "hidden"} flex flex-col items-center gap-1 ${
              selectedButton === "Wishlists" ? "opacity-100" : "opacity-60"
            }`}
          >
            <img
              className={`w-6 h-6`}
              src={selectedButton === "Wishlists" ? heart_icon_red : heart_icon}
              alt="heart icon"
            />
            <span
              className={`text-[10px] font-semibold ${
                selectedButton === "Wishlists" ? "text-[#E81948]" : ""
              }`}
            >
              Wishlists
            </span>
          </button>
          {/* Trips Button */}
          <button
            onClick={() => {
              setSelectedButton("Trips");
              navigate("/trips");
            }}
            className={`${currentUser ? "" : "hidden"} flex flex-col items-center gap-1 ${
              selectedButton === "Trips" ? "opacity-100" : "opacity-60"
            }`}
          >
            <img
              className={`w-6 h-6`}
              src={selectedButton === "Trips" ? airbnb_icon_red : airbnb_icon}
              alt="heart icon"
            />
            <span
              className={`text-[10px] font-semibold ${
                selectedButton === "Trips" ? "text-[#E81948]" : ""
              }`}
            >
              Trips
            </span>
          </button>
          {/* Messages Button */}
          <button
            onClick={() => {
              setSelectedButton("Messages");
              navigate("/messages");
            }}
            className={`${currentUser ? "" : "hidden"} flex flex-col items-center gap-1 ${
              selectedButton === "Messages" ? "opacity-100" : "opacity-60"
            }`}
          >
            <img
              className={`w-6 h-6`}
              src={selectedButton === "Messages" ? message_icon_red : message_icon}
              alt="heart icon"
            />
            <span
              className={`text-[10px] font-semibold ${
                selectedButton === "Messages" ? "text-[#E81948]" : ""
              }`}
            >
              Messages
            </span>
          </button>
          {/* Log in Button */}
          <button
            onClick={() => {
              setSelectedButton("Log in");
              navigate("/login");
            }}
            className={`${currentUser ? "hidden" : ""} flex flex-col items-center gap-1 ${
              selectedButton === "Log in" ? "opacity-100" : "opacity-60"
            }`}
          >
            <img
              className={`w-6 h-6`}
              src={selectedButton === "Log in" ? user_icon_red : user_icon}
              alt="user icon"
            />
            <span
              className={`text-[10px] font-semibold ${
                selectedButton === "Log in" ? "text-[#E81948]" : ""
              }`}
            >
              Log in
            </span>
          </button>
          {/* Profile Button */}
          <button
            onClick={() => {
              setSelectedButton("Profile");
              navigate("/profile");
            }}
            className={`${currentUser ? "" : "hidden"} flex flex-col items-center gap-1 ${
              selectedButton === "Profile" ? "opacity-100" : "opacity-60"
            }`}
          >
            <img
              className={`w-6 h-6`}
              src={selectedButton === "Profile" ? user_icon_red : user_icon}
              alt="user icon"
            />
            <span
              className={`text-[10px] font-semibold ${
                selectedButton === "Profile" ? "text-[#E81948]" : ""
              }`}
            >
              Profile
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default MainLayout;
