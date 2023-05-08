import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Products,
  NavBar,
  CustomerLogin,
  CustomerSignUp,
  ForgotPassword,
  BakerLogin,
  BakeryPortal,
  CustomerConfirmEmail,
  Alert,
} from "./Components";
import { commerce } from "./lib/commerce";
import axios from "axios";

function App() {
  //declaring states to manage dynamic data
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [customerData, setCustomerData] = useState({});

  //creating alert management states
  const [alertStatus, setAlertStatus] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertDisplay, setAlertDisplay] = useState("none");

  const fetchProducts = async () => {
    const { data } = await commerce?.products?.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce?.cart?.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item?.cart);
    console.log(cart);
  };

  //defining a function to hide alerts
  function hideAlert() {
    let timeOut = setTimeout(
      () => {
        setAlertDisplay("none");
        clearTimeout(timeOut);
      },
      1000,
      setAlertDisplay
    );
  }

  //defining a function to implement automatic login using customer backend session data
  function isCustomerLoggedIn() {
    //using user session data to retrieve customer data
    fetch("/customer-logged-in")
      .then((response) => response.json())
      .then((customerData) => {
        if (customerData) {
          if (customerData.verified === true) {
            setCustomerData(customerData);
          } else {
            setAlertMessage("Please verify your email address!");
            setAlertStatus(false);
            setAlertDisplay("block");
            setTimeout(() => {hideAlert()}, 5000);
          }
        }
      });
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
    isCustomerLoggedIn();
  }, []);

  return (
    <div>
      {/* <NavBar totalItems={cart?.total_items}/> */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="homePageAlertContainer">
                <Alert display={alertDisplay} requestStatus={alertStatus} alertMessage={alertMessage}/>
              </div>
              <NavBar totalItems={cart?.total_items} />
              <Products products={products} onAddToCart={handleAddToCart} />
            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              <NavBar totalItems={cart?.total_items} />
              <CustomerLogin
                hideAlert={hideAlert}
                alertDisplay={alertDisplay}
                setAlertDisplay={setAlertDisplay}
                alertMessage={alertMessage}
                setAlertMessage={setAlertMessage}
                alertStatus={alertStatus}
                setAlertStatus={setAlertStatus}
                customerData={customerData}
                setCustomerData={setCustomerData}
              />
            </>
          }
        />

        <Route
          path="/sign-up"
          element={
            <>
              <NavBar totalItems={cart?.total_items} />
              <CustomerSignUp
                hideAlert={hideAlert}
                alertDisplay={alertDisplay}
                setAlertDisplay={setAlertDisplay}
                alertMessage={alertMessage}
                setAlertMessage={setAlertMessage}
                alertStatus={alertStatus}
                setAlertStatus={setAlertStatus}
                
              />
            </>
          }
        />

        <Route
          path="/confirm-email/*"
          element={
            <CustomerConfirmEmail
              hideAlert={hideAlert}
              alertDisplay={alertDisplay}
              setAlertDisplay={setAlertDisplay}
              alertMessage={alertMessage}
              setAlertMessage={setAlertMessage}
              alertStatus={alertStatus}
              setAlertStatus={setAlertStatus}
            />
          }
        />

        <Route
          path="/forgot-password"
          element={
            <>
              <NavBar totalItems={cart?.total_items} />
              <ForgotPassword />
            </>
          }
        />

        <Route
          path="/admin-forgot-password"
          element={
            <>
              <NavBar totalItems={cart?.total_items} />
              <ForgotPassword />
            </>
          }
        />
        <Route
          path="/admin-login"
          element={
            <>
              <NavBar totalItems={cart?.total_items} />
              <BakerLogin />
            </>
          }
        />
        <Route
          path="/bakery-portal/*"
          element={
            <>
              <NavBar totalItems={cart?.total_items} />
              <BakeryPortal />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
