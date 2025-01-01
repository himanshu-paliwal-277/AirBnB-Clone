import { useState } from "react";
import Modal from "react-modal";
import { auth, db } from "../../firebase/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import PasswordInput from "../PasswordInput/PasswordInput.jsx";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import cross_icon from "../../assets/icons/cross-icon.svg";
import { motion } from "framer-motion"; // Import motion from framer-motion

Modal.setAppElement("#root"); // Accessibility

const SignUpModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setUsername(username.trim());
      setEmail(email.trim());
      setPassword(password.trim());
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
          role: role,
        });
      }

      toast.success("Sign-up successful!");
      onClose();
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="w-96 mx-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30"
    >
      <motion.div
        initial={{ y: "100%", opacity: 0 }} // Start from the bottom with 0 opacity
        animate={{ y: 0, opacity: 1 }} // Move to the normal position with full opacity
        exit={{ y: "100%", opacity: 0 }} // Exit animation (reverse)
        transition={{
          type: "spring",
          stiffness: 400, // Lower stiffness for smoother animation
          damping: 40, // Higher damping to reduce overshoot
          mass: 1, // Adding mass for more fluid motion
        }}
        className="bg-white rounded-lg shadow-lg p-6 relative"
      >
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

          {/* Role Selection Dropdown */}
          <FormControl fullWidth required>
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              variant="outlined"
              label="Role"
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="host">Host</MenuItem>
            </Select>
          </FormControl>

          <button
            type="submit"
            className="bg-[#e41c59] text-white py-3 font-semibold rounded hover:bg-[#e41c59]/90 active:bg-[#e41c59]"
          >
            Sign Up
          </button>
        </form>
        <button
          onClick={() => {
            onClose(); // Close modal
          }}
          className="absolute hover:bg-gray-200 p-2 rounded-full top-4 left-4"
        >
          <img className="w-4" src={cross_icon} alt="cross_icon" />
        </button>
      </motion.div>
    </Modal>
  );
};

export default SignUpModal;
