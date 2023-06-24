import React, { useEffect, useState } from "react";

function CheckoutForm({ customerData, cart, handleSubmit}) {
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

	useEffect(() => {


	}, [])




	return (
		customerData?.id && cart?.id ?
		<form className="checkoutForm" onSubmormt={() => { handleSubmit()}}>
			<div className="checkoutformGridContainer">
			<div className="checkoutFormPaymentContainer">
				<h3 className="checkoutFormTitle">PAYMENT</h3>

				<p>Accepted Cards</p>

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

			
				<button className="paymentButton" disabled={isLoading}>
					{isLoading ? <div className="loader"></div> : "PAY NOW"}
				</button>
			


			
		</form> : null
	)
}
export default CheckoutForm;