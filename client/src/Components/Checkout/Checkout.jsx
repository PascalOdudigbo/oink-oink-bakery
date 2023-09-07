import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillCartCheckFill } from "react-icons/bs";
import { Stepper } from 'react-form-stepper';
import { IconContext } from "react-icons/lib";
import { CheckoutForm } from "../../Components";


function Checkout({ customerData, cart, getCarts, setAlertDisplay, setAlertStatus, setAlertMessage, hideAlert, isCustomerLoggedIn }) {

    //declaring and initializing navigate variable function
    const navigate = useNavigate();

    //creating state to hold title size
    const [titleSize, setTitleSize] = useState("30px");

    //creating state variables to handle active step
    const [activeStep, setActiveStep] = useState(0);

    //creating the stepper steps initializer 
    const steps = [
        { label: 'Delivery details' },
        { label: 'Payment method' },
        { label: 'Payment' },
    ];

    //creating function to handle component display based on active step 
    function getSectionComponent() {
        switch (activeStep) {
            case 0: return <>HELLO !</>;
            case 1: return <>HELLO 2</>;
            case 2: return <CheckoutForm
                customerData={customerData}
                cart={cart}
                getCarts={getCarts}
                setAlertDisplay={setAlertDisplay}
                setAlertMessage={setAlertMessage}
                setAlertStatus={setAlertStatus}
                hideAlert={hideAlert}
                isCustomerLoggedIn={isCustomerLoggedIn}
            />;
            default: return null;
        }
    }

    useEffect(() => {
        isCustomerLoggedIn();
        setTitleSize(getComputedStyle(document?.getElementsByClassName("checkoutPageTitle")[0])?.fontSize);
    }, [titleSize])




    return (
        <div className="checkoutContainer" style={{ height: `calc(100vh - ${100 * 130 / window.innerHeight}vh)` }}>
            <div className="checkoutPageTitleContainer">
                <h1 className="checkoutPageTitle">CHECKOUT</h1>
                <IconContext.Provider value={{
                    //make the icon size the size of the elements text - 6px
                    size: `calc(${titleSize} - 6px)`
                }}>
                    <BsFillCartCheckFill />
                </IconContext.Provider>
            </div>

            <div className="checkoutPageStepperContainer">
                <Stepper className="checkoutPageStepper"
                    steps={steps}
                    activeStep={activeStep}
                    connectorStateColors={true}

                    connectorStyleConfig={{
                        completedColor: '#9C27B0',
                        activeColor: '#FFACFC',
                        disabledColor: '#eee'
                    }}

                    styleConfig={{
                        activeBgColor: '#FFACFC',
                        completedBgColor: '#9C27B0',
                        inactiveBgColor: '#eee',
                        activeTextColor: 'black',
                        completedTextColor: 'white',
                        inactiveTextColor: 'gray'
                    }}
                />
            </div>

            <div className="checkoutPageNextAndPreviousBtnContainer">
                {(activeStep !== 0 )
                    && <button className="checkoutPagePreviousBtn" onClick={() => setActiveStep(activeStep - 1)}>Previous</button>
                }
                {activeStep !== steps.length - 1
                    && <button className="checkoutPageNextBtn" onClick={() => setActiveStep(activeStep + 1)}>Next</button>
                }

            </div>

            {getSectionComponent()}

        </div>
    )

}
export default Checkout;