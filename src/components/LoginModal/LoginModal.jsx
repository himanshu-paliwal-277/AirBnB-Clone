import { useState } from "react";
import Modal from "react-modal";
import { auth } from "../../firebase/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import PasswordInput from "../PasswordInput/PasswordInput.jsx";
import cross_icon from "../../assets/icons/cross-icon.svg";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root"); // Accessibility

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setEmail(email.trim());
      setPassword(password.trim());
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      console.log("Login successful!");
      onClose(); // Close the modal after successful login

      navigate("/host/dashboard");
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="w-96 mx-auto bg-white rounded-lg shadow-lg p-6"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30"
    >
      <div className="relative">
        <h2 className="text-xl font-semibold mb-8 text-center">Welcome</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <TextField
            value={email}
            label="Email"
            variant="outlined"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="true"
          />
          <PasswordInput password={password} setPassword={setPassword} />
          <button
            type="submit"
            className="bg-[#e41c59] text-white py-3 font-semibold rounded hover:bg-opacity-90"
          >
            Log in
          </button>
        </form>
        <button
          onClick={onClose}
          className="absolute hover:bg-gray-200 p-2 rounded-full top-0 left-0"
        >
          <img className="w-4" src={cross_icon} alt="cross_icon" />
        </button>
      </div>
    </Modal>
  );
};

export default LoginModal;
