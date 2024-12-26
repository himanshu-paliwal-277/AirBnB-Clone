import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Card from "../Card/Card";
import { properties } from "../../data/properties";

const CardSection = () => {

  return (
    <div className="sm:px-10 xl:px-[80px] px-6 grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-2">
      {properties.map((property) => (
        <Card key={property.id} {...property} />
      ))}
    </div>
  );
};

export default CardSection;
