import React, { useState, useEffect } from "react";
import axios from "axios";
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import {BiArrowBack} from "react-icons/bi";


function EditProfile({ customerData, bakerData, isCustomerLoggedIn, isBakerLoggedIn, hideAlert, setAlertStatus, setAlertMessage, setAlertDisplay }) {
    //getting the current window location and storing it in a variable
    const windowLocation = window.location.href;

    //creating form input states
    const [firstName, setFirstName] = useState(customerData?.id ? customerData?.first_name : bakerData?.id && bakerData?.first_name);
    const [lastName, setLastName] = useState(customerData?.id ? customerData?.last_name : bakerData?.id && bakerData?.last_name);
    const [email, setEmail] = useState(customerData?.id ? customerData?.email : bakerData?.id && bakerData?.email);

    //creating loading state
    const [isLoading, setIsLoading] = useState(false);

    //styling the icons
    const ButtonsIconStyle = { color: "white" };

    //creating the navigation function variable
    const navigate = useNavigate();

    //creating a function to handle edit profile
    function handleEditProfile(e) {
        e.preventDefault();

        //setting the data to be sent to the backend
        const userData = {
            first_name: firstName,
            last_name: lastName
        }
        //if a customer is trying to edit their profile
        if (windowLocation.includes("/account-management/customer/edit-profile/")) {

            axios.patch(`/customers/${customerData?.id}`, userData)
                .then(res => {
                    //if profile edit is successful
                    setIsLoading(false);
                    setAlertStatus(true);
                    setAlertDisplay("block");
                    setAlertMessage("Profile editted sucessfully!");
                    hideAlert();
                    isCustomerLoggedIn();

                })
                .catch(error => {
                    //if profile edit isn't successful
                    setIsLoading(false);
                    if (error.response) {
                        setAlertStatus(false);
                        setAlertDisplay("block");
                        setAlertMessage(`${error.response.data.error}`);
                        hideAlert();
                    }
                });
        }
        //if a baker is trying to edit their profile
        else {

            axios.patch(`/bakers/${bakerData?.id}`, userData)
                .then(res => {
                    //if profile edit is successful
                    setIsLoading(false);
                    setAlertStatus(true);
                    setAlertDisplay("block");
                    setAlertMessage("Profile editted sucessfully!");
                    hideAlert();
                    isBakerLoggedIn();

                })
                .catch(error => {
                    //if profile edit isn't successful
                    setIsLoading(false);
                    if (error.response) {
                        setAlertStatus(false);
                        setAlertDisplay("block");
                        setAlertMessage(`${error.response.data.error}`);
                        hideAlert();
                    }
                });
        }

    }

    useEffect(() => {
        //handle data initialization for customer or baker on page reload
        setFirstName(customerData?.id ? customerData?.first_name : bakerData?.id && bakerData?.first_name);
        setLastName(customerData?.id ? customerData?.last_name : bakerData?.id && bakerData?.last_name);
        setEmail(customerData?.id ? customerData?.email : bakerData?.id && bakerData?.email);

    }, [customerData, bakerData]);

    return (
        <div className="editProfileContainer" style={{ height: `calc(100vh - ${100 * 125 / window.innerHeight}vh)` }}>

            <div className="backButtonContainer">
                <Tooltip title={<p className="tooltipText">Back</p>} arrow>
                    <button className="backButton" onClick={() => navigate("/account-management/")}>
                        <IconContext.Provider value={{ size: '35px' }}>
                            <BiArrowBack style={ButtonsIconStyle} />
                        </IconContext.Provider>
                    </button>
                </Tooltip>
            </div>

            <div className="editProfileFormContainer">

                <form className="editProfileForm" onSubmit={handleEditProfile}>
                    <h1 className="formTitle">EDIT PROFILE</h1>
                    <div className="editProfileFormTextAndInputContainer">
                        <p className="editProfileFormText">First Name (required)</p>
                        <input className="editProfileFormInput"
                            required
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div className="editProfileFormTextAndInputContainer">
                        <p className="editProfileFormText">Last Name (required)</p>
                        <input className="editProfileFormInput"
                            required
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div className="editProfileFormTextAndInputContainer">
                        <p className="editProfileFormText">Email</p>
                        <input className="editProfileFormInput"
                            required
                            readOnly
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button className="editProfileButton" type="submit">{isLoading ? <div class="loader"> </div> : "Update"}</button>
                </form>

            </div>


        </div>
    )
}

export default EditProfile;