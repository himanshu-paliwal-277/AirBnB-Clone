import { createContext, useContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase"; // Ensure the correct path to your Firebase config

// Create Context
const ListContext = createContext();

// Provider Component
export const ListProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch listings from Firebase
  const fetchLists = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "listings"));
      const fetchedLists = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListings(fetchedLists);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <ListContext.Provider value={{ listings, setListings, loading }}>
      {children}
    </ListContext.Provider>
  );
};

// Custom hook to use the context
// eslint-disable-next-line react-refresh/only-export-components
export const useLists = () => {
  return useContext(ListContext);
};
