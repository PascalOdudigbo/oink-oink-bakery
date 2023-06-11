import React, { useEffect, useState } from "react"
import axios from "axios";
import { Tooltip } from "@mui/material";
import { IconContext } from "react-icons/lib";
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


function EditAddress({targetAddress, customerData ,setAlertDisplay, setAlertStatus, setAlertMessage, hideAlert, isCustomerLoggedIn}){
    console.log(targetAddress)
    //declaring form controlled input states
    const [phone, setPhone] = useState(targetAddress?.phone);
    const [address, setAddress] = useState(targetAddress?.address);
    const [additionalInfo, setAdditionalInfo] = useState(targetAddress?.aditional_information);
    const [counties, setCounties] = useState([])
    const [region, setRegion] = useState(targetAddress?.region);
    const [cities, setCities] = useState();
    const [city, setCity] = useState(targetAddress?.city);

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
            getTargetAddressCities(counties);
        })
    }

    //creating a function to handle editing the address
    function handleEditAddress(e){
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
    
            console.log(addressData)
    
            axios.put(`/customer_addresses/${targetAddress?.id}`, addressData)
            .then(address =>{
                setIsLoading(false);
                isCustomerLoggedIn();
                setAlertStatus(true);
                setAlertMessage("Address updated successfully!");
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

    //get the targetAddress cities
    function getTargetAddressCities(counties){
        counties?.length > 0 && counties?.forEach(county => {
            if (county?.name === targetAddress?.region){
                setCities(county?.sub_counties);
            }
        })
    }

    useEffect(() => {
        getCounties();   
    }, []);

   

    return(
       <div className="EditAddressFormContainer"> 

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

            <form className="EditAddressForm" onSubmit={handleEditAddress}>
                <h1 className="EditAddressFormTitle">{"EDIT ADDRESS"}</h1>

                <div className="EditAddressFormPhoneContainer">
                    <p className="EditAddressFormPhoneText">Phone (required)</p>
                    <input className="EditAddressFormInput" type="text" required value={phone} onChange={e => {e.target.value.length >= 4 && setPhone(e.target.value)}}/>
                </div>

                <div className="EditAddressFormAddressContainer">
                    <p className="EditAddressFormAddressText">Address (required)</p>
                    <input className="EditAddressFormInput" type="text" required value={address} onChange={e => setAddress(e.target.value)}/>
                </div>

                <div className="EditAddressFormAdditionalInformationContainer">
                    <p className="EditAddressFormAdditionalInformationText">Additional information</p>
                    <textarea className="EditAddressFormAdditionalInformationTextArea" rows="3" cols="75" value={additionalInfo} 
                        onChange={(e)=>{
                            if (e.target?.value?.length <= 120){
                                setAdditionalInfo(e.target.value);
                            }
                    }}/>
                    <p className="EditAddressFormAdditionalInformationMaxInput">{`${additionalInfo.length}/120`}</p>
                </div>

                <div className="EditAddressFormRegionTextAndDropdownContainer">
                    <p className="EditAddressFormRegionText">Region (required)</p>
                    <div className="EditAddressFormRegionsDropdownContainer">

                        <button className="EditAddressFormRegionsDropdownBtn">{
                            region !== "" ? region : "Select Region"
                        }</button>
        
                        <div className='EditAddressFormRegionsDropdownItemsContainer'>
        
                            {
                                counties.map(countyData => 
                                    <button key={counties?.indexOf(countyData)} className="EditAddressFormRegionsDropdownItem" 
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

                <div className="EditAddressFormCityTextAndDropdownContainer">
                    <p className="EditAddressFormCityText">City (required)</p>
                    <div className="EditAddressFormCityDropdownContainer">

                        <button className="EditAddressFormCityDropdownBtn">{
                            city !== "" ? city : "Select City"
                        }</button>
        
                        <div className='EditAddressFormCityDropdownItemsContainer'>
        
                            {
                               cities?.map(subCounty =>
                                    <button key={cities?.indexOf(subCounty)} className="EditAddressFormCityDropdownItem" 
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

                <button className="EditAddressFormSubmitButton" type="submit">{isLoading ? <div class="loader"></div> : "UPDATE"}</button>


            </form>

       </div> 
       
    )

}

export default EditAddress