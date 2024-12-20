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
          className="grid grid-cols-4 grid-rows-2 gap-2 h-[300px] rounded-xl overflow-hidden"
          style={{
            gridTemplateAreas: `
              "main main small1 small2"
              "main main small3 small4"
            `,
          }}
        >
          {/* Main Large Image */}
          <div
            className="overflow-hidden bg-black cursor-pointer"
            style={{ gridArea: "main" }}
          >
            <img
              src={property?.images[0]}
              alt="Main View"
              className="w-full h-full object-cover hover:opacity-80 duration-100"
            />
          </div>
  
          {/* Small Images */}
          {smallImages.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden bg-black cursor-pointer"
              style={{ gridArea: `small${index + 1}` }}
            >
              <img
                src={image}
                alt={`Small Image ${index + 1}`}
                className="w-full h-full object-cover hover:opacity-80 duration-100"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ImageGrid;
  