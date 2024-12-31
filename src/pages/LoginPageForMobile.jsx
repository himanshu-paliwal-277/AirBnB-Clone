import { useState } from "react";
import SignUpModal from "../components/SignUpModal/SignUpModal";
import LoginModal from "../components/LoginModal/LoginModal";

function LoginPageForMobile() {
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(true);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              setSignUpOpen(true);
            }}
            className="py-2 px-5 border border-gray-400 rounded hover:bg-gray-100"
          >
            Sign Up
          </button>
          <button
            onClick={() => {
              setLoginOpen(true);
            }}
            className="py-2 px-5 border border-gray-400 rounded hover:bg-gray-100"
          >
            Log in
          </button>
        </div>
      </div>

      {/* Sign Up Modal */}
      <SignUpModal isOpen={isSignUpOpen} onClose={() => setSignUpOpen(false)} />

      {/* Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}

export default LoginPageForMobile;
