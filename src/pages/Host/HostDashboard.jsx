import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { formatDateToReadable } from "../../utils/formateDate";
import BookingChart from "../../components/BookingChart/BookingChart";
import PageLoader from "../../components/Loader/PageLoader";
import { useAuth } from "../../context/AuthContext";

const HostDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({ labels: [], values: [] });
  const { currentUser } = useAuth();

  // Parse custom date format
  const parseCustomDate = (dateString) => {
    const [day, month, year, time, period] = dateString.split(/[ ,]+/);
    return new Date(`${day} ${month} ${year} ${time} ${period}`);
  };

  // Group bookings by date for chart data
  const formatChartData = (data) => {
    const groupedData = {};

    // Group by date
    data.forEach((booking) => {
      const parsedDate = parseCustomDate(
        formatDateToReadable(booking.createdAt)
      );
      const date = parsedDate.toISOString().split("T")[0]; // Extract date part
      groupedData[date] = (groupedData[date] || 0) + 1;
    });

    // Convert to chart-ready format
    const labels = Object.keys(groupedData); // Dates
    const values = Object.values(groupedData); // Counts
    return { labels, values };
  };

  // Fetch booking requests from Firestore
  useEffect(() => {
    const fetchBookingRequests = async () => {
      try {
        // Query to get bookings for the current host
        const bookingsRef = collection(db, "bookings");
        const q = query(bookingsRef, where("hostId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);

        const requests = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort requests by createdAt (oldest first)
        const sortedRequests = requests.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );

        // Update chart data
        const { labels, values } = formatChartData(sortedRequests);
        setChartData({ labels, values });
      } catch (error) {
        console.error("Error fetching booking requests: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
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

      {/* Booking Chart */}
      <div className="xl:px-20 lg:px-10 sm:px-10 px-6 py-10">
        <h2 className="text-2xl font-semibold mb-4">Booking Trends</h2>
        {loading ? <PageLoader /> : <BookingChart chartData={chartData} />}
      </div>
    </>
  );
};

export default HostDashboard;
