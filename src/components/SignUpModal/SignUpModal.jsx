import { useState } from "react";
import Modal from "react-modal";
import { auth, db } from "../../firebase/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import PasswordInput from "../PasswordInput/PasswordInput.jsx";
import { TextField } from "@mui/material";
import cross_icon from "../../assets/icons/cross-icon.svg";

Modal.setAppElement("#root"); // Accessibility

const SignUpModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log(user);
      console.log("Sign-up successful!");

      // Add user details to Firestore
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          username: username,
        });
      }

      // alert("Sign-up successful!");
      toast.success("Sign-up successful!");
      onClose(); // Close the modal after successful sign-up
    } catch (error) {
      // alert(`Error: ${error.message}`);
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
        <form onSubmit={handleSignUp} className="flex flex-col gap-6">
          <TextField
            value={username}
            label="Username"
            variant="outlined"
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="true"
          />
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
            Sign Up
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

export default SignUpModal;
