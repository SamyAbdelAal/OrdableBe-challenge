import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import CartComponent from "./components/CartComponent";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import MainContainer from "./pages/MainContainer";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import FailurePayment from "./pages/FailurePayment";
import SuccessPayment from "./pages/SuccessPayment";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute.js";
import AdminDashboard from "./pages/AdminDashboard";
function App() {
  return (
    <Router>
      <MainContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/" element={<Products />} />
          <Route path="/products/:productID" element={<ProductDetail />} />
          <Route path="/cart" element={<CartComponent />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-success" element={<SuccessPayment />} />
          <Route path="/payment-failure" element={<FailurePayment />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MainContainer>
    </Router>
  );
}

export default App;
