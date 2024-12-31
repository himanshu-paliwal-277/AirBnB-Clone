import Lottie from "lottie-react";
import animationData from "../assets/animation/Animation - 1735613418813.json";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="flex flex-col items-center mb-20">
        <Lottie
          animationData={animationData}
          style={{ width: "300px", height: "300px" }}
        />
        <h1 className="text-2xl font-semibold mb-2">Booking Successful!</h1>
        <p className="text-center px-6">
          Your room has been booked successfully. Thank you!
        </p>
        <button className="underline mt-1" onClick={() => navigate("/")}>
          Go back to homepage
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
