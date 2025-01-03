import { useEffect } from "react";
import CardSection from "../components/CardSection/CardSection";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import { useLists } from "../context/ListContext";

function Home() {
  const { fetchFavorites, setFavorites } = useFavorites();
  const { currentUser } = useAuth();
  const { setLoading } = useLists();

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  useEffect(() => {
    console.log("fetching favorites");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    if (currentUser) {
      // Fetch favorites when user logs in
      fetchFavorites();
    } else {
      // Clear favorites when user logs out
      setFavorites([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <>
      <CardSection />
    </>
  );
}

export default Home;
