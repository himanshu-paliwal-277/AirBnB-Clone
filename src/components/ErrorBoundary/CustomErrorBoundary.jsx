import { ErrorBoundary } from "react-error-boundary";
import warning_image from "../../assets/warning.png";
import { useNavigate } from "react-router-dom";

function CustomErrorBoundaryUI({ error, resetErrorBoundary }) {
  const navigate = useNavigate();
  return (
    <div className="h-[100vh] flex justify-center items-center px-6">
      <div role="alert" className="flex flex-col items-center">
        <img className="w-16" src={warning_image} alt="warning image" />
        <p className="font-semibold text-3xl mt-2">Something went wrong</p>
        <div className="text-gray-600 mt-4">Error: {error?.message}</div>
        <button
          className="px-4 py-2 text-sm rounded-lg text-white font-semibold hover:bg-blue-400 active:bg-blue-500 bg-blue-500 mt-3"
          onClick={resetErrorBoundary}
        >
          Try again
        </button>
        <button
          className="px-4 py-2 text-sm rounded-lg text-white font-semibold hover:bg-blue-400 active:bg-blue-500 bg-blue-500 mt-3"
          onClick={() => navigate(-1)}
        >
          Back to previous page
        </button>
      </div>
    </div>
  );
}

export default function CustomErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      FallbackComponent={CustomErrorBoundaryUI}
      onReset={() => window.location.reload()}
    >
      {children}
    </ErrorBoundary>
  );
}
