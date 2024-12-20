import { useEffect, useState } from "react";

function DatePicker({ dateAfterToday = 0, onDateChange }) {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Calculate the default date based on `dateAfterToday`
    const today = new Date();
    const defaultDate = new Date(today);
    defaultDate.setDate(today.getDate() + dateAfterToday);

    const formattedDate = defaultDate.toISOString().split("T")[0]; // Extract 'YYYY-MM-DD'
    setCurrentDate(formattedDate); // Set the state with the default date

    // Notify the parent component with the default date
    if (onDateChange) {
      onDateChange(formattedDate);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateAfterToday]);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setCurrentDate(selectedDate); // Update state with the selected date
    if (onDateChange) {
      onDateChange(selectedDate); // Notify the parent component with the selected date
    }
  };

  return (
    <div>
      <input
        type="date"
        id="datePicker"
        min={new Date().toISOString().split("T")[0]} // Ensure the minimum selectable date is today
        value={currentDate} // Bind the input to the `currentDate` state
        onChange={handleDateChange} // Update state and notify parent on date change
      />
    </div>
  );
}

export default DatePicker;
