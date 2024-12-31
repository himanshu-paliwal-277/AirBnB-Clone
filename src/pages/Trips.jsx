import { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { formatDate } from "../utils/formateDate";

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
          setBookings(bookingsData); // Save bookings to state
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchBookings();
  }, [auth]);

  return (
    <div className="xl:px-20 lg:px-10 sm:px-10 px-6 py-10">
      <h1 className="text-3xl font-semibold">Trips</h1>

      {loading ? (
        <p className="mt-6">Loading your trips...</p>
      ) : bookings.length > 0 ? (
        <div className="mt-6 grid gap-6 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:mb-0 mb-10">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="border rounded-lg p-4 lg:p-8 shadow-lg hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold mb-2">{booking.location}</h2>
              <p>Guest: {booking.guestName}</p>
              <p>Email: {booking.guestEmail}</p>
              <p>Start Date: {formatDate(booking.startDate)}</p>
              <p>End Date: {formatDate(booking.endDate)}</p>
              <p>Nights: {booking.nights}</p>
              <p>Price: ₹{booking.price}</p>
              <p>Status: {booking.status}</p>
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
