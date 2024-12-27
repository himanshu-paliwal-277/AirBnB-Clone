import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const ProtectedRoute = ({ roleRequired, children }) => {
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (auth.currentUser) {
        const userDoc = doc(db, "Users", auth.currentUser.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          setUserRole(docSnap.data().role);
        }
      }
      setIsLoading(false);
    };

    fetchUserRole();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (!auth.currentUser || userRole !== roleRequired) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
