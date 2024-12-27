import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation"; // Import Navigation module styles
import "swiper/css/pagination"; // Import Pagination module styles
import { Navigation, Pagination } from "swiper/modules";

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
            <img
              src={img}
              alt={`slide-${index}`}
              className="w-full h-full object-cover"
              style={{ objectFit: "cover" }} // Ensures the image covers the full container without overflow
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ImageSlider;
