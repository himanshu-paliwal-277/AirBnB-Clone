import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Card from "../Card/Card";
import { useLists } from "../../context/ListContext";
import ListingLoader from "../Loader/ListingLoader";

const CardSection = () => {
  const { filteredListings, loading } = useLists();
  const arr = new Array(8).fill(0);
  if (loading) {
    return (
      <div className="sm:px-10 xl:px-[80px] px-6 grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-2">
        {arr.map((_, index) => (
          <ListingLoader key={index} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="sm:px-10 xl:px-[80px] px-6 grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-2">
        {filteredListings?.length === 0 && <p>No properties found.</p>}
        {filteredListings?.length > 0 &&
          filteredListings?.map((property) => <Card key={property.id} {...property} />)}
      </div>
    </>
  );
};

export default CardSection;
