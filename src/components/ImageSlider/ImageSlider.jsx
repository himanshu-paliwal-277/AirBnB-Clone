import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper and SwiperSlide from "swiper/react"
// import { Navigation, Pagination } from "swiper"; // Import core modules directly from "swiper"
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation"; // Import Navigation module styles
import "swiper/css/pagination"; // Import Pagination module styles
import { Navigation, Pagination } from "swiper/modules";

function ImageSlider({ property }) {
  const images = [
    property?.images[1],
    property?.images[2],
    property?.images[3],
    property?.images[4],
  ].filter(Boolean); // Filter out undefined or null images

  return (
    <div className="relative group">
      {/* Swiper for sliding images */}
      <Swiper
        pagination={{ clickable: true }}
        navigation={true} // Enable navigation
        modules={[Navigation, Pagination]}
        className="w-full h-[283px] overflow-hidden"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`slide-${index}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ImageSlider;
