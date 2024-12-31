import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import PageLoader from "../../components/Loader/PageLoader";

const ProtectedRoute = ({ rolesRequired, children }) => {
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

  if (isLoading)
    return (
      <div className="xl:px-20 lg:px-10 sm:px-10 px-6 py-10 mb-44">
        <PageLoader />
      </div>
    );

  // If no user is logged in or if their role is not one of the allowed roles
  if (!auth.currentUser || !rolesRequired?.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
