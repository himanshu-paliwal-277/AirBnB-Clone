import { useState, useEffect } from "react";
import { Slider } from "@mui/material";

const RangeSlider = ({
  min,
  max,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}) => {
  // State to hold the value of the slider
  const [value, setValue] = useState([minPrice, maxPrice]);

  // Update slider value when minPrice or maxPrice props change (e.g., after reset)
  useEffect(() => {
    setValue([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  // Handle the slider value change
  const handleChange = (event, newValue) => {
    setValue(newValue);
    const [minPrice, maxPrice] = newValue;
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
  };

  // Function to format the value for accessibility (Price in ₹)
  const valuetext = (value) => {
    return `₹${value}`;
  };

  return (
    <div>
      {/* Slider Component */}
      <Slider
        getAriaLabel={() => "Price range"} // ARIA label for accessibility
        value={value} // Current value of the slider
        onChange={handleChange} // Handle value change
        valueLabelDisplay="auto" // Display the value label on hover
        getAriaValueText={valuetext} // Accessibility text for the slider value
        valueLabelFormat={valuetext} // Format value label as ₹
        min={min} // Min value for the slider (price in ₹)
        max={max} // Max value for the slider (price in ₹)
        step={100} // Step size (e.g., ₹100 increments)
      />
    </div>
  );
};

export default RangeSlider;
