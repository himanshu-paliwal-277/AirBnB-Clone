export const formatDate = (dateString) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Parse the input date string
  const date = new Date(dateString);

  // Extract the day, month, and year
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Return the formatted date
  return `${day} ${month} ${year}`;
};

export const formatDateToReadable = (dateString) => {
  const date = new Date(dateString);

  // Get the components of the date
  const day = date.getDate().toString().padStart(2, "0"); // Ensure day is two digits
  const month = date.toLocaleString("en-US", { month: "short" }); // Get full month name
  const year = date.getFullYear(); // Get the full year

  // Format the time
  let hours = date.getHours(); // Get hours in local time
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensure minutes are two digits

  // AM/PM Logic
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12; // Convert 24-hour format to 12-hour format
  if (hours === 0) hours = 12; // Handle midnight (0 hours becomes 12)

  const formattedTime = `${hours}:${minutes} ${period}`; // Format time

  return `${day} ${month} ${year}, ${formattedTime}`; // Combine date and time
};
