import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import PageLoader from "../../components/Loader/PageLoader";

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

  if (isLoading)
    return (
      <div className="xl:px-40 lg:px-10 sm:px-10 px-6 py-10">
        <PageLoader />
      </div>
    );

  if (!auth.currentUser || userRole !== roleRequired) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
