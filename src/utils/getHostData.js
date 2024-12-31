import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getHostData = async (hostUid) => {
  try {
    // Reference the specific document in the users collection using the hostUid
    const userDocRef = doc(db, "Users", hostUid);

    // Fetch the document
    const userDoc = await getDoc(userDocRef);

    // Check if the document exists
    if (userDoc.exists()) {
      console.log("Host Data:", userDoc.data());
      return userDoc.data();
    } else {
      console.log("No host found with the given UID.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching host data:", error.message);
    throw error;
  }
};
