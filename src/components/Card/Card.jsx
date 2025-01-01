import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useRef, useState } from "react";
import ArrowButton from "../Button/ArrowButton";
import star_icon from "../../assets/icons/star-icon.svg";
import heart_icon from "../../assets/icons/heart-icon.svg";
import heart_icon_filled from "../../assets/icons/heart-icon-filled.svg";
import { useNavigate } from "react-router-dom";
import { formatNumberWithCommas } from "../../utils/formatNumberWithCommas";
import { useFavorites } from "../../context/FavoritesContext";
import LoginModal from "../LoginModal/LoginModal";
import { useAuth } from "../../context/AuthContext";

const Card = ({ images, location, title, rating, dateRange, price, id }) => {
  const swiperRef = useRef(null);
  const [canSlidePrev, setCanSlidePrev] = useState(false);
  const [canSlideNext, setCanSlideNext] = useState(images?.length > 1);
  const { favorites, toggleFavorite } = useFavorites(); // Get context values
  const isFavorite = favorites.includes(id); // Check if current listing is in favorites
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSlideChange = (swiper) => {
    setCanSlidePrev(swiper.isBeginning === false); // Can slide prev if not at the first slide
    setCanSlideNext(swiper.isEnd === false); // Can slide next if not at the last slide
  };

  function handlePreviousButtonClick(event) {
    event.stopPropagation();
    swiperRef.current?.slidePrev();
  }

  function handleNextButtonClick(event) {
    event.stopPropagation();
    swiperRef.current?.slideNext();
  }

  return (
    <>
      <div
        onClick={() => navigate(`/listing-details/${id}`)}
        className="overflow-hidden relative flex flex-col mb-4 cursor-pointer"
      >
        <div className="relative group">
          {/* Swiper for sliding images */}
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={handleSlideChange} // Update button visibility on slide change
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            className="w-full sm:h-[300px] h-[304px] rounded-xl overflow-hidden"
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

          {/* Custom Buttons */}
          {canSlidePrev && (
            <ArrowButton
              onClickHandler={handlePreviousButtonClick}
              direction="prev"
              style={
                "left-3 scale-[0.9] hover:scale-100 hover:bg-opacity-100 bg-opacity-80 group-hover:opacity-100 opacity-0 duration-300 bg-white"
              }
            />
          )}
          {canSlideNext && (
            <ArrowButton
              onClickHandler={handleNextButtonClick}
              direction="next"
              style={
                "right-3 scale-[0.9] hover:scale-100 hover:bg-opacity-100 bg-opacity-80 group-hover:opacity-100 opacity-0 duration-300 bg-white"
              }
            />
          )}

          {/* Add to favorites button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!currentUser) {
                setIsModalOpen(true);
              } else {
                toggleFavorite(id); // Use context to toggle favorite
              }
            }}
            className="absolute top-3 right-3 z-10"
          >
            <img
              src={isFavorite ? heart_icon_filled : heart_icon}
              className="w-6 h-6 hover:scale-105 duration-100 cursor-pointer active:scale-100"
              alt="heart_icon"
            />
          </button>
        </div>
        {/* Card Content */}
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">{location}</h3>
            <div className="flex items-center gap-1">
              <img src={star_icon} className="w-3 h-3" alt="star_icon" />
              <span>{rating}</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm">{title}</p>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 text-sm">{dateRange}</span>
          </div>
          <div className="mt-2 flex gap-1">
            <span className="font-semibold">
              ₹{formatNumberWithCommas(Number(price))}
            </span>
            <span>night</span>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Card;
