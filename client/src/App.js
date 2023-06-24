import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  Products,
  NavBar,
  CustomerLogin,
  CustomerSignUp,
  ForgotPassword,
  ResetPassword,
  BakerLogin,
  BakeryPortal,
  CustomerConfirmEmail,
  Alert,
  Cart,
  AddressBook,
  Checkout
} from "./Components";
// import { commerce } from "./lib/commerce";
import axios from "axios";

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

  //creating variant option management state
  const [selectedOption, setSelectedOption] = useState({});

  //declarin and initializing navigating function variable
  const navigate = useNavigate();

  //creating states for controlled inputs
  const [cakeColor, setCakeColor] = useState("");
  const [cakeText, setCakeText] = useState("");

  //creating loading state
  const [isLoading, setIsLoading] = useState(false);


  //defining function to get products from the database
  function getProducts() {
    axios.get("/products")
      .then(response => {
        setProducts(response.data);
        // console.log("called")
      })
  };

  //creating function to get customer carts
  function getCarts(id) {
    fetch(`/customer-carts/${id}`)
      .then(response => response.json())
      .then(carts => {
        //if successfully found
        let cartsArray = Array.from(carts)
        //looking for the active cart
        cartsArray?.forEach(cart => {
          if (cart?.active === true) {
            updateCartTotal(cart, id)
            setCart(cart);

          }
        });
      })

  }

  //creating a function to calculate cart total
  function calculateCartTotal(cart) {
    let total = 0;
    //loop through all the cart products
    cart?.line_items?.forEach(lineItem => {
      total += lineItem?.price
    });
    return total
  }

  //creating a function to calculate line item total
  function calculateLineItemPrice(product, selectedOption, quantity = 1) {
    //creating return variable
    let price = 0;

    //if an option was selected
    if (selectedOption?.id) {
      //if the product has an active discount
      if (product?.discount?.name !== "No discount") {
        price = selectedOption?.price - ((product?.discount?.discount_percent / 100) * selectedOption?.price);
        price = price * quantity;
      }
      //if the product doesn't have an active discount
      else {
        price = selectedOption?.price * quantity;
      }
    }
    //if no variant option was selected
    else {
      //if the product has an active discount
      if (product?.discount?.name !== "No discount") {
        price = product?.variant_group?.variant_options[0]?.price - ((product?.discount?.discount_percent / 100) * product?.variant_group?.variant_options[0]?.price);
        price = price * quantity;
      }
      //if the product doesn't have an active discount
      else {
        price = product?.variant_group?.variant_options[0]?.price * quantity;
      }
    }

    //return the calculated price
    return price;

  }

  //creating a function to update cart total
  function updateCartTotal(cart, customerId) {
    axios.patch(`/carts/${cart?.id}`, { total: parseFloat(calculateCartTotal(cart)) })
      .then(response => {
        //if the total is updated successfully get the new cart data
        fetch(`/customer-carts/${customerId}`)
          .then(response => response.json())
          .then(carts => {
            //if successfully found
            let cartsArray = Array.from(carts)
            //looking for the active cart
            cartsArray?.forEach(cart => {
              if (cart?.active === true) {
                setCart(cart)
              }
            });
          })

      })
      .catch(error => {
        if (error?.response) {
          setAlertStatus(false);
          setAlertMessage("Cart total update failed!")
          setAlertDisplay("block");
          hideAlert();
        }
      })
  }

  //creating a function to handle add to cart
  function handleAddToCart(targetProduct, selectedOption, cakeColor = "Any color", cakeText = "No text") {
    setIsLoading(true);
    //if there's no selected option
    if (selectedOption?.id === undefined) {
      selectedOption = targetProduct?.variant_group?.variant_options[0];
    }
    //scroll to top
    window.scrollTo(0, 0);
    //if customer is logged in
    if (customerData?.id) {
      //if customer has a cart
      if (cart?.id) {
        let existingLineItem = {};
        //loop through the cart line items
        cart?.line_items?.forEach(lineItem => {
          //check if the lineItem's product is similar to the product being added
          if (lineItem.product?.id === targetProduct?.id && lineItem?.variant_option?.id === selectedOption?.id && lineItem?.color.toLowerCase() === cakeColor.toLowerCase() && lineItem?.cake_text.toLowerCase() === cakeText.toLowerCase()) {
            existingLineItem = lineItem;
          }
        })

        //if the product exists in the cart
        if (existingLineItem?.id) {
          //increase lineItem quantity
          increaseOrDecreaseLineItemQuantityAndPrice(existingLineItem, existingLineItem?.quantity + 1);
          updateCartTotal(cart)
        }
        //if product doesnt exist in cart
        else {
          //add line-item to cart
          AddLineItemToCart(targetProduct, cart?.id, selectedOption, cakeText, cakeColor);
          updateCartTotal(cart)
        }

      }
      //if customer doesn't have a cart
      else {
        //create the customer cart data
        const cartData = {
          customer_id: customerData?.id,
          total: 0,
          active: true
        }
        //save the data in the database
        axios.post("carts", cartData)
          .then(response => {
            //if the cart was created successfully add the product to it
            AddLineItemToCart(targetProduct, response?.data?.id, selectedOption, cakeText, cakeColor);
            // updateCartTotal();
          })
          .catch(error => {
            if (error?.response) {
              //if product not added successfully
              setAlertStatus(false);
              setAlertMessage("Something went wrong, product not added to cart!");
              setAlertDisplay("block");
              hideAlert();

            }
          });

      }

    }
    else {
      //if customer isn't logged in
      setAlertStatus(false);
      setAlertMessage("Please login!");
      setAlertDisplay("block")
      hideAlert();
      setTimeout(() => navigate("/login"), 2000)
    }

  }

  //creating a function to increase lineItem quantity
  function increaseOrDecreaseLineItemQuantityAndPrice(lineItem, quantity) {
    window.scrollTo(0, 0);
    if (quantity > 0) {
      axios.patch(`line_items/${lineItem?.id}`, {
        quantity: quantity,
        price: calculateLineItemPrice(lineItem?.product, lineItem?.variant_option, quantity)

      })
        .then(response => {
          //if quantity increased successfully
          setIsLoading(false);
          setAlertMessage(lineItem?.quantity < quantity ? "Product quantity increased successfully!" : "Product quantity decreased successfully!")
          setAlertStatus(true)
          setAlertDisplay("block");
          getCarts(customerData?.id);
          hideAlert();
          // setTimeout(()=>{ window.location.reload()}, 1000);
        })
        .catch(error => {
          if (error?.response) {
            //if quantity not increased successfully
            setIsLoading(false);
            setAlertStatus(false);
            setAlertMessage(error?.message);
            setAlertDisplay("block");
            hideAlert();

          }
        })

    }
    else {
      setAlertStatus(false);
      setAlertMessage("Product quantity can't be less than 1!");
      setAlertDisplay("block");
      hideAlert()
    }
  }

  //creating a function to add line item to cart
  function AddLineItemToCart(product, cartId, selectedOption, cakeText, cakeColor) {
    const lineItemData = {
      cart_id: cartId,
      product_id: product?.id,
      quantity: 1,
      variant_option_id: selectedOption?.id,
      color: cakeColor?.trim()?.charAt(0)?.toUpperCase() + cakeColor?.slice(1),
      cake_text: cakeText?.trim()?.charAt(0)?.toUpperCase() + cakeText?.slice(1),
      price: calculateLineItemPrice(product, selectedOption)
    }

    axios.post("/line_items", lineItemData)
      .then(response => {
        //if line item added successfully
        setIsLoading(false);
        setAlertMessage("Product added to cart successfully!")
        setAlertStatus(true)
        setAlertDisplay("block");
        getCarts(customerData?.id);
        hideAlert();
      })
      .catch(error => {
        if (error?.response) {
          //if product not added successfully
          setIsLoading(false);
          setAlertStatus(false);
          setAlertMessage("Product not added to cart!");
          setAlertDisplay("block");
          hideAlert();

        }
      })
  }

  //creating a function ro remove line item from cart
  function removeLineItemFromCart(lineItem) {
    window.scrollTo(0, 0)
    axios.delete(`/line_items/${lineItem?.id}`)
      .then(response => {
        //if deleted successfully
        setAlertStatus(true);
        setAlertMessage("Product removed from cart successfully!");
        getCarts(customerData?.id);
        setAlertDisplay("block");
        hideAlert();
        // setTimeout(()=>{ window.location.reload()}, 1000) 
      })
      .catch(error => {
        if (error?.response) {
          //if delete fails
          setAlertStatus(false);
          setAlertMessage("Product removal failed, please try again!");
          setAlertDisplay("block");
          hideAlert();
        }
      })
  }

  //creating a function to empty cart
  function handleEmptyCart() {
    //loop through all line items
    cart?.line_items?.forEach(lineItem => {
      removeLineItemFromCart(lineItem);
    })
    getCarts();
  }

  //defining a function to hide alerts
  function hideAlert() {
    let timeOut = setTimeout(
      () => {
        setAlertDisplay("none");
        clearTimeout(timeOut);
      },
      1500,
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
            //get customer carts
            getCarts(customerData?.id)
          } else {
            setAlertMessage("Please verify your email address!");
            setAlertStatus(false);
            setAlertDisplay("block");
            setTimeout(() => {
              hideAlert();
            }, 5000);
          }
        }
      });
  }

  //defining a function to implement automatic login using baker backend session data
  function isBakerLoggedIn() {
    //using user session data to retrieve baker data
    fetch("/baker-logged-in")
      .then((response) => response.json())
      .then((BakerData) => {
        if (BakerData) {
          setBakerData(BakerData);
        }
      });
  }

  //defining a function to implement user logout
  function handleLogout(setIsLoading) {
    window.scrollTo(0, 0);
    customerData?.verified
      ? fetch("/customer-logout", {
        method: "DELETE",
      }).then(() => {
        setIsLoading(false);
        setAlertStatus(true);
        setAlertMessage("Logout successful!");
        setAlertDisplay("block");
        setCart({})
        hideAlert();
        setCustomerData({});
        setTimeout(() => navigate("/"), 1500);
      })
      : bakerData?.first_name &&
      fetch("/baker-logout", {
        method: "DELETE",
      }).then(() => {
        setIsLoading(false);
        setAlertStatus(true);
        setAlertMessage("Logout successful!");
        setAlertDisplay("block");
        hideAlert();
        setBakerData({});
        setTimeout(() => navigate("/"), 1500);
      });
  }

  //defining a function to handle product searching
  function handleProductSearch(searchInput) {
    //if the search input is empty reset the data to its original state
    if (searchInput === "") {
      getProducts();
    }
    else {
      const filteredData = products.filter((product) => product?.name.toLowerCase().includes(searchInput));
      setProducts(filteredData)
    }
  }

  useEffect(() => {
    isCustomerLoggedIn();
    isBakerLoggedIn();
    getProducts();
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
                <Alert
                  display={alertDisplay}
                  requestStatus={alertStatus}
                  alertMessage={alertMessage}
                />
              </div>
              <NavBar
                totalItems={cart?.line_items?.length}
                customerData={customerData}
                bakerData={bakerData}
                handleLogout={handleLogout}
              />
              <Products
                products={products}
                handleAddToCart={handleAddToCart}
                handleProductSearch={handleProductSearch}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                cakeColor={cakeColor}
                setCakeColor={setCakeColor}
                cakeText={cakeText}
                setCakeText={setCakeText}
                isLoading={isLoading}
              />

            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              <NavBar
                totalItems={cart?.total_items}
                customerData={customerData}
                bakerData={bakerData}
                handleLogout={handleLogout}
              />
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
                getCarts={getCarts}
              />
            </>
          }
        />

        <Route
          path="/sign-up"
          element={
            <>
              <NavBar
                totalItems={cart?.total_items}
                customerData={customerData}
                bakerData={bakerData}
                handleLogout={handleLogout}
              />
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
              <NavBar
                totalItems={cart?.total_items}
                customerData={customerData}
                bakerData={bakerData}
                handleLogout={handleLogout}
              />
              <ForgotPassword
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
          path="/admin-forgot-password"
          element={
            <>
              <NavBar
                totalItems={cart?.total_items}
                customerData={customerData}
                bakerData={bakerData}
                handleLogout={handleLogout}
              />
              <ForgotPassword
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
          path="/reset-password/*"
          element={
            <ResetPassword
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
          path="/admin-login"
          element={
            <>
              <NavBar
                totalItems={cart?.total_items}
                customerData={customerData}
                bakerData={bakerData}
                handleLogout={handleLogout}
              />
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
              <NavBar
                totalItems={cart?.total_items}
                customerData={customerData}
                bakerData={bakerData}
                handleLogout={handleLogout}
              />
              <BakeryPortal
                setProducts={setProducts}
                bakerData={bakerData}
                alertDisplay={alertDisplay}
                setAlertDisplay={setAlertDisplay}
                alertMessage={alertMessage}
                setAlertMessage={setAlertMessage}
                alertStatus={alertStatus}
                setAlertStatus={setAlertStatus}
                hideAlert={hideAlert}
                getProducts={getProducts}
                products={products}
                handleProductSearch={handleProductSearch}
              />
            </>
          }
        />

        <Route path="/cart/*" element={
          <>
            <div className="homePageAlertContainer">
              <Alert
                display={alertDisplay}
                requestStatus={alertStatus}
                alertMessage={alertMessage}
              />
            </div>

            <NavBar
              totalItems={cart?.line_items?.length}
              customerData={customerData}
              bakerData={bakerData}
              handleLogout={handleLogout}
            />

            <Cart
              cart={cart}
              increaseOrDecreaseLineItemQuantityAndPrice={increaseOrDecreaseLineItemQuantityAndPrice}
              removeLineItemFromCart={removeLineItemFromCart}
              setAlertDisplay={setAlertDisplay}
              setAlertMessage={setAlertMessage}
              setAlertStatus={setAlertStatus}
              hideAlert={hideAlert}
              customerData={customerData}
              getCarts={getCarts}
              handleEmptyCart={handleEmptyCart}
            />
          </>

        } />

        <Route path="/customer/address-book/*" element={
          <>
            <div className="homePageAlertContainer">
              <Alert
                display={alertDisplay}
                requestStatus={alertStatus}
                alertMessage={alertMessage}
              />
            </div>

            <AddressBook
              customerData={customerData}
              handleLogout={handleLogout}
              cart={cart}
              setAlertDisplay={setAlertDisplay}
              setAlertMessage={setAlertMessage}
              setAlertStatus={setAlertStatus}
              hideAlert={hideAlert}
              isCustomerLoggedIn={isCustomerLoggedIn}
            />

          </>

        } />

        <Route path="/customer/checkout/*" element={
          <>
            <div className="homePageAlertContainer">
              <Alert
                display={alertDisplay}
                requestStatus={alertStatus}
                alertMessage={alertMessage}
              />
            </div>
            <NavBar
                totalItems={cart?.line_items?.length}
                customerData={customerData}
                bakerData={bakerData}
                handleLogout={handleLogout}
            />

            <Checkout
              customerData={customerData}
              handleLogout={handleLogout}
              cart={cart}
              setAlertDisplay={setAlertDisplay}
              setAlertMessage={setAlertMessage}
              setAlertStatus={setAlertStatus}
              hideAlert={hideAlert}
              isCustomerLoggedIn={isCustomerLoggedIn}
            />

          </>

        } />
      </Routes>
    </div>
  );
}

export default App;
