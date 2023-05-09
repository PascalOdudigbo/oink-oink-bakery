import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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


function App() {
  //declaring states to manage dynamic data
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [customerData, setCustomerData] = useState({});
  const [bakerData, setBakerData] = useState({});

  //creating alert management states
  const [alertStatus, setAlertStatus] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertDisplay, setAlertDisplay] = useState("none");

  //declarin and initializing navigating function variable
  const navigate = useNavigate();

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
    fetchCart();
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

  //defining a function to implement user logout
  function handleLogout(setIsLoading){
    fetch("/customer-logout", {
        method: "DELETE",
    }).then(() => {
      setIsLoading(false);
      setAlertStatus(true);
      setAlertMessage("Logout successful!");
      setAlertDisplay("block");
      hideAlert()
      customerData?.verified ? setCustomerData({}):  bakerData?.first_name && setBakerData({});
      setTimeout(() => navigate("/"), 1500)
    
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
              <NavBar totalItems={cart?.total_items} customerData={customerData} bakerData={bakerData} handleLogout={handleLogout}/>
              <Products products={products} onAddToCart={handleAddToCart} />
            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              <NavBar totalItems={cart?.total_items} customerData={customerData} bakerData={bakerData} handleLogout={handleLogout}/>
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
              <NavBar totalItems={cart?.total_items} customerData={customerData} bakerData={bakerData} handleLogout={handleLogout}/>
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
              <NavBar totalItems={cart?.total_items} customerData={customerData} bakerData={bakerData} handleLogout={handleLogout}/>
              <ForgotPassword />
            </>
          }
        />

        <Route
          path="/admin-forgot-password"
          element={
            <>
              <NavBar totalItems={cart?.total_items} customerData={customerData} bakerData={bakerData} handleLogout={handleLogout}/>
              <ForgotPassword />
            </>
          }
        />
        <Route
          path="/admin-login"
          element={
            <>
              <NavBar totalItems={cart?.total_items} customerData={customerData} bakerData={bakerData} handleLogout={handleLogout}/>
              <BakerLogin  
                hideAlert={hideAlert}
                alertDisplay={alertDisplay}
                setAlertDisplay={setAlertDisplay}
                alertMessage={alertMessage}
                setAlertMessage={setAlertMessage}
                alertStatus={alertStatus}
                setAlertStatus={setAlertStatus}
                bakerData={bakerData}
                setBakerData={setBakerData}
              />
            </>
          }
        />
        <Route
          path="/bakery-portal/*"
          element={
            <>
              <NavBar totalItems={cart?.total_items} customerData={customerData} bakerData={bakerData} handleLogout={handleLogout}/>
              <BakeryPortal />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
