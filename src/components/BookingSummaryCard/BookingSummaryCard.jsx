import DatePicker from "../DatePicker/DatePicker";
import tag_icon from "../../assets/icons/tag-icon.svg";
import flag_icon from "../../assets/icons/flag.svg";
import { useState } from "react";
import { formatNumberWithCommas } from "../../utils/formatNumberWithCommas";

function BookingSummaryCard({ originalPrice, discountedPrice }) {
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  const [dateDifference, setDateDifference] = useState(5); // Default to 5 night
  const [guests, setGuests] = useState("1");

  const handleGuestChange = (event) => {
    setGuests(event.target.value);
  };

  const calculateDateDifference = (start, end) => {
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      if (!isNaN(startDate) && !isNaN(endDate)) {
        const diff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        setDateDifference(diff > 0 ? diff : 1); // Default to 1 if negative or zero
      } else {
        setDateDifference(1); // Reset if invalid
      }
    } else {
      setDateDifference(1); // Reset if dates are missing
    }
  };

  const handleDateChange1 = (date) => {
    setDate1(date);
    console.log("date1 = ", date1, "date2 = ", date2);
    calculateDateDifference(date, date2);
  };

  const handleDateChange2 = (date) => {
    setDate2(date);
    console.log("date1 = ", date1, "date2 = ", date2);
    calculateDateDifference(date1, date);
  };

  const numberOfNights = dateDifference;
  const total = discountedPrice * numberOfNights;

  return (
    <div className="sticky top-28">
      <div
        className="w-full max-w-[400px] p-6 bg-white border border-gray-300 rounded-xl"
        style={{ boxShadow: "#e6e6e6 0px 0px 8px 2px" }}
      >
        <div className="p-0 flex flex-col gap-4">
          <div className="flex items-baseline gap-1">
            <span className="line-through text-xl text-gray-500">
              ₹{formatNumberWithCommas(originalPrice)}
            </span>
            <span className="font-semibold text-xl">
              ₹{formatNumberWithCommas(discountedPrice)}
            </span>
            <span className="text-gray-500">night</span>
          </div>

          <div className="border border-gray-500 rounded-lg overflow-hidden">
            <div className="grid grid-cols-2 border-b border-gray-500">
              <div className="p-3 border-r border-gray-500">
                <div className="text-xs font-semibold uppercase">CHECK-IN</div>
                <DatePicker onDateChange={handleDateChange1} />
              </div>
              <div className="p-3">
                <div className="text-xs font-semibold uppercase">CHECKOUT</div>
                <DatePicker
                  dateAfterToday={5}
                  onDateChange={handleDateChange2}
                />
              </div>
            </div>

            <div className="w-full focus:border focus:border-gray-500 rounded">
              <label
                htmlFor="guests"
                className="text-xs font-semibold uppercase block mb-1 absolute px-4 pt-3"
              >
                Guests
              </label>
              <select
                id="guests"
                value={guests}
                onChange={handleGuestChange}
                className="w-full px-4 pt-7 pb-3 cursor-pointer rounded-lg"
              >
                <option value="1">1 guest</option>
                <option value="2">2 guests</option>
                <option value="3">3 guests</option>
                <option value="4">4 guests</option>
              </select>
            </div>
          </div>

          <button className="w-full h-12 text-base bg-[#FF385C] hover:bg-[#FF385C]/90 text-white font-semibold rounded-lg">
            Reserve
          </button>

          <div className="text-center text-gray-500 text-sm">
            You won&apos;t be charged yet
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <div className="underline">
                ₹{discountedPrice} x {numberOfNights} nights
              </div>
              <div>₹{formatNumberWithCommas(total)}</div>
            </div>

            <div className="pt-4 border-t flex justify-between items-center font-semibold">
              <div>Total before taxes</div>
              <div>₹{formatNumberWithCommas(total)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-2 mt-6 flex items-start gap-5 border-gray-300 rounded-lg p-6">
        <img className="w-8" src={tag_icon} alt="tag_icon" />
        <div>
          <h3 className="text-lg font-semibold">Lower price</h3>
          <p className="text-gray-500">
            Your dates are ₹3,899 less than the avg. nightly rate of the last 60
            days.
          </p>
        </div>
      </div>

      <div className="flex justify-center w-full mt-6 pb-12">
        <div className="flex items-center gap-3">
          <img src={flag_icon} className="w-4 opacity-80" alt="flag_icon" />
          <a className="underline cursor-pointer">Report this listing</a>
        </div>
      </div>
    </div>
  );
}

export default BookingSummaryCard;
