import { useRef, useState, useEffect } from "react";
import { categories } from "../../data/categories.js";
import filter_icon from "../../assets/icons/filter-icon.svg";
import ArrowButton from "../Button/ArrowButton.jsx";
import FilterModal from "../FilterModal/FilderModal.jsx";

function Navbar() {
  const [activeCategory, setActiveCategory] = useState("historical-homes");
  const scrollContainerRef = useRef(null); // Reference to the scrollable div
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);

  // Update the scroll states (canScrollLeft, canScrollRight) based on current position
  const updateScrollStates = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  // Function to scroll left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -500, // Adjust value to control the scroll distance
        behavior: "smooth",
      });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 500, // Adjust value to control the scroll distance
        behavior: "smooth",
      });
    }
  };

  // Attach a scroll event listener to update scroll states
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", updateScrollStates);
      updateScrollStates(); // Initialize states on mount
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", updateScrollStates);
      }
    };
  }, []);

  return (
    <>
      <nav className="flex items-center justify-between sm:py-4 py-1 w-full sticky top-[83px] z-20 bg-white">
        <div className="relative xl:w-[70%] lg:w-[62%] sm:w-[50%] w-[100%]">
          <div
            ref={scrollContainerRef}
            style={{ scrollbarWidth: "none" }}
            className="flex flex-1 items-center gap-8 overflow-x-auto w-[100%]"
          >
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={`flex flex-col items-center gap-2  whitespace-nowrap pb-2 text-xs  
                border-b-2 border-gray-700 border-opacity-0  
                ${
                  activeCategory === category.value
                    ? "border-opacity-100 opacity-100 cursor-default"
                    : "hover:opacity-100 hover:border-opacity-40 opacity-70"
                }`}
              >
                <img className="w-6 h-6" src={category.icon} alt="icon" />
                <span
                  className={`font-semibold ${
                    category.label.split(" ").length > 1 ? "" : "mx-[10px]"
                  }`}
                >
                  {category.label}
                </span>
              </button>
            ))}
          </div>

          {canScrollLeft && (
            <ArrowButton
              onClickHandler={scrollLeft}
              direction="prev"
              style={
                "left-0 bg-white border-2 hidden sm:flex border-gray-300 hover:scale-[1.05]  hover:shadow-lg"
              }
            />
          )}
          {canScrollRight && (
            <ArrowButton
              onClickHandler={scrollRight}
              direction="next"
              style={
                "right-0 bg-white border-2 hidden sm:flex border-gray-300 hover:scale-[1.05] hover:shadow-lg"
              }
            />
          )}
        </div>

        <div className="sm:flex sm:gap-3 hidden xl:w-[30%] lg:w-[38%] sm:w-[50%] justify-end text-sm">
          <button
            onClick={() => setFilterModalOpen(true)}
            className="lg:px-4 px-3 py-3 border-[1px] border-gray-200 rounded-xl hover:border-gray-600 hover:bg-gray-100 duration-100 flex gap-2 items-center"
          >
            <img className="h-4 w-4" src={filter_icon} alt="filter_icon" />
            <span>Filters</span>
          </button>
          <button className="lg:px-4 px-3 py-3 border-[1px] border-gray-200 rounded-xl hover:border-gray-600 hover:bg-gray-100 duration-100 flex items-center gap-2">
            <span>Display total before taxes</span>
            <label className="inline-flex items-center cursor-pointer w-9">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-9 h-5 bg-gray-400 rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </button>
        </div>
      </nav>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setFilterModalOpen(false)}
      />
    </>
  );
}

export default Navbar;
