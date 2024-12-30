import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx"; // Correct import with .jsx extension
import { ListProvider } from "./context/ListContext.jsx";
import { FavoritesProvider } from "./context/FavoritesContext.jsx";
import CustomErrorBoundary from "./components/ErrorBoundary/CustomErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ListProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <CustomErrorBoundary>
            <App />
          </CustomErrorBoundary>
        </BrowserRouter>
      </FavoritesProvider>
    </ListProvider>
  </AuthProvider>
);
