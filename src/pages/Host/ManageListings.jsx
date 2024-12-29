import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../../firebase/firebase"; // Ensure this is your Firebase config file
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import { toast } from "react-toastify";
import { formatNumberWithCommas } from "../../utils/formatNumberWithCommas";

const ManageListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editListing, setEditListing] = useState(null); // State to hold the listing being edited

  // Fetch listings for the current host
  const fetchListings = async () => {
    try {
      const hostUid = auth.currentUser?.uid; // Ensure user is logged in
      const q = query(
        collection(db, "listings"),
        where("hostUid", "==", hostUid)
      );
      const querySnapshot = await getDocs(q);
      const fetchedListings = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListings(fetchedListings);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  // Delete a listing
  const deleteListing = async (id) => {
    try {
      await deleteDoc(doc(db, "listings", id));
      setListings((prevListings) =>
        prevListings.filter((listing) => listing.id !== id)
      );
      toast.success("Listing deleted successfully!");
    } catch (error) {
      console.error("Error deleting listing:", error);
      toast.error("Error in deleting listing.");
    }
  };

  // Save edited listing
  const saveEditedListing = async () => {
    if (!editListing) return;
    try {
      const { id, ...updatedData } = editListing;
      await updateDoc(doc(db, "listings", id), updatedData);
      setListings((prevListings) =>
        prevListings.map((listing) =>
          listing.id === id ? { id, ...updatedData } : listing
        )
      );
      toast.success("Listing updated successfully!");
      setEditListing(null); // Close the modal
    } catch (error) {
      console.error("Error updating listing:", error);
      toast.error("Error in updating listing.");
    }
  };

  useEffect(() => {
    fetchListings();
  }, []); // Empty dependency array to run once on component mount

  if (loading) {
    return (
      <p className="px-40 font-semibold text-xl py-10">Loading listings...</p>
    );
  }

  async function handleDelete(id) {
    if (confirm("Are you sure you want to delete this listing?")) {
      await deleteListing(id);
    }
  }

  return (
    <div className="xl:px-40 lg:px-10 sm:px-10 px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Manage Listings</h1>
      {listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        <div className="flex flex-col gap-8">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="flex sm:flex-row flex-col justify-between sm:items-center sm:p-4 overflow-hidden rounded-xl"
              style={{ boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)" }}
            >
              <div className="flex sm:flex-row flex-col sm:gap-0 gap-5 sm:items-center w-full">
                {/* Image slider */}
                <div className="lg:w-[350px] sm:w-[300px] w-full  sm:rounded-lg overflow-hidden">
                  <ImageSlider images={listing?.images} heightInPixel={"220"} />
                </div>
                {/* Listing details */}
                <div className="flex-1 sm:px-0 px-5 sm:ml-10">
                  <h2 className="text-2xl font-semibold mb-2">
                    {listing.title}
                  </h2>
                  <p className="text-lg">Location: {listing?.location}</p>
                  <p className="text-lg">
                    Price: ₹{formatNumberWithCommas(Number(listing?.price))}
                  </p>
                  <p className="text-lg">Rating: {listing?.rating}</p>
                  <p className="text-lg">Date Range: {listing?.dateRange}</p>
                </div>
              </div>
              {/* Edit and Delete buttons */}
              <div className="flex lg:flex-row sm:p-0 p-5 flex-col gap-4">
                <button
                  onClick={() => setEditListing(listing)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(listing.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editListing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white rounded-lg sm:w-[500px] w-[85%] ">
            <h2 className="text-2xl font-bold mb-4 sm:px-8 px-6 pt-6">Edit Listing</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveEditedListing();
              }}
              className="h-[480px] overflow-y-auto sm:px-8 px-6"
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Title:</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editListing.title}
                  onChange={(e) =>
                    setEditListing((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Location:
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editListing.location}
                  onChange={(e) =>
                    setEditListing((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Price:</label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2"
                  value={editListing.price}
                  onChange={(e) =>
                    setEditListing((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Rating</label>
                <input
                  type="number"
                  name="rating"
                  value={editListing.rating}
                  onChange={(e) =>
                    setEditListing((prev) => ({
                      ...prev,
                      rating: e.target.value,
                    }))
                  }
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Date Range</label>
                <input
                  type="text"
                  name="dateRange"
                  value={editListing.dateRange}
                  onChange={(e) =>
                    setEditListing((prev) => ({
                      ...prev,
                      dateRange: e.target.value,
                    }))
                  }
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Images</label>
                {editListing?.images.map((image, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      name={`images[${index}]`}
                      value={image}
                      onChange={(e) => {
                        const updatedImages = [...editListing.images];
                        updatedImages[index] = e.target.value;
                        setEditListing((prev) => ({
                          ...prev,
                          images: updatedImages,
                        }));
                      }}
                      className="w-full border px-3 py-2 rounded mb-2"
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-4 pb-6 pt-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditListing(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageListings;
