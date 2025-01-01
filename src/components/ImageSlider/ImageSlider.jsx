import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation"; // Import Navigation module styles
import "swiper/css/pagination"; // Import Pagination module styles
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

function ImageSlider({ images, heightInPixel }) {
  return (
    <div
      className="relative group w-full"
      style={{ height: heightInPixel + "px" }}
    >
      {/* Swiper for sliding images */}
      <Swiper
        pagination={{ clickable: true }}
        navigation={true} // Enable navigation
        modules={[Navigation, Pagination]}
        className="w-full h-full overflow-hidden"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <motion.img
              src={img}
              alt={`slide-${index}`}
              className="w-full h-full object-cover"
              style={{ objectFit: "cover" }} // Ensures the image covers the full container without overflow
              initial={{ opacity: 0, scale: 0.95 }} // Initial state of the image
              animate={{ opacity: 1, scale: 1 }} // End state of the image
              transition={{ duration: 0.5 }} // Duration of the animation
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ImageSlider;
