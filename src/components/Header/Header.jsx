import search_icon from "../../assets/icons/search-icon.svg";
import world_icon from "../../assets/icons/world-icon.svg";
import menu_icon from "../../assets/icons/menu-icon.svg";
import { useLocation } from "react-router-dom";

function Header() {
  const path = useLocation();
  console.log("current path: ", path.pathname);

  return (
    <>
      <header className={`flex justify-between  py-4 border-b-[1px] ${path.pathname === "/listing-details" ? "px-28" : "px-10"}`}>
        {/* logo */}
        <div className="lg:w-[22%] flex items-center">
          <img
            className="h-8 hidden lg:block"
            src="./src/assets/logo/air-bnb-logo-3.png"
            alt="air bnb logo"
          />
          <img
            className="h-10 block lg:hidden"
            src="./src/assets/logo/air-bnb-logo-2.png"
            alt="air bnb logo"
          />
        </div>
        {/* Search Bar */}
        <div className="flex items-center justify-center ">
          <div className="flex items-center border border-gray-300 rounded-full hover:shadow-md shadow-sm px-2">
            <button className="px-4 py-3 font-medium text-sm">Anywhere</button>
            <span className="h-6 w-px bg-gray-200" />
            <button className="px-4 py-3 font-medium text-sm">Any week</button>
            <span className="h-6 w-px bg-gray-200" />
            <button className="px-4 py-3 font-medium text-sm text-gray-600">
              Add guests
            </button>
            {/* <Button size="icon" variant="destructive" className="rounded-full ml-2">
              <Search className="h-4 w-4" />
            </Button> */}
            <div className="bg-orange-500 p-[10px] rounded-full">
              <img className="w-3 h-3 invert" src={search_icon} alt="" />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1">
          <button className="hover:bg-gray-100 font-semibold px-3 py-2 rounded-full text-sm">
            Airbnb your home
          </button>
          <button className="p-3 hover:bg-gray-100 rounded-full">
            <img className="w-4 h-4" src={world_icon} alt="" />
          </button>
          <div className="flex items-center gap-2 border border-gray-300 rounded-full p-2 hover:shadow-md cursor-pointer">
            <div className="px-2">
              <img className="w-4 h-4" src={menu_icon} alt="" />
            </div>
            <div className="bg-gray-700 flex items-center justify-center text-white w-8 h-8 text-xs rounded-full">
              H
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
