import { useNavigate, useParams } from "react-router-dom";
import arrow_icon from "../assets/icons/arrow.svg";
import tag_icon from "../assets/icons/tag-icon.svg";
import star_icon from "../assets/icons/star-icon.svg";
import { formatNumberWithCommas } from "../utils/formatNumberWithCommas";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { formatDate } from "../utils/formateDate";

function Bookings() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [propertyToBook, setPropertyToBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [guests, setGuests] = useState(1);
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  const [numberOfNights, setNumberOfNights] = useState(5);

  const originalPrice = propertyToBook ? propertyToBook.price : 0;
  const discountedPrice = propertyToBook
    ? Math.floor(originalPrice - originalPrice * 0.1)
    : 0;
  const taxes = 1750;
  const airbnb_service_fee = 1250;
  const totalDiscountedPrice = discountedPrice * numberOfNights;
  const totalPrice = totalDiscountedPrice + taxes + airbnb_service_fee;

  useEffect(() => {
    const listings = JSON.parse(localStorage.getItem("listings") || "[]");
    const data = listings.find((listing) => listing.id === id);
    setPropertyToBook(data);
    window.scrollTo(0, 0);
    setGuests(localStorage.getItem("guests"));
    setDate1(localStorage.getItem("date1"));
    setDate2(localStorage.getItem("date2"));
    setNumberOfNights(localStorage.getItem("numberOfNights"));
  }, [id]);

  const handleBooking = async () => {
    if (!propertyToBook) return;
    setLoading(true);
    try {
      // Add booking to Firestore
      const bookingData = {
        propertyId: propertyToBook.id,
        location: propertyToBook.location,
        price: totalPrice,
        nights: numberOfNights,
        status: "pending",
        startDate: date1,
        endDate: date2,
        guests: guests,
        guestName: currentUser.username,
        guestId: currentUser.uid,
        guestEmail: currentUser.email,
        hostId: propertyToBook.hostUid,
        createdAt: new Date().toISOString(),
      };

      // Add booking to the bookings collection
      const bookingsRef = collection(db, "bookings");
      const bookingDoc = await addDoc(bookingsRef, bookingData);

      console.log("Booking successful:", bookingDoc.id);

      // Update host's incoming requests
      const hostDocRef = doc(db, "users", propertyToBook.hostUid);
      const hostDoc = await getDoc(hostDocRef);

      if (hostDoc.exists()) {
        const hostData = hostDoc.data();
        const updatedRequests = [
          ...(hostData.incomingRequests || []),
          { bookingId: bookingDoc.id, ...bookingData },
        ];

        await updateDoc(hostDocRef, { incomingRequests: updatedRequests });
        console.log("Host's incoming requests updated");
      }

      toast.success("Booking successful!");
      setTimeout(() => {
        navigate("/booking/success");
      }, 1000);
    } catch (error) {
      console.error("Error booking property:", error);
      toast.error("Failed to book the property.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="xl:px-40 lg:px-10 sm:px-10 px-6 py-10">
        <div className="relative">
          <h1 className="text-3xl font-semibold mb-8 sm:mb-0">Requests to book</h1>
          {/* back button */}
          <button
            onClick={() => navigate(-1)}
            className="p-3 hover:bg-gray-200 rounded-full absolute xl:top-1 xl:block hidden xl:left-[-55px]"
          >
            <img className="w-3 rotate-180" src={arrow_icon} alt="arrow_icon" />
          </button>
        </div>

        <div className="flex sm:flex-row flex-col-reverse w-full justify-between">
          <div className="flex flex-col xl:w-[50%] lg:w-[45%] sm:w-[48%] w-full">
            <div className="border-2 mt-6 flex items-start gap-8 border-gray-300 rounded-lg p-6">
              <div>
                <h3 className="text-lg font-semibold">Lower price</h3>
                <p className="text-gray-500">
                  Your dates are ₹734 less than the avg. nightly rate of the
                  last 3 months.
                </p>
              </div>
              <img className="w-8 mr-6" src={tag_icon} alt="tag_icon" />
            </div>
            {/* Booking details */}
            <div className="border-b border-gray-300 py-10">
              <h1 className="text-2xl font-semibold mb-4">Your trip</h1>
              <div className="flex items-start  w-full justify-between">
                <div>
                  <p className="mb-1 text-lg font-semibold">Dates</p>
                  <p>
                    {formatDate(date1)}
                    {"  -  "}
                    {formatDate(date2)}
                  </p>
                </div>
                <button className="font-semibold underline">Edit</button>
              </div>
              <div className="flex mt-4 items-start  w-full justify-between">
                <div>
                  <p className="mb-1 text-lg font-semibold">Guests</p>
                  <p>{guests} guest</p>
                </div>
                <button className="font-semibold underline">Edit</button>
              </div>
            </div>
            <div className="border-b border-gray-300 py-10">
              <h1 className="text-2xl font-semibold mb-4">
                Cancellation policy
              </h1>
              <p>
                This reservation is non-refundable.{" "}
                <a className="underline font-semibold">Learn more</a>
              </p>
            </div>
            <div className="border-b border-gray-300 py-10">
              <h1 className="text-2xl font-semibold mb-4">Ground rules</h1>
              <p>
                We ask every guest to remember a few simple things about what
                makes a great guest.
              </p>
              <ul className="list-disc ml-6 mt-2">
                <li>Follow the house rules</li>
                <li>Treat your Host’s home like your own</li>
              </ul>
            </div>
            {/* Book Button */}
            <button
              onClick={handleBooking}
              className={`px-10 py-[10px] text-lg ${
                loading ? "bg-[#FF385C]/80 cursor-not-allowed" : "bg-[#FF385C] active:bg-[#FF385C] hover:bg-[#FF385C]/90"
              } text-white font-semibold rounded-lg`}
              disabled={loading}
            >
              {loading ? "Booking..." : "Book"}
            </button>
          </div>

          <div className="relative">
            <div className="sticky top-32 xl:w-[460px] lg:w-[430px] sm:w-[320px] p-6 bg-white border border-gray-300 rounded-xl">
              <div className="flex gap-5 border-b border-gray-300 pb-6">
                <img
                  className="w-32 h-24 object-cover rounded-lg"
                  src={propertyToBook && propertyToBook.images[0]}
                  alt="image"
                />
                <div>
                  <p className="font-semibold text-xl">
                    {propertyToBook && propertyToBook.title}
                  </p>
                  <p>{propertyToBook && propertyToBook.location}</p>
                  <p className="flex items-center gap-1">
                    <img className="w-3" src={star_icon} alt="star_icon" />
                    {propertyToBook && propertyToBook.rating} <span className="lg:block hidden">{"(41 reviews)"}</span>
                  </p>
                </div>
              </div>
              <div className="p-0 flex flex-col gap-4">
                <h1 className="font-semibold text-2xl mt-4">Price details</h1>
                <div className="flex justify-between">
                  <p>
                    ₹{discountedPrice} x {numberOfNights} nights
                  </p>
                  <p>₹{formatNumberWithCommas(totalDiscountedPrice)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="underline">Airbnb service fee</p>
                  <p>₹{formatNumberWithCommas(airbnb_service_fee)}</p>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-6">
                  <p className="underline">Taxes</p>
                  <p>₹{formatNumberWithCommas(taxes)}</p>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <p className="underline">Total (INR)</p>
                  <p>₹{formatNumberWithCommas(totalPrice)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bookings;
