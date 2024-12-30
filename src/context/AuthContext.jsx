import { createContext, useState, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase"; // Import Firebase config
import { doc, getDoc, updateDoc } from "firebase/firestore";

// Create a context
const AuthContext = createContext();

// Create a provider
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, "Users", user.uid));
        const userData = userDoc.exists() ? userDoc.data() : null;

        setCurrentUser({ uid: user.uid, email: user.email, ...userData });
      } else {
        setCurrentUser(null); // No user logged in
      }
      setLoading(false); // Stop loading once the state is determined
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  // Function to update user profile in Firestore
  const updateUserProfile = async (updatedData) => {
    try {
      if (!currentUser?.uid) throw new Error("User not authenticated");

      const userDocRef = doc(db, "Users", currentUser.uid); // Firestore document reference
      await updateDoc(userDocRef, updatedData); // Update Firestore document

      // Update the `currentUser` state with the new data
      setCurrentUser((prev) => ({ ...prev, ...updatedData }));

      return true; // Indicate success
    } catch (error) {
      console.error("Error updating user profile:", error);
      return false; // Indicate failure
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, updateUserProfile }}>
      {!loading && children}{" "}
      {/* Ensure the app loads only after user state is resolved */}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
