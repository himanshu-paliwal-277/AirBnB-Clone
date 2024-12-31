import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebase.js";
import { useNavigate } from "react-router-dom";


function Profile() {
  const { currentUser, updateUserProfile } = useAuth(); // Access updateUserProfile
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    role: currentUser?.role || "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Reset form data to default values when modal opens
  useEffect(() => {
    if (isEditModalOpen) {
      setFormData({
        username: currentUser?.username || "",
        email: currentUser?.email || "",
        role: currentUser?.role || "",
      });
    }
  }, [isEditModalOpen, currentUser]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isSuccess = await updateUserProfile({
      username: formData.username,
      email: formData.email,
      role: formData.role,
    });

    setLoading(false);
    if (isSuccess) {
      toast.success("Profile updated successfully!");
      setIsEditModalOpen(false);
    } else {
      toast.error("Failed to update profile.");
    }
  };

  async function handleLogout() {
      try {
        await auth.signOut();
        console.log("Logout successful!");
        navigate("/");
        toast.success("Logout successful!");
      } catch (error) {
        console.error(error);
        toast.error("Error in log out");
      }
    }

  return (
    <>
      <div className="xl:px-20 lg:px-10 sm:px-10 px-6">
        <div className="flex sm:flex-row flex-col gap-20 my-12 xl:px-20">
          <div
            className="bg-white rounded-xl p-8 flex flex-col items-center"
            style={{ boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)" }}
          >
            <div
              className={`flex items-center bg-black justify-center text-white w-20 h-20 text-5xl font-semibold rounded-full`}
            >
              <span>{currentUser && currentUser.username.slice(0, 1)}</span>
            </div>
            <h1 className="text-3xl font-semibold mt-2">
              {currentUser.username.split(" ")[0]}
            </h1>
            <span className="text-sm mt-1">
              {currentUser.role === "user" ? "Guest" : currentUser.role}
            </span>
          </div>
          <div className="flex flex-col items-start gap-5">
            <h1 className="font-semibold text-3xl">
              About {currentUser.username}
            </h1>
            <div className="flex flex-col gap-1">
              <div className="flex">
                <p className="w-24 font-semibold">User name: </p>
                <p>{currentUser.username}</p>
              </div>
              <div className="flex">
                <p className="w-24 font-semibold">Email: </p>
                <p>{currentUser.email}</p>
              </div>
              <div className="flex">
                <p className="w-24 font-semibold">Role: </p>
                <p>
                  {currentUser.role === "user" ? "Guest" : currentUser.role}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="border border-black rounded px-3 py-1 text-black hover:bg-gray-200"
            >
              Edit profile
            </button>
            <button
              onClick={() => navigate("/host/dashboard/")}
              className={`${currentUser.role === "host" ? "" : "hidden"} border sm:hidden border-black rounded px-3 py-1 text-black hover:bg-gray-200`}
            >
              Host Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="border sm:hidden mt-10 mb-10 w-full block border-black rounded-lg font-semibold px-3 py-2 text-black hover:bg-gray-200"
            >
              Log out
            </button>
          </div>
        </div>
      </div>

      {/* Edit profile modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        className="sm:w-96 w-[340px] mx-auto bg-white rounded-lg shadow-lg p-6"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30"
        shouldCloseOnOverlayClick={false}
      >
        <div className="relative">
          <h2 className="text-xl font-semibold mb-6 text-center">
            Edit Your Profile
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Username:
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Role:</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="user">Guest</option>
                <option value="host">Host</option>
              </select>
            </div>
            <div className="flex gap-5 mt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>
              <button
                type="button"
                className="w-full bg-gray-300 text-black py-2 rounded hover:bg-gray-400"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default Profile;
