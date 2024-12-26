import { createContext, useState, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase"; // Import Firebase config
import { doc, getDoc } from "firebase/firestore";

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

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {!loading && children}{" "}
      {/* Ensure the app loads only after user state is resolved */}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
