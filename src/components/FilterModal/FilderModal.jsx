import Modal from "react-modal";
import cross_icon from "../../assets/icons/cross-icon.svg";
import RangeSlider from "../InputRange/RangeSlider";
import { useState } from "react";
import { useLists } from "../../context/ListContext";
import { motion } from "framer-motion"; // Import motion from framer-motion

Modal.setAppElement("#root"); // Accessibility

const FilterModal = ({ isOpen, onClose }) => {
  const { filterByPrice, setLoading } = useLists();
  const [minPrice, setMinPrice] = useState(3000);
  const [maxPrice, setMaxPrice] = useState(15000);

  // Handle price filter changes
  const handlePriceFilter = () => {
    const updatedRange = { min: minPrice, max: maxPrice };
    filterByPrice(updatedRange); // Pass the updated price range to the filter function
    onClose(); // Close the modal after applying the filter
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  function handleClearPricesRange() {
    setMinPrice(3000);
    setMaxPrice(15000);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="w-[400px] mx-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-30"
    >
      <motion.div
        initial={{ y: "100%", opacity: 0 }} // Start from the bottom with 0 opacity
        animate={{ y: 0, opacity: 1 }} // Move to the normal position with full opacity
        exit={{ y: "100%", opacity: 0 }} // Exit animation
        transition={{
          type: "spring",
          stiffness: 400, // Lower stiffness for smoother animation
          damping: 40, // Higher damping to reduce overshoot
          mass: 1, // Adding mass for more fluid motion
        }}
        className="rounded-lg shadow-lg relative bg-white"
      >
        <h2 className="text-lg py-4 border-b border-gray-300 font-semibold mb-2 text-center">
          Filters
        </h2>
        <div className="p-6">
          <div>
            <h1 className="text-xl font-semibold mb-1">Price range</h1>
            <p className="text-gray-600 text-sm">
              Nightly prices before fees and taxes
            </p>
          </div>
          <div className="mt-8">
            <RangeSlider
              min={850}
              max={20000}
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
            />
            <div className="flex justify-between mt-2 text-xs">
              <div className="flex flex-col items-center">
                <span className="text-gray-700">Minimum</span>
                <div className="flex items-center px-6 font-semibold text-sm py-3 mt-2 border border-gray-400 rounded-full outline outline-1 outline-gray-300 w-fit">
                  <span className="text-gray-600">₹</span>
                  <input
                    className="w-[55px] text-center outline-none bg-transparent appearance-none"
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
                    min={850}
                    max={20000}
                    style={{
                      WebkitAppearance: "none",
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-gray-700">Maximum</span>
                <div className="flex items-center px-6 font-semibold text-sm py-3 mt-2 border border-gray-400 rounded-full outline outline-1 outline-gray-300 w-fit">
                  <span className="text-gray-600">₹</span>
                  <input
                    className="w-[55px] text-center outline-none bg-transparent appearance-none"
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
                    min={850}
                    max={20000}
                    style={{
                      WebkitAppearance: "none",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-4 border-t border-gray-300 px-6 flex justify-between">
          <button
            onClick={handleClearPricesRange}
            className="hover:bg-gray-100 px-2 py-2 rounded-lg"
          >
            clear all
          </button>
          <button
            onClick={handlePriceFilter}
            className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 active:bg-black"
          >
            Show Results
          </button>
        </div>
        {/* close button */}
        <button
          onClick={onClose}
          className="absolute hover:bg-gray-200 p-2 rounded-full top-4 left-4"
        >
          <img className="w-4" src={cross_icon} alt="cross_icon" />
        </button>
      </motion.div>
    </Modal>
  );
};

export default FilterModal;
