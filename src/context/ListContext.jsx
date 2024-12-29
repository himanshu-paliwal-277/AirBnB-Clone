import { createContext, useContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase"; // Ensure the correct path to your Firebase config

// Create Context
const ListContext = createContext();

// Provider Component
export const ListProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]); // State for filtered results
  const [loading, setLoading] = useState(true);

  // Location State
  const [location, setLocation] = useState("");

  // Price Range State
  const [priceRange, setPriceRange] = useState({ min: 3000, max: 15000 });

  // Fetch listings from Firebase
  const fetchLists = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "listings"));
      const fetchedLists = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListings(fetchedLists);
      setFilteredListings(fetchedLists); // Initialize filtered listings
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to filter listings by location and price
  const filterListings = (location = "", range = { min: 0, max: Infinity }) => {
    const filtered = listings.filter((listing) => {
      const matchesLocation =
        location === "" || listing.location.toLowerCase().includes(location.toLowerCase());
      const matchesPrice =
        listing.price >= range.min && listing.price <= range.max;

      return matchesLocation && matchesPrice;
    });
    setFilteredListings(filtered);
  };

  // Search Listings based on location
  const searchListings = (searchLocation) => {
    setLocation(searchLocation); // Update location state
    filterListings(searchLocation, priceRange); // Filter using location and current price range
  };

  // Filter Listings by Price
  const filterByPrice = (range) => {
    setPriceRange(range);
    filterListings(location, range); // Filter using price and current location
  };

  useEffect(() => {
    fetchLists();
  }, []);

  // Whenever location or priceRange changes, filter listings
  useEffect(() => {
    filterListings(location, priceRange);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, priceRange]);

  return (
    <ListContext.Provider
      value={{
        listings,
        filteredListings,
        loading,
        setLoading,
        searchListings,
        filterByPrice,
        setLocation,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

// Custom hook to use the context
// eslint-disable-next-line react-refresh/only-export-components
export const useLists = () => {
  return useContext(ListContext);
};
