import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
function MainLayout() {
  return (
    <>
      <div className="">
        <Header />
        <main className="">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default MainLayout;
