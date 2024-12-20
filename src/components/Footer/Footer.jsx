import { useState } from "react";
import arrowIcon from "../../assets/icons/arrow.svg";
import worldIcon from "../../assets/icons/world-icon.svg";
import facebookIcon from "../../assets/icons/facebook-icon.svg";
import twitterIcon from "../../assets/icons/twitter-icon.svg";
import instagramIcon from "../../assets/icons/instagram-icon.svg";
import { useLocation } from "react-router-dom";

const popularDestinations = [
  { location: "Canmore", type: "Pet-friendly rentals" },
  { location: "Benalmádena", type: "Beach house rentals" },
  { location: "Marbella", type: "Beachfront rentals" },
  { location: "Mijas", type: "House rentals" },
  { location: "Prescott", type: "Cottage rentals" },
  { location: "Scottsdale", type: "Apartment rentals" },
  { location: "Tucson", type: "Apartment rentals" },
  { location: "Jasper", type: "Cabin rentals" },
  { location: "Mountain View", type: "Pet-friendly rentals" },
  { location: "Devonport", type: "Cottage rentals" },
  { location: "Mallacoota", type: "Pet-friendly rentals" },
  { location: "Ibiza", type: "Holiday rentals" },
  { location: "Anaheim", type: "House rentals" },
  { location: "Monterey", type: "Flat rentals" },
  { location: "Paso Robles", type: "House rentals" },
  { location: "Santa Barbara", type: "Beach house rentals" },
  { location: "Sonoma", type: "Beach house rentals" },
];

const footerLinks = [
  {
    title: "Support",
    links: [
      "Help Centre",
      "AirCover",
      "Anti-discrimination",
      "Disability support",
      "Cancellation options",
      "Report neighbourhood concern",
    ],
  },
  {
    title: "Hosting",
    links: [
      "Airbnb your home",
      "AirCover for Hosts",
      "Hosting resources",
      "Community forum",
      "Hosting responsibly",
      "Join a free Hosting class",
      "Find a co‑host",
    ],
  },
  {
    title: "Airbnb",
    links: [
      "Newsroom",
      "New features",
      "Careers",
      "Investors",
      "Airbnb.org emergency stays",
    ],
  },
];

const tabLabels = [
  "Popular",
  "Arts & culture",
  "Outdoors",
  "Mountains",
  "Beach",
  "Unique stays",
  "Categories",
  "Things to do",
];

function Footer() {
  const [activeTab, setActiveTab] = useState(1);
  const path = useLocation();

  // Helper function for tab classes
  const getTabClasses = (index) =>
    `py-2 mx-2 ${
      activeTab === index
        ? "border-b-2 border-gray-500 opacity-100"
        : "opacity-70"
    }`;

  return (
    <footer className="bg-[#f7f7f7]">
      {/* Inspiration Section */}
      <div className={`border-b border-gray-300 ${path.pathname === "/listing-details" ? "px-[72px]" : "px-10"} py-10`}>
        <h1 className="mb-4 text-2xl font-semibold">
          Inspiration for future getaways
        </h1>

        {/* Tabs */}
        <div className="flex border-b border-gray-300">
          {tabLabels.map((label, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index + 1)}
              className={getTabClasses(index + 1)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Popular Destinations */}
        <div className="grid grid-cols-6 gap-6 pt-8">
          {popularDestinations.map((destination, index) => (
            <div key={index} className="flex flex-col cursor-pointer">
              <p className="font-semibold opacity-80 " style={{lineHeight: "1"}}>{destination.location}</p>
              <p className="text-gray-500">{destination.type}</p>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <button className="hover:underline font-semibold">Show more</button>
            <img src={arrowIcon} className="w-3 h-3 rotate-90" alt="arrow icon" />
          </div>
        </div>
      </div>

      {/* Footer Links Section */}
      <div className={`${path.pathname === "/listing-details" ? "px-[72px]" : "px-10"}`}>
        <div className="flex border-b border-gray-300">
          {footerLinks.map((section, index) => (
            <div key={index} className="py-12 flex-1">
              <span className="font-semibold">{section.title}</span>
              <div className="flex flex-col gap-2 mt-2">
                {section.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    className="hover:underline cursor-pointer"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="py-6 flex justify-between">
          <div className="flex items-center gap-3">
            <p>© 2024 Airbnb, Inc.</p>
            <ul className="flex items-center gap-3">
              <li>
                <a className="hover:underline cursor-pointer">Privacy</a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer">Terms</a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer">Sitemap</a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer">Company details</a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img src={worldIcon} className="w-4 h-4" alt="world icon" />
              <a className="hover:underline cursor-pointer">English (IN)</a>
            </div>
            <a className="hover:underline cursor-pointer">₹ INR</a>
            <div className="flex gap-4 ml-2">
              <img
                src={facebookIcon}
                className="w-5 h-5 cursor-pointer"
                alt="facebook icon"
              />
              <img
                src={twitterIcon}
                className="w-5 h-5 cursor-pointer"
                alt="twitter icon"
              />
              <img
                src={instagramIcon}
                className="w-5 h-5 cursor-pointer"
                alt="instagram icon"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
