import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Card from "../Card/Card";
import { properties } from "../../data/properties";

const CardSection = () => {

  return (
    <div className="px-10 grid grid-cols-4 gap-6 mt-2">
      {properties.map((property) => (
        <Card key={property.id} {...property} />
      ))}
    </div>
  );
};

export default CardSection;
