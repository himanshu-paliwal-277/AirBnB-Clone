import CardSection from "../components/CardSection/CardSection";
import search_icon from "../assets/icons/search-icon-2.svg";
import heart_icon from "../assets/icons/heart-icon-2.svg";
import user_icon from "../assets/icons/user-icon.svg";
import { useState } from "react";

function Home() {
  const [selectedButton, setSelectedButton] = useState("Explore");

  return (
    <>
      <CardSection />

      {/* Mobile View Bottom Bar */}
      <div className="sm:hidden fixed bottom-0 w-full h-16 bg-white z-20 flex items-center justify-center">
        <div className="flex gap-[50px]">
          <button
            onClick={() => setSelectedButton("Explore")}
            className={`flex flex-col items-center gap-1 ${
              selectedButton === "Explore" ? "opacity-100" : "opacity-60"
            }`}
          >
            <img
              className={`w-6 h-6 ${selectedButton === "Explore" ? "" : ""}`}
              src={search_icon}
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
          <button
            onClick={() => setSelectedButton("Wishlists")}
            className={`flex flex-col items-center gap-1 ${
              selectedButton === "Wishlists" ? "opacity-100" : "opacity-60"
            }`}
          >
            <img
              className={`w-6 h-6 ${selectedButton === "Wishlists" ? "" : ""}`}
              src={heart_icon}
              alt="search icon"
            />
            <span
              className={`text-[10px] font-semibold ${
                selectedButton === "Wishlists" ? "text-[#E81948]" : ""
              }`}
            >
              Wishlists
            </span>
          </button>
          <button
            onClick={() => setSelectedButton("Log in")}
            className={`flex flex-col items-center gap-1 ${
              selectedButton === "Log in" ? "opacity-100" : "opacity-60"
            }`}
          >
            <img
              className={`w-6 h-6 ${selectedButton === "Log in" ? "" : ""}`}
              src={user_icon}
              alt="search icon"
            />
            <span
              className={`text-[10px] font-semibold ${
                selectedButton === "Log in" ? "text-[#E81948]" : ""
              }`}
            >
              Log in
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
