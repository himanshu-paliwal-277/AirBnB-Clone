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
  const day = date.getUTCDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getUTCFullYear();

  // Format the time
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  
  // AM/PM Logic
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12; // Convert hours from 24-hour to 12-hour format
  if (hours === 0) hours = 12; // Handle the case where hours is 0 (midnight)
  
  const formattedTime = `${hours}:${minutes} ${period}`;

  return `${day} ${month} ${year}, ${formattedTime} (UTC)`;
};

