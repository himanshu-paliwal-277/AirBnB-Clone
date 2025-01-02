import Card from "../components/Card/Card";
import { useFavorites } from "../context/FavoritesContext";
import { useLists } from "../context/ListContext";
import { useEffect, useState } from "react";
import empty_box from "../assets/images/empty-box.png";
import ListingLoader from "../components/Loader/ListingLoader";

const Favorites = () => {
  const { favorites, loading, setLoading } = useFavorites();
  const { listings } = useLists();
  const [filteredListings, setFilteredListings] = useState([]);
  const arr = new Array(8).fill(0);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    window.scrollTo(0, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filteredLists = listings.filter((listing) =>
      favorites.includes(listing.id)
    );
    console.log("Listings : ", listings);
    console.log("Favorites : ", favorites);
    setFilteredListings(filteredLists);
  }, [favorites, listings]);

  return (
    <>
      <div className="xl:px-20 lg:px-10 sm:px-10 px-6">
        <h1 className="text-3xl sm:text-[32px] font-semibold my-10 ">
          Wishlists
        </h1>
        {filteredListings.length === 0 && (
          <div className="flex flex-col items-center w-full justify-center">
            <img className="w-28" src={empty_box} alt="empty_box" />
            <p className="text-xl font-semibold mt-2 mb-20">
              No favorite properties yet.
            </p>
          </div>
        )}
        {loading && (
          <div className="grid xl:grid-cols-4 mb-12 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-2">
            {arr.map((_, index) => (
              <ListingLoader key={index} />
            ))}
          </div>
        )}
        {!loading && (
          <div className="grid xl:grid-cols-4 mb-12 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-2">
            {filteredListings?.length > 0 &&
              filteredListings?.map((property) => (
                <Card key={property.id} {...property} />
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Favorites;
