import { useState } from "react";
import { useLists } from "../../context/ListContext";
import search_icon from "../../assets/icons/search-icon.svg";

const SearchBar = () => {
  const { searchListings, setLoading } = useLists();
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearchButtonClick() {
    searchListings(searchQuery);
    if (searchQuery.trim() !== "") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
    console.log("searchQuery - ", searchQuery);
  }

  return (
    <>
      <div className="flex items-center border border-gray-300 rounded-full hover:shadow-md shadow-sm pr-2">
        {/* search input */}
        <input
          className="px-4 py-3 font-medium text-sm w-[100px] rounded-l-full mr-1"
          type="text"
          placeholder="Anywhere"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="h-6 w-px bg-gray-200" />
        <button className="px-4 py-3 font-medium text-sm text-gray-800">
          Any week
        </button>
        <span className="h-6 w-px bg-gray-200" />
        <button className="px-4 py-3 font-medium text-sm text-gray-600">
          Add guests
        </button>
        {/* search button */}
        <button
          className="bg-orange-500 p-[10px] rounded-full"
          onClick={handleSearchButtonClick}
        >
          <img className="w-3 h-3 invert" src={search_icon} alt="" />
        </button>
      </div>
    </>
  );
};

export default SearchBar;
