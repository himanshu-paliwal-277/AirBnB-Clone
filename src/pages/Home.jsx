import { useEffect } from "react";
import CardSection from "../components/CardSection/CardSection";

function Home() {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <>
      <CardSection />
    </>
  );
}

export default Home;
