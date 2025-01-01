import { motion } from "framer-motion";

function ImageGrid({ property }) {
  const smallImages = [
    property?.images[1],
    property?.images[2],
    property?.images[3],
    property?.images[4],
  ];

  return (
    <div className="pt-6">
      <div
        className="grid grid-cols-4 grid-rows-2 gap-2 xl:h-[300px] lg:h-[472px] sm:h-[344px] rounded-xl overflow-hidden"
        style={{
          gridTemplateAreas: `
            "main main small1 small2"
            "main main small3 small4"
          `,
        }}
      >
        {/* Main Large Image */}
        <motion.div
          className="overflow-hidden bg-black cursor-pointer"
          style={{ gridArea: "main" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={property?.images[0]}
            alt="Main View"
            className="w-full h-full object-cover hover:opacity-80 duration-100"
          />
        </motion.div>

        {/* Small Images */}
        {smallImages.map((image, index) => (
          <motion.div
            key={index}
            className="overflow-hidden bg-black cursor-pointer"
            style={{ gridArea: `small${index + 1}` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }} // Stagger the animations
          >
            <img
              src={image}
              alt={`Small Image ${index + 1}`}
              className="w-full h-full object-cover hover:opacity-80 duration-100"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ImageGrid;
