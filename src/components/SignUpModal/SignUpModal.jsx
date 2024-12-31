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

Modal.setAppElement("#root"); // Accessibility

const SignUpModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password
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
