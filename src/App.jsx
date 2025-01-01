import { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify's styles
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import PageLoader from "./components/Loader/PageLoader";
import { AnimatePresence, motion } from "framer-motion"; // Framer Motion for animations

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home"));
const ListingDetails = lazy(() => import("./pages/ListingDetails"));
const HostDashboard = lazy(() => import("./pages/Host/HostDashboard"));
const AddListing = lazy(() => import("./pages/Host/AddListing"));
const ManageListings = lazy(() => import("./pages/Host/ManageListings"));
const ViewBookingRequests = lazy(() =>
  import("./pages/Host/ViewBookingRequests")
);
const Favorites = lazy(() => import("./pages/Favorites"));
const Profile = lazy(() => import("./pages/Profile"));
const Bookings = lazy(() => import("./pages/Bookings"));
const SuccessPage = lazy(() => import("./pages/SuccessPage"));
const Trips = lazy(() => import("./pages/Trips"));
const Messages = lazy(() => import("./pages/Messages"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));

const pageTransition = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

function App() {
  const location = useLocation();

  return (
    <>
      <Suspense
        fallback={
          <div className="xl:px-20 lg:px-10 sm:px-10 px-6 pb-10">
            <PageLoader />
          </div>
        }
      >
        {/* AnimatePresence wraps around Routes to enable route exit animations */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Main Layout: Wraps common elements like header or footer */}
            <Route path="/" element={<MainLayout />}>
              {/* Default Route: Home Page */}
              <Route
                index
                element={
                  <motion.div
                    variants={pageTransition}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                  >
                    <Home />
                  </motion.div>
                }
              />
              {/* Listing Details Route */}
              <Route
                path="/listing-details/:id"
                element={
                  <motion.div
                    variants={pageTransition}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                  >
                    <ListingDetails />
                  </motion.div>
                }
              />
              <Route
                path="/login"
                element={
                  <motion.div
                    variants={pageTransition}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                  >
                    <Login />
                  </motion.div>
                }
              />
              {/* Protected Host Routes */}
              <Route
                path="/host/dashboard"
                element={
                  <ProtectedRoute rolesRequired={["host"]}>
                    <motion.div
                      variants={pageTransition}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.5 }}
                    >
                      <HostDashboard />
                    </motion.div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/host/add-listing"
                element={
                  <ProtectedRoute rolesRequired={["host"]}>
                    <motion.div
                      variants={pageTransition}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.5 }}
                    >
                      <AddListing />
                    </motion.div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/host/manage-listings"
                element={
                  <ProtectedRoute rolesRequired={["host"]}>
                    <motion.div
                      variants={pageTransition}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.5 }}
                    >
                      <ManageListings />
                    </motion.div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/host/booking-requests"
                element={
                  <ProtectedRoute rolesRequired={["host"]}>
                    <motion.div
                      variants={pageTransition}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.5 }}
                    >
                      <ViewBookingRequests />
                    </motion.div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <ProtectedRoute rolesRequired={["host", "user"]}>
                    <motion.div
                      variants={pageTransition}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.5 }}
                    >
                      <Favorites />
                    </motion.div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute rolesRequired={["host", "user"]}>
                    <motion.div
                      variants={pageTransition}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.5 }}
                    >
                      <Profile />
                    </motion.div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/booking/:id"
                element={
                  <ProtectedRoute rolesRequired={["host", "user"]}>
                    <motion.div
                      variants={pageTransition}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.5 }}
                    >
                      <Bookings />
                    </motion.div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/booking/success"
                element={
                  <ProtectedRoute rolesRequired={["host", "user"]}>
                    <motion.div
                      variants={pageTransition}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.5 }}
                    >
                      <SuccessPage />
                    </motion.div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/trips"
                element={
                  <ProtectedRoute rolesRequired={["host", "user"]}>
                    <motion.div
                      variants={pageTransition}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.5 }}
                    >
                      <Trips />
                    </motion.div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/messages"
                element={
                  <ProtectedRoute rolesRequired={["host", "user"]}>
                    <motion.div
                      variants={pageTransition}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.5 }}
                    >
                      <Messages />
                    </motion.div>
                  </ProtectedRoute>
                }
              />

              {/* Fallback Route */}
              <Route
                path="*"
                element={
                  <motion.div
                    variants={pageTransition}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                  >
                    <NotFound />
                  </motion.div>
                }
              />
            </Route>
          </Routes>
        </AnimatePresence>
      </Suspense>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </>
  );
}

export default App;
