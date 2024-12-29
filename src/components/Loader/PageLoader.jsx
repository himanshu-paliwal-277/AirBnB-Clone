import ContentLoader from "react-content-loader";

const PageLoader = () => {
  return (
    <ContentLoader
      height={300}
      width="100%" // Adjusted width to fit better
      speed={1} // Slightly faster for smoother animation
      backgroundColor="#f3f4f6"
      foregroundColor="#e5e7eb"
      viewBox="0 0 100% 300"
      //   style={{ paddingInline: "24px", paddingTop: "24px" }}
    >
      {/* Loader skeleton structure */}
      <rect x="0" y="0" rx="12" ry="12" width="100%" height="300" />
    </ContentLoader>
  );
};

export default PageLoader;
