import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CheckoutForm({ customerData, cart, getCarts, setAlertDisplay, setAlertStatus, setAlertMessage, hideAlert, isCustomerLoggedIn }) {
	//creating loading state
	const [isLoading, setIsLoading] = useState(false);

	//creating form dynamic states
	const [nameOnCard, setNameOnCard] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [expMonth, setExpMonth] = useState("");
	const [cvv, setCvv] = useState("");
	const [expYear, setExpYear] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [zip, setZip] = useState("");
	const [region, setRegion] = useState("");

	//creating states for dynamic data
	const [targetAddress, setTargetAddress] = useState({});

	//creating navigation variable function
	const navigate = useNavigate();

	//creating a function to to handle creating a stripe customer
	function createStripeCustomer(){
		axios.post("/stripe_customers", {customer_id: customerData?.id})
		.then(stripeCustomer => {

		})
		.catch(err => {
			console.log(err)
		})
	}
	// console.log(customerData)

	//creating a function to deactivate the cart
	function deactivateCart(){
		axios.patch(`/carts/${cart?.id}`, {active: false})
		.then(cartData => {
			getCarts();
		})
		.catch(err => {
			if(err.response){
				setIsLoading(false);
                setAlertMessage(err.response.data.error);
                setAlertStatus(false);
                setAlertDisplay("block");
                hideAlert();
			}
		})
	}

	//creating a function to handle placing the order
	function handlePlacingOrder(e){
		e.preventDefault();
		setIsLoading(true);

		//if stripe customer hasn't been created do that
		if(customerData?.stripe_customer?.id){
			//do nothing
		}
		else{
			createStripeCustomer();
		}

		//creating the data object to be sent to the backend
		const orderData = {
			cart_id: cart?.id,
			customer_id: customerData?.id, 
			status: "Unprocessed", 
			customer_address_id: targetAddress?.id, 
			credit_card_number: cardNumber, 
			credit_card_exp_month: expMonth, 
			credit_card_exp_year: expYear, 
			credit_card_cvv: cvv, 
			billing_city: city, 
			billing_line1: address, 
			billing_region: region, 
			billing_postal_code: zip, 
			billing_name: nameOnCard, 
			billing_email: email
		}

		// starting the post request
		axios.post("/orders", orderData)
		.then(order => {
			//if order payment is successful
			setIsLoading(false);
			setAlertMessage("Order placed successfully!")
			setAlertStatus(true);
			setAlertDisplay("block");
			hideAlert();
			deactivateCart();

			//send invoice email here
		})
		.catch(err => {
			console.log(err)
		})

	}

	useEffect(() => {


	}, [])




	return (
		customerData?.customer_addresses?.length > 0 ?
			<form className="checkoutForm" onSubmit={handlePlacingOrder}>
				<div className="checkoutformGridContainer">
					<div className="checkoutFormPaymentContainer">
						<h3 className="checkoutFormTitle">PAYMENT</h3>
						<div className="checkoutFormAcceptedCardsTextAndIconsContainer">
							<p className="checkoutFormAcceptedCardsText">Accepted Cards</p>
							<div className="checkoutFormAcceptedCardsIconsContainer">
								<i class="fa fa-cc-visa" style={{color: "navy"}}></i>
								<i class="fa fa-cc-amex" style={{color:"blue"}}></i>
								<i class="fa fa-cc-mastercard" style={{color:"red"}}></i>
								<i class="fa fa-cc-discover" style={{color:"orange"}}></i>
							</div>
						</div>

						<div className="checkoutFormTextAndInputContainer">
							<p className="checkoutFormText">Name on Card</p>
							<input className="checkoutFormInput"
								required
								name="cardname"
								placeholder={`${customerData?.first_name} ${customerData?.last_name}`}
								value={nameOnCard}
								onChange={(e) => setNameOnCard(e.target.value)}
							/>
						</div>

						<div className="checkoutFormTextAndInputContainer">
							<p className="checkoutFormText">Credit card number</p>
							<input className="checkoutFormInput"
								required
								name="cardnumber"
								placeholder="1111-2222-3333-4444"
								value={cardNumber}
								onChange={(e) => setCardNumber(e.target.value)}
							/>
						</div>

						<div className="checkoutFormTextAndInputContainer">
							<p className="checkoutFormText">Exp Month</p>
							<input className="checkoutFormInput"
								required
								name="expmonth"
								placeholder="12"
								value={expMonth}
								onChange={(e) => setExpMonth(e.target.value)}
							/>
						</div>

						<div className="checkoutFormTextAndInputContainer">
							<p className="checkoutFormText">CVV</p>
							<input className="checkoutFormInput"
								required
								name="cvv" placeholder="352"
								value={cvv}
								onChange={(e) => setCvv(e.target.value)}
							/>
						</div>

						<div className="checkoutFormTextAndInputContainer">
							<p className="checkoutFormText">Exp Year</p>
							<input className="checkoutFormInput"
								required
								name="expyear"
								placeholder="2030"
								value={expYear}
								onChange={(e) => setExpYear(e.target.value)}
							/>
						</div>

					</div>

					<div className="checkoutFormBillingAddressContainer">
						<h3 className="checkoutFormTitle">BILLING ADDRESS</h3>

						<div className="checkoutFormBillingAddressDeliveryAddressTextAndDropdownContainer">
							<p className="deliveryAddressText">Delivery Address</p>
	
							<div className="checkoutFormBillingAddressDeliveryAddressDropdownContainer">

								<button className="checkoutFormBillingAddressDeliveryAddressDropdownBtn">{
									targetAddress ?.id ? targetAddress?.address : "Select Address"
								}</button>

								<div className='checkoutFormBillingAddressDeliveryAddressDropdownItemsContainer'>

									{
										customerData?.customer_addresses?.map(address =>
											<button key={customerData?.customer_addresses?.indexOf(address)} className="checkoutFormBillingAddressDeliveryAddressDropdownItem"
												onClick={(e) => {
													e.preventDefault();
													setTargetAddress(address)
													setAddress(address?.address)
													setCity(address?.city)
													setRegion(address?.region)
													
												}}>{address?.address}
											</button>
										)
									}

								</div>

							</div>

							

						</div>
						<div className="checkoutFormTextAndInputContainer">
							<p className="checkoutFormText">Email</p>
							<input className="checkoutFormInput"
								required
								type="email"
								name="email"
								placeholder={`${customerData?.email}`}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<div className="checkoutFormTextAndInputContainer">
							<p className="checkoutFormText">Address</p>
							<input className="checkoutFormInput"
								required
								name="address"
								placeholder={customerData?.customer_addresses[0]?.address}
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
						</div>

						<div className="checkoutFormTextAndInputContainer">
							<p className="checkoutFormText">City</p>
							<input className="checkoutFormInput"
								required
								name="city"
								placeholder={customerData?.customer_addresses[0]?.city}
								value={city}
								onChange={(e) => setCity(e.target.value)}
							/>
						</div>

						<div className="checkoutFormTextAndInputContainer">
							<p className="checkoutFormText">Zip</p>
							<input className="checkoutFormInput"
								required
								name="zip"
								placeholder="00000"
								value={zip}
								onChange={(e) => setZip(e.target.value)}
							/>
						</div>

						<div className="checkoutFormTextAndInputContainer">
							<p className="checkoutFormText">Region</p>
							<input className="checkoutFormInput"
								required
								name="region"
								placeholder={customerData?.customer_addresses[0]?.region}
								value={region}
								onChange={(e) => setRegion(e.target.value)}
							/>
						</div>

					</div>
				</div>


				<button type="submit" className="paymentButton" >
					{isLoading ? <div className="loader"></div> : "PAY NOW"}
				</button>




			</form> : null 
			
	)
}
export default CheckoutForm;