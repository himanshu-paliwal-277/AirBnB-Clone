import { Link } from "react-router-dom";

const HostDashboard = () => {
  return (
    <div className="xl:px-20 lg:px-10 sm:px-10 px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Host Dashboard</h1>
      <div className="space-y-4">
        <Link
          to="/host/add-listing"
          className="block bg-blue-500 text-white px-4 py-2 rounded text-center"
        >
          Add New Listing
        </Link>
        <Link
          to="/host/manage-listings"
          className="block bg-green-500 text-white px-4 py-2 rounded text-center"
        >
          Manage Listings
        </Link>
        <Link
          to="/host/booking-requests"
          className="block bg-yellow-500 text-white px-4 py-2 rounded text-center"
        >
          View Booking Requests
        </Link>
      </div>
    </div>
  );
};

export default HostDashboard;
