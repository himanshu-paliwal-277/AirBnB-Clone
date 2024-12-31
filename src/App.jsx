import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ListingDetails from "./pages/ListingDetails";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify's styles
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import HostDashboard from "./pages/Host/HostDashboard";
import AddListing from "./pages/Host/AddListing";
import ManageListings from "./pages/Host/ManageListings";
import ViewBookingRequests from "./pages/Host/ViewBookingRequests";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Bookings from "./pages/Bookings";
import SuccessPage from "./pages/SuccessPage";
// import Favorites from "./pages/Favorites";

function App() {
  return (
    <>
      <Routes>
        {/* Main Layout: Wraps common elements like header or footer */}
        <Route path="/" element={<MainLayout />}>
          {/* Default Route: Home Page */}
          <Route index element={<Home />}></Route>
          {/* Listing Details Route */}
          <Route path="/listing-details/:id" element={<ListingDetails />} />
          {/* Protected Host Routes */}
          <Route
            path="/host/dashboard"
            element={
              <ProtectedRoute rolesRequired={["host"]}>
                <HostDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/host/add-listing"
            element={
              <ProtectedRoute rolesRequired={["host"]}>
                <AddListing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/host/manage-listings"
            element={
              <ProtectedRoute rolesRequired={["host"]}>
                <ManageListings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/host/booking-requests"
            element={
              <ProtectedRoute rolesRequired={["host"]}>
                <ViewBookingRequests />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute rolesRequired={["host", "user"]}>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute rolesRequired={["host", "user"]}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking/:id"
            element={
              <ProtectedRoute rolesRequired={["host", "user"]}>
                <Bookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking/success"
            element={
              <ProtectedRoute rolesRequired={["host", "user"]}>
                <SuccessPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" autoClose={2000}  />
    </>
  );
}

export default App;
