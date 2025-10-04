import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Figures from "./pages/Figures";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import WishlistPage from "./routes/WishlistPage";
import Cart from "./pages/Cart";
import CheckoutPage from "./routes/checkoutPage";
import { Check } from "lucide-react";

function App() {
  const router = createBrowserRouter([
    {
      element: <Home />,
      path: "/",
    },
    {
      element: <Signup />,
      path: "/signup",
    },
    {
      element: <Contact />,
      path: "/contact",
    },
    {
      element: <Figures />,
      path: "/figures",
    },
    {
      element: <Cart />,
      path: "/cart",
    },
    {
      element: <CheckoutPage/>,
      path: "/checkoutpage",
    },
    {
      element: (
        <ProtectedAdminRoute>
          <AdminDashboard />
        </ProtectedAdminRoute>
      ),
      path: "/admindashboard",
    },
    {
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
      path: "/dashboard",
    },
    {
      element: (
        <ProtectedRoute>
          <WishlistPage />
        </ProtectedRoute>
      ),
      path: "/wishlist",
    },
  ]);

  return (
    <div>
      {/* your routes / components */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
