import React, { useEffect, useState } from "react"
import axios from "axios";
import { Tooltip } from "@mui/material";
import { IconContext } from "react-icons/lib";
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


function AddAddress({customerData ,setAlertDisplay, setAlertStatus, setAlertMessage, hideAlert, isCustomerLoggedIn}){

    //declaring form controlled input states
    const [phone, setPhone] = useState("+254");
    const [address, setAddress] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [counties, setCounties] = useState([])
    const [region, setRegion] = useState("");
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState("");

    //creating loading state variable
     const [isLoading, setIsLoading] = useState(false);

    //declaring icon styling variables
    const closePageIconStyle = { color: "red" };

    //creating navigation variable function
    const navigate = useNavigate();

    //creating a function to get all the kenyan counties data from my API
    function getCounties(){
        //getting all the kenyan counties data from my API
        fetch("https://pascalodudigbo.github.io/KenyaCountiesAPI/counties.json")
        .then(res => res.json())
        .then(counties => {
            setCounties(counties);
        })
    }

    //creating a function to handle adding the address
    function handleAddAddress(e){
        e.preventDefault();
        setIsLoading(true);

        if (phone.length !== 13){
            setIsLoading(false);
            setAlertStatus(false);
            setAlertMessage("Invalid phone number!");
            setAlertDisplay("block");
            hideAlert();
        }
        else if(region === ""){
            setIsLoading(false);
            setAlertStatus(false);
            setAlertMessage("Region is a required field!");
            setAlertDisplay("block");
            hideAlert();
        }
        else if(city === ""){
            setIsLoading(false);
            setAlertStatus(false);
            setAlertMessage("City is a required field!");
            setAlertDisplay("block");
            hideAlert();
        }
        else{
            const addressData = {
                customer_id: customerData?.id,
                phone: phone,
                address: address.trim()?.charAt(0)?.toUpperCase() + address?.slice(1),
                aditional_information: additionalInfo.trim()?.charAt(0)?.toUpperCase() + additionalInfo?.slice(1),
                region: region,
                city: city
            }
    
            // console.log(addressData)
    
            axios.post("/customer_addresses", addressData)
            .then(address =>{
                setIsLoading(false);
                isCustomerLoggedIn();
                setAlertStatus(true);
                setAlertMessage("Address saved successfully!");
                setAlertDisplay("block");
                hideAlert();
    
            })
            .catch(error => {
                if(error?.response){
                    setIsLoading(false);
                    setAlertStatus(false);
                    setAlertMessage("Something went wrong, please try again!");
                    setAlertDisplay("block");
                    hideAlert();
                }
            })
        }
    }

    useEffect(() => {
        getCounties();
    }, []);

   

    return(
       <div className="AddAddressFormContainer"> 

            <Tooltip title="close" arrow>
                <button className="btn-closePage" onClick={() => {
                    setPhone("+254");
                    setAddress("");
                    setAdditionalInfo("")
                    setRegion("");
                    setCities([]);
                    setCity("");
                    navigate("/customer/address-book/");

                }}>
                    <IconContext.Provider value={{ size: '25px' }}>
                        <AiFillCloseCircle style={closePageIconStyle} />
                    </IconContext.Provider>
                </button>
            </Tooltip>

            <form className="AddAddressForm" onSubmit={handleAddAddress}>
                <h1 className="AddAddressFormTitle">{"ADD ADDRESS"}</h1>

                <div className="AddAddressFormPhoneContainer">
                    <p className="AddAddressFormPhoneText">Phone (required)</p>
                    <input className="AddAddressFormInput" type="text" required value={phone} onChange={e => {e.target.value.length >= 4 && setPhone(e.target.value)}}/>
                </div>

                <div className="AddAddressFormAddressContainer">
                    <p className="AddAddressFormAddressText">Address (required)</p>
                    <input className="AddAddressFormInput" type="text" required value={address} onChange={e => setAddress(e.target.value)}/>
                </div>

                <div className="AddAddressFormAdditionalInformationContainer">
                    <p className="AddAddressFormAdditionalInformationText">Additional information</p>
                    <textarea className="AddAddressFormAdditionalInformationTextArea" rows="3" cols="75" value={additionalInfo} 
                        onChange={(e)=>{
                            if (e.target?.value?.length <= 120){
                                setAdditionalInfo(e.target.value);
                            }
                    }}/>
                    <p className="AddAddressFormAdditionalInformationMaxInput">{`${additionalInfo.length}/120`}</p>
                </div>

                <div className="AddAddressFormRegionTextAndDropdownContainer">
                    <p className="AddAddressFormRegionText">Region (required)</p>
                    <div className="AddAddressFormRegionsDropdownContainer">

                        <button className="AddAddressFormRegionsDropdownBtn">{
                            region !== "" ? region : "Select Region"
                        }</button>
        
                        <div className='AddAddressFormRegionsDropdownItemsContainer'>
        
                            {
                                counties.map(countyData => 
                                    <button key={counties?.indexOf(countyData)} className="AddAddressFormRegionsDropdownItem" 
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setRegion(countyData?.name)
                                            setCities(countyData?.sub_counties)
                                        }}>{countyData?.name}
                                    </button>
                                )
                            }
                        
                        </div>

                    </div> 
                    
                </div>

                <div className="AddAddressFormCityTextAndDropdownContainer">
                    <p className="AddAddressFormCityText">City (required)</p>
                    <div className="AddAddressFormCityDropdownContainer">

                        <button className="AddAddressFormCityDropdownBtn">{
                            city !== "" ? city : "Select City"
                        }</button>
        
                        <div className='AddAddressFormCityDropdownItemsContainer'>
        
                            {
                               cities?.map(subCounty =>
                                    <button key={cities?.indexOf(subCounty)} className="AddAddressFormCityDropdownItem" 
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setCity(subCounty)
                                        }}
                                    >{subCounty}</button> 
                            
                                )
                                
                            }
                        
                        </div>

                    </div> 
                    
                </div>

                <button className="addAddressFormSubmitButton" type="submit">{isLoading ? "Loading..." : "SAVE"}</button>


            </form>

       </div> 
       
    )

}

export default AddAddress