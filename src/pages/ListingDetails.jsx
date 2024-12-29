import star_icon from "../assets/icons/star-icon.svg";
import garden_icon from "../assets/icons/garden-icon.svg";
import swimming_pool_icon from "../assets/icons/swimming-pool-icon.svg";
import arrow_icon from "../assets/icons/arrow.svg";
import bag_icon from "../assets/icons/bag.svg";
import heart_icon from "../assets/icons/heart-icon-3.svg";
import share_icon from "../assets/icons/share-icon.svg";
import music_icon from "../assets/icons/music.svg";
import Bookmark_icon from "../assets/icons/Bookmark-icon.svg";
import { useEffect, useState } from "react";
import { facilities } from "../data/facilities_offers";
import { properties_rules } from "../data/properties_rules";
import Calendar from "react-calendar";
import ImageGrid from "../components/ImageGrid/ImageGrid";
import { useNavigate, useParams } from "react-router-dom";
import BookingSummaryCard from "../components/BookingSummaryCard/BookingSummaryCard";
import ImageSlider from "../components/ImageSlider/ImageSlider";
import { formatNumberWithCommas } from "../utils/formatNumberWithCommas.js";
import { useLists } from "../context/ListContext.jsx";

function ListingDetails() {
  const param = useParams();
  const { listings } = useLists();

  console.log("param path = ", param.id);

  const [isVisible, setIsVisible] = useState(false);
  const [isPriceDetailsVisible, setIsPriceDetailsVisible] = useState(false);
  const [reviewsCount, setReviewsCount] = useState(0); // Initialize state for reviewsCount
  const [propertyDetails, setPropertyDetails] = useState([1, 1, 8, 4]); // [guests, bedrooms, beds, bathrooms]
  const navigate = useNavigate();
  const [list, setList] = useState();

  const getListById = (id) => {
    return listings.find((listing) => listing.id === id);
  };

  useEffect(() => {
    setList(getListById(param.id));
    console.log(list);
    // Set a random review count when the component mounts
    setReviewsCount(Math.floor(Math.random() * 6));
    setPropertyDetails([
      Math.floor(Math.random() * 8) + 1,
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 10) + 1,
      Math.floor(Math.random() * 4) + 1,
    ]);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      if (scrollPosition > 2000) {
        setIsPriceDetailsVisible(true);
      } else {
        setIsPriceDetailsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll); // Attach scroll listener
    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup listener
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const originalPrice = Number(list?.price);
  const discountedPrice = Math.floor(originalPrice - originalPrice * 0.1);

  return (
    <>
      {/* section 1 */}
      <section
        id="photos"
        className="xl:px-[160px] sm:px-10  relative flex sm:flex-col flex-col-reverse"
      >
        <h1 className="font-semibold text-[26px] mt-6 sm:px-0 px-6">
          {list?.title}
        </h1>
        {/* Image Grid */}
        <div className="sm:block hidden">
          <ImageGrid property={list} />
        </div>

        <div className="sm:hidden block relative">
          {/* <ImageSlider images={list?.images} heightInPixel="283" /> */}
          {list?.images && list.images.length > 0 ? (
            <ImageSlider images={list.images} heightInPixel="283" />
          ) : (
            <p>No images available</p> // Provide fallback if no images
          )}

          {/* buttons in mobile view */}
          <div className="px-[13px] w-full pt-[14px] pb-[25px] absolute top-0 z-10 flex justify-between">
            <button
              onClick={() => navigate(-1)}
              className="rounded-full  shadow-lg w-[34px] h-[34px] flex justify-center items-center bg-white"
            >
              <img
                className="w-4 scale-90 rotate-180"
                src={arrow_icon}
                alt="arrow icon"
              />
            </button>
            <div className="flex gap-3">
              <button className="rounded-full  shadow-lg w-[34px] h-[34px] flex justify-center items-center bg-white">
                <img
                  className="w-4 scale-90"
                  src={share_icon}
                  alt="share icon"
                />
              </button>
              <button className="rounded-full  shadow-lg w-[34px] h-[34px] flex justify-center items-center bg-white">
                <img
                  className="w-4 scale-90"
                  src={heart_icon}
                  alt="heart icon"
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation bar */}
      <div
        className={`xl:px-[160px] sm:px-10 px-6 ${
          isVisible ? "flex justify-between  sticky top-0 z-10" : "hidden"
        } border-b border-gray-300 bg-white font-semibold transition-transform duration-300`}
      >
        <ul className="flex gap-6 sm:text-base text-sm">
          <li className="pt-[30px] pb-[26px] border-b-4 border-white hover:border-gray-500 cursor-pointer">
            <a href="#photos">Photos</a>
          </li>
          <li className="pt-[30px] pb-[26px] border-b-4 border-white hover:border-gray-500 cursor-pointer">
            <a href="#amenities">Amenities</a>
          </li>
          <li className="pt-[30px] pb-[26px] border-b-4 border-white hover:border-gray-500 cursor-pointer">
            <a href="#review">Reviews</a>
          </li>
          <li className="pt-[30px] pb-[26px] border-b-4 border-white hover:border-gray-500 cursor-pointer">
            <a href="#location">Location</a>
          </li>
        </ul>
        <div
          className={` text-gray-500 ${
            isPriceDetailsVisible
              ? "sm:flex sm:items-center sm:gap-5 hidden"
              : "hidden"
          }`}
        >
          <div>
            <div className="flex gap-1 items-center">
              <span className="line-through ">
                ₹{formatNumberWithCommas(originalPrice)}
              </span>
              <span className="text-black">
                ₹{formatNumberWithCommas(discountedPrice)}
              </span>
              <span className="text-sm">night</span>
            </div>
            <a className="underline cursor-pointer text-sm">
              {reviewsCount === 0
                ? "no reviews yet"
                : reviewsCount + 1 === 1
                ? "1 review"
                : reviewsCount + 1 + " reviews"}
            </a>
          </div>
          <button className="px-10 py-[10px] text-lg bg-[#FF385C] hover:bg-[#FF385C]/90 text-white font-semibold rounded-lg">
            Reserve
          </button>
        </div>
      </div>

      {/* section 2 */}
      <section className="xl:px-[160px] sm:px-10 px-6 flex ">
        <div className="flex-1">
          <div className="sm:py-8 py-2">
            <h1 className="sm:text-[22px] font-semibold">
              Private room in {list?.location}
            </h1>
            <p className="sm:text-lg text-gray-600">
              {`${propertyDetails[0]} guests ${propertyDetails[1]} bedrooms ${propertyDetails[2]} beds ${propertyDetails[3]} bathrooms`}
            </p>
            <a className=" flex  items-center gap-1">
              <img className="w-4 h-4" src={star_icon} alt="star_icon" />
              <span className="underline font-semibold sm:text-lg cursor-pointer">
                {reviewsCount === 0
                  ? "no reviews yet"
                  : reviewsCount + 1 === 1
                  ? "1 review"
                  : reviewsCount + 1 + " reviews"}
              </span>
            </a>
          </div>
          <div className="flex items-center gap-6 py-6 border-t border-gray-300 border-b">
            <img
              className="w-10 h-10 rounded-full"
              src="https://a0.muscache.com/im/pictures/user/9c999b5e-a377-46fc-b0b4-d7aecd62bd29.jpg?im_w=240&im_format=avif"
              alt=""
            />
            <div>
              <h3 className="text-lg font-semibold">Hosted by Gursimran</h3>
              <p className="text-gray-600">3 years hosting</p>
            </div>
          </div>

          <div className="py-8 border-b flex flex-col gap-5 border-gray-300">
            <div className="flex gap-6 items-center">
              <img
                className="w-6 h-6 mx-2"
                src={garden_icon}
                alt="garden_icon"
              />
              <div>
                <h3 className="text-lg font-semibold">Garden view</h3>
                <p className="text-gray-600">
                  Soak up the view during your stay.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-center">
              <img
                className="w-6 h-6 mx-2"
                src={swimming_pool_icon}
                alt="swimming_pool_icon"
              />
              <div>
                <h3 className="text-lg font-semibold">Dive right in</h3>
                <p className="text-gray-600">
                  This is one of the few places in the area with a pool.
                </p>
              </div>
            </div>
          </div>

          <div className="py-8 flex flex-col items-start border-b border-gray-300">
            <p>
              Step into the splendid and picturesque abode, the magnificent
              rustic farmhouse of Colour Bloom, nestled in the heart of the
              verdant and evergreen landscape of Karnal. This haven of
              tranquillity provides the pinnacle of opulence, bursting with hues
              and eternal comfort and convenience. As you approach this
              sanctuary, an ambiance of grandeur and serenity engulfs you,
              setting the tone for your unforgettable stay.
            </p>
            <span>...</span>
            <button className="underline flex gap-2 items-center font-semibold text-lg mt-4">
              Show more
              <img className="w-3" src={arrow_icon} alt="arrow_icon" />
            </button>
          </div>

          <div className="py-8 border-b border-gray-300">
            <h1 className="text-[22px] font-semibold pb-6">
              {"Where you'll sleep"}
            </h1>
            <div className="flex gap-4">
              <div className="flex-1">
                <img
                  className="mb-3 w-full sm:h-[212px] h-[120px] rounded-lg"
                  src="https://a0.muscache.com/im/pictures/miso/Hosting-837315422629442025/original/b7ae8ae8-adc0-4eb8-9885-b88b4ead3c16.jpeg?im_w=720&im_format=avif"
                  alt="bedroom image"
                />
                <h3 className="text-lg font-semibold">Bedroom 1</h3>
                <p>1 king bed, 1 floor mattress</p>
              </div>
              <div className="flex-1">
                <img
                  className="mb-3 w-full sm:h-[212px] h-[120px] rounded-lg"
                  src="https://a0.muscache.com/im/pictures/miso/Hosting-837315422629442025/original/7f47fc1c-3403-4765-a5fc-e02e8f94a476.jpeg?im_w=720&im_format=avif"
                  alt="bedroom image"
                />
                <h3 className="text-lg font-semibold">Bedroom 2</h3>
                <p>1 king bed, 1 floor mattress</p>
              </div>
            </div>
          </div>

          <div id="amenities" className="py-8 border-b border-gray-300">
            <h1 className="text-[22px] font-semibold pb-6">
              What this place offers
            </h1>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-y-3">
              {facilities.map((facility, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <img
                    className="w-6 h-6 mx-2"
                    src={facility.icon}
                    alt={facility.name}
                  />
                  <h3 className="text-lg">{facility.name}</h3>
                </div>
              ))}
            </div>
            <button className="mt-8 mb-4 px-[23px] py-[13px] border border-gray-500 rounded-lg font-semibold hover:bg-gray-100">
              Show all 36 amenities
            </button>
          </div>

          <div className="py-12 border-b border-gray-300">
            <div>
              <h1 className="text-[22px] font-semibold">
                5 nights in Nagla Megha
              </h1>
              <p className="text-gray-500 text-sm">19 Dec 2024 - 24 Dec 2024</p>
            </div>
            <div className="flex gap-6 pt-8">
              <Calendar
                onChange={() => console.log("onChange calendar")}
                value={12}
              />
              <div className="sm:block hidden">
                <Calendar
                  onChange={() => console.log("onChange calendar")}
                  value={12}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:ml-[94px] w-[34%] pt-8 relative sm:block hidden">
          <BookingSummaryCard
            originalPrice={originalPrice}
            discountedPrice={discountedPrice}
          />
        </div>
      </section>

      {/* section 3 */}
      <section
        id="review"
        className="xl:mx-[160px] sm:mx-10 px-6 py-12 border-gray-300 border-b"
      >
        <div className="md:w-[40%] ">
          <div>
            <h1 className="text-[26px] font-semibold">1 review</h1>
            <p className="text-gray-500">
              Average rating will appear after 3 reviews
            </p>
          </div>
          <div className="flex items-center gap-4 mt-8">
            <img
              className="w-12 h-12 rounded-full"
              src="https://a0.muscache.com/im/pictures/user/7ddc6e6e-50ce-42a7-bd74-3c52856e31f5.jpg?im_w=240&im_format=avif"
              alt=""
            />
            <div>
              <h3 className="text-lg font-semibold">Tarini</h3>
              <p className="text-gray-600">5 years on Airbnb</p>
            </div>
          </div>

          <div className="flex gap-3 mt-3">
            <div className="flex gap-[2px]">
              <img className="w-[10px] " src={star_icon} alt="star_icon" />
              <img className="w-[10px] " src={star_icon} alt="star_icon" />
              <img className="w-[10px] " src={star_icon} alt="star_icon" />
              <img className="w-[10px] " src={star_icon} alt="star_icon" />
              <img
                className="w-[10px] opacity-30"
                src={star_icon}
                alt="star_icon"
              />
            </div>
            <span className="font-semibold text-sm">June 2023</span>
          </div>

          <p className="mt-2 mb-2">
            Great place, good aesthetics, good ambience, good food and the best
            part - the happy pool <br />
            The caretaker and his dog (who was named Choudhary - so...
          </p>
          <a href="" className="font-semibold  underline text-lg">
            Show more
          </a>
        </div>
      </section>

      {/* section 4 */}
      <section
        id="location"
        className="xl:mx-[160px] sm:mx-10 px-6 py-12  border-gray-300 border-b"
      >
        <h1 className="text-[26px] font-semibold">Where you’ll be</h1>
        <div className="flex justify-center items-center mt-12 ">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345070136!2d144.95373631590468!3d-37.816279379751755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce840!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sin!4v1692180813642!5m2!1sen!2sin"
            width="100%"
            height="480"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-4">
            Nagla Megha, Haryana, India
          </h3>
          <p>
            Chandigarh, a planned and well-designed scenic city, is the common
            capital of the states of Punjab and Haryana. It is most popularly
            known for its excellent infrastructure, French-style architecture,
            picturesque routes, and of course some of the most famous ancient
            Buddhist stupas. So, while you’re enjoying your luxurious stay at
            this property, here are a few nearby places and activities we
            recommend to make your stay even more memorable...
          </p>
          <button className="underline flex gap-2 items-center font-semibold text-lg mt-4">
            Show more
            <img
              className="w-3"
              src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%20aria-hidden='true'%20role='presentation'%20focusable='false'%20style='display:%20block;%20height:%2012px;%20width:%2012px;%20fill:%20currentcolor;'%3e%3cpath%20d='M5.41.3%204%201.7%2010.3%208%204%2014.3l1.41%201.4%206.6-6.58c.57-.58.6-1.5.1-2.13l-.1-.11z'%3e%3c/path%3e%3c/svg%3e"
              alt="arrow_icon"
            />
          </button>
        </div>
      </section>

      {/* section 5 */}
      <section className="xl:mx-[160px] sm:mx-10 px-6 py-12  border-gray-300 border-b">
        <h1 className="text-[24px] font-semibold">Meet your Host</h1>
        <div className="flex lg:flex-row flex-col gap-12">
          <div className="flex sm:w-[380px] w-full flex-col">
            <div
              className="flex mt-6 mb-8 sm:gap-16 gap-12 items-center  rounded-3xl bg-white  py-6 sm:px-10 px-8"
              style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 8px 2px" }}
            >
              <div className="flex flex-col items-center ">
                <img
                  className="rounded-full sm:w-24 sm:h-24 w-20 h-20 object-cover"
                  src="https://a0.muscache.com/im/pictures/user/9c999b5e-a377-46fc-b0b4-d7aecd62bd29.jpg?im_w=240&im_format=avif 1x"
                  alt=""
                />
                <h2 className="font-semibold sm:text-3xl text-2xl mt-2">
                  Gursimran
                </h2>
                <p>Host</p>
              </div>
              <div className="flex-1">
                <div className="flex flex-col pb-3 border-b border-gray-300">
                  <span className="text-2xl font-semibold ">84</span>
                  <span className="text-xs">Reviews</span>
                </div>
                <div className="flex flex-col py-3 border-b border-gray-300">
                  <span className="text-2xl font-semibold flex items-center gap-2">
                    4.51{" "}
                    <img className="w-4 h-4" src={star_icon} alt="star_icon" />
                  </span>
                  <span className="text-xs">Rating</span>
                </div>
                <div className="flex flex-col pt-3">
                  <span className="text-2xl font-semibold ">3</span>
                  <span className="text-xs">Years hosting</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-center mb-4">
              <img className="w-6 " src={bag_icon} alt="bag_icon" />
              <p>My work: StayVista Explorer</p>
            </div>
            <div className="flex gap-3 mb-8 items-center">
              <img className="w-6 " src={music_icon} alt="music_icon" />
              <p>Favourite song in secondary school: Rock Your Body</p>
            </div>
            <p>
              Howdy fellow adventurers! I’m Gursimran, your mountain host from
              StayVista. With a love for...
            </p>
            <button className="underline flex gap-2 items-center font-semibold text-lg mt-4">
              Show more
              <img
                className="w-3"
                src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%20aria-hidden='true'%20role='presentation'%20focusable='false'%20style='display:%20block;%20height:%2012px;%20width:%2012px;%20fill:%20currentcolor;'%3e%3cpath%20d='M5.41.3%204%201.7%2010.3%208%204%2014.3l1.41%201.4%206.6-6.58c.57-.58.6-1.5.1-2.13l-.1-.11z'%3e%3c/path%3e%3c/svg%3e"
                alt="arrow_icon"
              />
            </button>
          </div>

          <div className="flex-1 xl:mr-12">
            <div className="pt-12">
              <h2 className="text-xl font-semibold">Co-Hosts</h2>
              <div className="flex gap-6 mt-4">
                <div className="flex items-center gap-3">
                  <button className="w-10 h-10 text-sm bg-black text-white flex justify-center items-center font-semibold rounded-full">
                    N
                  </button>
                  <span>Neeraj</span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="w-10 h-10 text-sm bg-black text-white flex justify-center items-center font-semibold rounded-full">
                    R
                  </button>
                  <span>Rohan</span>
                </div>
              </div>
            </div>

            <div className="border-b pb-10 border-gray-300">
              <h2 className="text-xl font-semibold mb-4 mt-7">Host details</h2>
              <p>Response rate: 100%</p>
              <p>Responds within a few hours</p>
              <button className="px-6 rounded-lg mt-8 font-semibold text-lg py-3 bg-black text-white">
                Message Host
              </button>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <img src={Bookmark_icon} className="w-6" alt="Bookmark_icon" />
              <p className="text-[13px]">
                To protect your payment, never transfer money or communicate
                outside of the Airbnb website or app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* section 6 */}
      <section className="xl:px-[160px] sm:px-10 px-6 py-12">
        <h1 className="text-[26px] font-semibold mb-6">Things to know</h1>
        <div className="flex sm:flex-row flex-col gap-8 sm:gap-0">
          <div className="flex flex-col gap-3 text-[17px] flex-1">
            <h2 className="font-semibold">House rules</h2>
            {properties_rules["houseRules"].map((rule, index) => (
              <p key={index}>{rule.detail}</p>
            ))}
            <button className="underline flex gap-2 items-center font-semibold text-lg mt-2">
              Show more
              <img
                className="w-3"
                src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%20aria-hidden='true'%20role='presentation'%20focusable='false'%20style='display:%20block;%20height:%2012px;%20width:%2012px;%20fill:%20currentcolor;'%3e%3cpath%20d='M5.41.3%204%201.7%2010.3%208%204%2014.3l1.41%201.4%206.6-6.58c.57-.58.6-1.5.1-2.13l-.1-.11z'%3e%3c/path%3e%3c/svg%3e"
                alt="arrow_icon"
              />
            </button>
          </div>
          <div className="flex flex-col gap-3 text-[17px] flex-1">
            <h2 className="font-semibold">House rules</h2>
            {properties_rules["safetyAndProperty"].map((rule, index) => (
              <p key={index}>{rule.detail}</p>
            ))}
            <button className="underline flex gap-2 items-center font-semibold text-lg mt-2">
              Show more
              <img
                className="w-3"
                src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%20aria-hidden='true'%20role='presentation'%20focusable='false'%20style='display:%20block;%20height:%2012px;%20width:%2012px;%20fill:%20currentcolor;'%3e%3cpath%20d='M5.41.3%204%201.7%2010.3%208%204%2014.3l1.41%201.4%206.6-6.58c.57-.58.6-1.5.1-2.13l-.1-.11z'%3e%3c/path%3e%3c/svg%3e"
                alt="arrow_icon"
              />
            </button>
          </div>
          <div className="flex flex-col gap-3 text-[17px] flex-1">
            <h2 className="font-semibold">House rules</h2>
            {properties_rules["cancellationPolicy"].map((rule, index) => (
              <p key={index}>{rule.detail}</p>
            ))}
            <button className="underline flex gap-2 items-center font-semibold text-lg mt-2">
              Show more
              <img
                className="w-3"
                src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%20aria-hidden='true'%20role='presentation'%20focusable='false'%20style='display:%20block;%20height:%2012px;%20width:%2012px;%20fill:%20currentcolor;'%3e%3cpath%20d='M5.41.3%204%201.7%2010.3%208%204%2014.3l1.41%201.4%206.6-6.58c.57-.58.6-1.5.1-2.13l-.1-.11z'%3e%3c/path%3e%3c/svg%3e"
                alt="arrow_icon"
              />
            </button>
          </div>
        </div>
      </section>

      {/* bottom bar booking summary */}
      <div className="flex sm:hidden h-20 px-6 bg-white border-t-[1px] border-gray-300 fixed bottom-0 z-20 w-full">
        <div
          className={` text-gray-600 flex justify-between w-full items-center gap-5`}
        >
          <div className="flex flex-col">
            <div className="flex gap-1 items-center sm:text-lg underline">
              <span className="line-through font-semibold">
                ₹{formatNumberWithCommas(originalPrice)}
              </span>
              <span className="text-black font-semibold">
                ₹{formatNumberWithCommas(discountedPrice)}
              </span>
              <span>night</span>
            </div>
            <span className="text-xs text-gray-800">{"5-10 Jan"}</span>
          </div>
          <button className="sm:px-10 px-4 py-[10px] sm:text-lg bg-[#FF385C] hover:bg-[#FF385C]/90 text-white font-semibold rounded-lg">
            Reserve
          </button>
        </div>
      </div>
    </>
  );
}

export default ListingDetails;
