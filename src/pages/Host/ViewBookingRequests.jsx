import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { formatDate } from "../../utils/formateDate";
import PageLoader from "../../components/Loader/PageLoader";
import { formatNumberWithCommas } from "../../utils/formatNumberWithCommas";
import { formatDateToReadable } from "../../utils/formateDate";

const ViewBookingRequests = () => {
  const [bookingRequests, setBookingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch booking requests from Firestore
  useEffect(() => {
    const fetchBookingRequests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "bookings"));
        const requests = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookingRequests(requests);
      } catch (error) {
        console.error("Error fetching booking requests: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingRequests();
  }, []);

  return (
    <div className="xl:px-20 lg:px-10 sm:px-10 px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">Booking Requests</h1>
      {loading ? (
        <PageLoader />
      ) : bookingRequests.length === 0 ? (
        <p>No booking requests found.</p>
      ) : (
        <div className="space-y-4">
          {bookingRequests.map((request) => (
            <div
              key={request.id}
              className="p-4 border rounded-lg shadow-sm bg-white"
            >
              <h2 className="text-lg font-semibold">{request.propertyTitle}</h2>
              <p>
                <strong>Guest Name:</strong> {request.guestName}
              </p>
              <p>
                <strong>Guest Email:</strong> {request.guestEmail}
              </p>
              <p>
                <strong>Dates:</strong> {formatDate(request.startDate)} -{" "}
                {formatDate(request.endDate)}
              </p>
              <p>
                <strong>Guests:</strong> {request.guests}
              </p>
              <p>
                <strong>Nights:</strong> {request.nights}
              </p>
              <p>
                <strong>Location:</strong> {request.location}
              </p>
              <p>
                <strong>Total Price:</strong>{" "}
                {formatNumberWithCommas(request.price)}
              </p>
              <p>
                <strong>Booking Date:</strong>{" "}
                {formatDateToReadable(request.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewBookingRequests;
