import Card from "../components/Card/Card";
import { useFavorites } from "../context/FavoritesContext";
import { useLists } from "../context/ListContext";
import { useEffect } from "react";
import { useState } from "react";

const Favorites = () => {
  const { favorites, loading } = useFavorites();
  const { listings } = useLists();
  const [filteredListings, setFilteredListings] = useState([]);

  useEffect(() => {
    const filteredLists = listings.filter((listing) =>
      favorites.includes(listing.id)
    );
    console.log("Listings : ", listings);
    console.log("Favorites : ", favorites);
    setFilteredListings(filteredLists);
  }, [favorites, listings]);

  if (loading) {
    return <div>Loading favorites...</div>;
  }

  return (
    <>
      <div className="xl:px-20 lg:px-10 sm:px-10 px-6">
        <h1 className="text-2xl sm:text-[32px] font-semibold my-10">Wishlists</h1>
        <div className="grid xl:grid-cols-4 mb-28 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-2">
          {filteredListings.length > 0 ? (
            filteredListings?.map((property) => (
              <Card key={property.id} {...property} />
              // <p key={propertyId}>{propertyId}</p>
            ))
          ) : (
            <p>No favorite properties yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Favorites;
