import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx"; // Correct import with .jsx extension
import { ListProvider } from "./context/ListContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ListProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ListProvider>
  </AuthProvider>
);
