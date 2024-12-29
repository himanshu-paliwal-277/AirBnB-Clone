import { createContext, useContext, useState, useEffect } from "react";
import { db, auth } from "../firebase/firebase"; // Ensure Firebase is initialized
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

// Create a context
const FavoritesContext = createContext();

// Provider component
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch favorites from Firestore
  const fetchFavorites = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const favoriteDocRef = doc(db, "favorites", userId);
    const docSnap = await getDoc(favoriteDocRef);

    if (docSnap.exists()) {
      const favoriteData = docSnap.data().listings || [];
      setFavorites(favoriteData);
    } else {
      setFavorites([]);
    }
    setLoading(false);
  };

  // Add or remove from favorites in Firestore
  const toggleFavorite = async (propertyId) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const favoriteDocRef = doc(db, "favorites", userId);
    const docSnap = await getDoc(favoriteDocRef);

    let updatedFavorites = [];
    if (docSnap.exists()) {
      updatedFavorites = docSnap.data().listings || [];
    }

    if (updatedFavorites.includes(propertyId)) {
      // Remove from favorites
      updatedFavorites = updatedFavorites.filter((id) => id !== propertyId);
      toast.info("Removed from favorites");
    } else {
      // Add to favorites
      updatedFavorites.push(propertyId);
      toast.success("Added to favorites");
    }

    // Update Firestore
    await setDoc(favoriteDocRef, { listings: updatedFavorites });
    setFavorites(updatedFavorites);
  };

  // Fetch favorites on component mount
  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use the FavoritesContext
// eslint-disable-next-line react-refresh/only-export-components
export const useFavorites = () => {
  return useContext(FavoritesContext);
};
