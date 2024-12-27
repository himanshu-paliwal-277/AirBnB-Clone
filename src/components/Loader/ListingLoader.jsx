import ContentLoader from "react-content-loader";

const ListingLoader = () => {
  return (
    <ContentLoader
      height={428}
      width="100%" // Adjusted width to fit better
      speed={1} // Slightly faster for smoother animation
      backgroundColor="#f3f4f6"
      foregroundColor="#e5e7eb"
      viewBox="0 0 100% 428"
      //   style={{ paddingInline: "24px", paddingTop: "24px" }}
    >
      {/* Loader skeleton structure */}
      <rect x="0" y="0" rx="12" ry="12" width="100%" height="300" />
      <rect x="0" y="320" rx="5" ry="5" width="150" height="18" />
      <rect x="260" y="320" rx="5" ry="5" width="80" height="18" />
      <rect x="0" y="350" rx="5" ry="5" width="70" height="15" />
      <rect x="0" y="372" rx="5" ry="5" width="80" height="15" />
      <rect x="0" y="400" rx="5" ry="5" width="120" height="15" />
    </ContentLoader>
  );
};

export default ListingLoader;
