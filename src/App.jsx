import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Card from "./components/Card/Card";
import Home from "./pages/Home";
import ListingDetails from "./pages/ListingDetails";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify's styles

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="/listing-details/:id" element={<ListingDetails />} />
          <Route path="/card" element={<Card />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
