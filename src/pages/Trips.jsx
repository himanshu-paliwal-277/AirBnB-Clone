import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { formatDate } from "../utils/formateDate";
import { formatNumberWithCommas } from "../utils/formatNumberWithCommas";
import PageLoader from "../components/Loader/PageLoader";
import { formatDateToReadable } from "../utils/formateDate";

const Trips = () => {
  const [bookings, setBookings] = useState([]); // State to store the bookings
  const [loading, setLoading] = useState(true); // State for loading indicator
  const db = getFirestore();
  const auth = getAuth(); // Firebase Auth to get the current user

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const user = auth.currentUser; // Get the currently logged-in user
        if (user) {
          const bookingsRef = collection(db, "bookings"); // Reference to bookings collection
          const q = query(bookingsRef, where("guestId", "==", user.uid)); // Query bookings by guestId
          const querySnapshot = await getDocs(q);

          const bookingsData = querySnapshot.docs.map((doc) => ({
            id: doc.id, // Include the document ID
            ...doc.data(), // Spread the document fields
          }));

          // Sort the bookings: latest first, then ascending order
          const sortedBookings = bookingsData.sort((a, b) => {
            const dateA = new Date(a.createdAt || a.timestamp);
            const dateB = new Date(b.createdAt || b.timestamp);
            return dateB - dateA; // Latest first
          });

          setBookings(sortedBookings); // Save bookings to state
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <div className="xl:px-20 lg:px-10 sm:px-10 px-6 py-10">
      <h1 className="text-3xl font-semibold">Trips</h1>

      {loading ? (
        <div className="mt-6 flex flex-col gap-6">
          <PageLoader />
          <PageLoader />
        </div>
      ) : bookings.length > 0 ? (
        <div className="mt-6 grid gap-6 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:mb-0 mb-10">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="border rounded-lg p-4 lg:p-8 shadow-lg hover:shadow-xl transition flex flex-col gap-[2px]"
            >
              <h2 className="text-xl font-semibold mb-2">{booking.location}</h2>
              <p>Guest: {booking.guestName}</p>
              <p>Email: {booking.guestEmail}</p>
              <p>Start Date: {formatDate(booking.startDate)}</p>
              <p>End Date: {formatDate(booking.endDate)}</p>
              <p>Nights: {booking.nights}</p>
              <p>Guests: {booking.guests}</p>
              <p>Price: ₹{formatNumberWithCommas(booking.price)}</p>
              <p>Status: {booking.status}</p>
              <p>Booking Time: {formatDateToReadable(booking.createdAt)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 font-semibold text-lg">No trips booked ...yet!</p>
      )}
    </div>
  );
};

export default Trips;
