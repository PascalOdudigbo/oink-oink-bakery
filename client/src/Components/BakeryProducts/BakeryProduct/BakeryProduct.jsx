import React, { useState } from 'react';
import { IconContext } from 'react-icons/lib';
import { RxDotFilled } from 'react-icons/rx';
import { SlOptions } from 'react-icons/sl';
import axios from "axios";
import cloudinary from "cloudinary/lib/cloudinary";
import { useNavigate } from "react-router-dom";
 
cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET
});


function BakeryProduct({products, setProducts, product, setTargetProduct, setAlertDisplay, setAlertStatus, setAlertMessage, hideAlert }) {
    const activeIconStyles = { marginRight: "3px", marginLeft: "6px", color: "green" };
    const notActiveIconStyles = { marginRight: "3px", marginLeft: "6px", color: "red" };
    const [dropdownDisplay, setDropdownDisplay] = useState("none");
    const navigate = useNavigate();

    //creating function to handle deleting product image from cloudinary
    const deleteCloudinaryProductImage = async (productImage) => {
          cloudinary.v2.uploader.destroy(productImage.image_public_id, function(error,result) {
            window.scrollTo(0, 0);
            setAlertStatus(false);
            setAlertDisplay("block");
            setAlertMessage(`${result} ${error}`);
            hideAlert();
        })
        .then(response => {
            //if deleting image from server is a success
            deleteImageFromDatabase(productImage)

        })
        .catch(error => {
            //if deleting image from server fails
            window.scrollTo(0, 0);
            setAlertStatus(false);
            setAlertDisplay("block");
            setAlertMessage("Something went wrong, please try again later.");
            hideAlert();
        });
    }

     //creating a function to delete image from database
     function deleteImageFromDatabase(productImage){
        axios.delete(`/product_images/${productImage?.id}`)
        .then(() => {
            
        })
        .catch(error => {
            if(error?.response){
                //if deleting image from database fails
                window.scrollTo(0, 0);
                setAlertStatus(true);
                setAlertDisplay("block");
                setAlertMessage(error.response.data.error);
                hideAlert();
            }

        })
        
    }


    //creating function to handle product deletion
    function handleDeleteProduct(product){
        //looping through all product images
        product?.product_images?.forEach(productImage => {
            //deleting each image from cloudinary and server
            deleteCloudinaryProductImage(productImage)
        })
        
        axios.delete(`/products/${product?.id}`)
        .then(() => {
            //if deleting image from database is a success
            window.scrollTo(0, 0);
            setAlertStatus(true);
            setAlertDisplay("block");
            setAlertMessage(`Product deleted successfully!`);
            hideAlert();
            let newData = products.filter((aProduct)=> aProduct !== product)
            setProducts(newData);
        })
        .catch(error => {
            if(error?.response){
                //if deleting image from database fails
                window.scrollTo(0, 0);
                setAlertStatus(true);
                setAlertDisplay("block");
                setAlertMessage(error.response.data.error);
                hideAlert();
            }

        })
    }
    
    return (
        <tr className="productsDataRow">

            <td className="productsDataCell">
                <div className='productImageAndNameContainer'>
                    <img className='productImage' src={product?.product_images[Math.floor(Math.random() * product?.product_images.length)]?.image_url} alt={product.name} />
                    <p className='productName'>{product.name}</p>
                </div>
            </td>
            <td className="productsDataCell">{product?.orders ? product?.orders : 0}</td>
            <td className="productsDataCell">KSH {product?.sales ? product?.sales : 0}</td>
            <td className="productsDataCell">{
                product.active ?
                    <div className='productActiveIconAndText'>
                        <IconContext.Provider value={{ size: '20px' }}>
                            <RxDotFilled style={activeIconStyles} />
                        </IconContext.Provider>
                        <p className='productActive'>Active</p>
                    </div>
                    :
                    <div className='productActiveIconAndText'>
                        <IconContext.Provider value={{ size: '20px' }}>
                            <RxDotFilled style={notActiveIconStyles} />
                        </IconContext.Provider>
                        <p className='productActive'>Not active</p>
                    </div>
            }
            </td>
            <td className="productsDataCell">
                <div className="dropdown">
                    <IconContext.Provider value={{ size: '20px' }}>
                        <SlOptions onClick={() => dropdownDisplay === "block" ? setDropdownDisplay("none") : setDropdownDisplay("block")} style={{ color: "black" }} />
                    </IconContext.Provider>
                    <div className="dropdown-content" style={{ display: dropdownDisplay }}>
                        <button className='bakeryProductDropdownItem' onClick={() => {
                            //set target product here
                            setTargetProduct(product)
                            navigate("/bakery-portal/edit-product")
                        }}>Edit</button>
                        <button className="bakeryProductDropdownItem" onClick={() => {handleDeleteProduct(product)}}>Delete</button>
                    </div>
                </div>
            </td>
        </tr>

    );


}
export default BakeryProduct;