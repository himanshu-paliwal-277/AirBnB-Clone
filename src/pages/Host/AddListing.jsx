import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase"; // Ensure this is your Firebase config file
import { toast } from "react-toastify";

const AddListing = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [images, setImages] = useState([""]); // Array to store image URLs
  const [loading, setLoading] = useState(false);

  const handleAddListing = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !location ||
      !price ||
      !rating ||
      !dateRange ||
      images.some((img) => !img)
    ) {
      alert("Please fill out all fields and provide valid image URLs.");
      return;
    }

    setLoading(true);
    try {
      const hostUid = auth.currentUser?.uid; // Ensure the user is logged in
      await addDoc(collection(db, "listings"), {
        title,
        location,
        price: parseFloat(price),
        rating: parseFloat(rating),
        dateRange,
        images,
        hostUid,
        createdAt: new Date().toISOString(),
      });
      setTitle("");
      setLocation("");
      setPrice("");
      setRating("");
      setDateRange("");
      setImages([""]);
      toast.success("Listing added successfully!");
    } catch (error) {
      console.error("Error adding listing:", error);
      toast.error("Error in adding listing");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...images];
    updatedImages[index] = value;
    setImages(updatedImages);
  };

  const addImageField = () => {
    setImages([...images, ""]);
  };
  const removeImageField = () => {
    if (images.length > 1) {
      setImages(images.slice(0, images.length - 1));
    }
  };

  return (
    <div className="xl:px-40 lg:px-10 sm:px-10 px-6 py-10 flex justify-center">
      <div
        className="bg-sky-200  sm:p-12 p-6 sm:w-[70%] rounded-xl"
        style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)" }}
      >
        <h1 className="text-3xl font-bold mb-8">Add New Listing</h1>
        <form onSubmit={handleAddListing} className="flex flex-col gap-5 ">
          <div>
            <label className="block text-lg font-medium mb-1">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter listing title"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-1">Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter location"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-1">
              Price (in USD):
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter price"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-1">Rating:</label>
            <input
              type="number"
              step="0.01"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter rating (e.g., 4.93)"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-1">
              Date Range:
            </label>
            <input
              type="text"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter date range (e.g., 5–10 Jan)"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-1">Images:</label>
            {images.map((image, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                  placeholder={`Enter image URL ${index + 1}`}
                  required
                />
              </div>
            ))}
            <div className="flex gap-4 ">
              <button
                type="button"
                onClick={addImageField}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Another Image
              </button>
              <button
                type="button"
                onClick={removeImageField}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Remove Last Image
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 mt-8 text-white px-4 py-3 rounded font-medium"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Listing"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
