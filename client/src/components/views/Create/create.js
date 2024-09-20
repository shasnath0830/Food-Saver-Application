import React, { useState } from 'react';
import Header from "../../shared/Header/header";
import "./index.css"

function Create(props) {

    const [loadingText, setLoadingText] = useState("...")

    const [storeData, setStoreData] = useState({
        storeName: '',
        storeLocation: '',
        storeImageUrl: '',
        storeTagline: '',
        storeDescription: '',
        storeProducts: [],
        storeRevenue: 0,
        storeTotalOrders: 0
    });

    const [productFormData, setProductFormData] = useState({
        productName: '',
        productPrice: 0,
        productImageUrl: '',
        productQuantity: '',
        productDescription: '',
        productExpiry: '',
        productStore: '',
    });

    const handleStoreChange = (e) => {
        const { name, value } = e.target;
        setStoreData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleProductChange = (index, field, value) => {
        const newProducts = [...storeData.storeProducts];
        newProducts[index][field] = value;
        setStoreData(prevState => ({
            ...prevState,
            storeProducts: newProducts
        }));
    };

    const addProduct = () => {
        setStoreData(prevState => ({
            ...prevState,
            storeProducts: [...prevState.storeProducts, { ...productFormData }]
        }));
        setProductFormData({
            productName: '',
            productPrice: 0,
            productImageUrl: '',
            productQuantity: '',
            productDescription: '',
            productExpiry: '',
            productStore: '',
        });
    };

    const removeProduct = (index) => {
        const newProducts = [...storeData.storeProducts];
        newProducts.splice(index, 1);
        setStoreData(prevState => ({
            ...prevState,
            storeProducts: newProducts
        }));
    };


    const saveStore = async () => {
        setLoadingText("Submitting Request...")
        const storeDataNew = {
            ...storeData,
            storeProducts: storeData.storeProducts.map(product => ({
                ...product,
                productStore: storeData.storeName
            }))
        };

        setStoreData(storeDataNew);

        console.log(storeDataNew);
        props.CreateStore(props.user.email, storeDataNew);
        setLoadingText("Updated Store!");
    };


    return (
        <div className="page1">
            <div className="content">
                <Header setSignedIn={props.setSignedIn} signedIn={props.signedIn} openLogIn={props.openLogIn} closeLogIn={props.closeLogIn} openSignUp={props.openSignUp} closeSignUp={props.closeSignUp} />
                <div className="line"></div>
                <div className="discover_page">
                    <h2 className='subtitle' >Create a Store</h2>
                    <form className='store_form'>
                        <div className='store_form_first'>
                            <label className="store_form_label" htmlFor="storeName">Store Name:</label>
                            <input className="store_form_input" type="text" id="storeName" name="storeName" value={storeData.storeName} onChange={handleStoreChange} />
                            <label className="store_form_label" htmlFor="storeLocation">Store Location:</label>
                            <input className="store_form_input" type="text" id="storeLocation" name="storeLocation" value={storeData.storeLocation} onChange={handleStoreChange} />
                        </div>
                        <div className='store_form_first'>
                            <label className="store_form_label" htmlFor="storeImageUrl">Store Image URL:</label>
                            <input className="store_form_input" type="text" id="storeImageUrl" name="storeImageUrl" value={storeData.storeImageUrl} onChange={handleStoreChange} />
                            <label className="store_form_label" htmlFor="storeTagline">Store Tagline:</label>
                            <input className="store_form_input" type="text" id="storeTagline" name="storeTagline" value={storeData.storeTagline} onChange={handleStoreChange} />
                        </div>
                        <div className='store_form_second'>
                            <label className="store_form_label" htmlFor="storeDescription">Store Description:</label>
                            <input className="store_form_input diff" id="storeDescription" name="storeDescription" value={storeData.storeDescription} onChange={handleStoreChange} />
                        </div>
                    </form>
                    <hr />
                    <h2 className='subtitle' >Manage Products</h2>
                    <h4 className='subtitle_mini' >Current Products List</h4>
                    <div className='products_table'>
                        <div className="products_table_row">
                            <div className='product_table_dummy'>Image</div>
                            <div className='product_table_dummy'>Name</div>
                            <div className='product_table_dummy'>Price</div>
                            <div className='product_table_dummy'>ImageURL</div>
                            <div className='product_table_dummy'>Quantity</div>
                            <div className='product_table_dummy'>Expiry</div>
                            <div className='product_table_dummy'>Description</div>
                            <div className='product_table_dummy'>Remove?</div>
                        </div>
                        {storeData.storeProducts.map((product, index) => (
                            <div className="products_table_row" key={index}>
                                <div className='product_table_image' style={{ backgroundImage: `url(${product.productImageUrl})` }}></div>
                                <input className='product_table_name' type="text" id={`productName${index}`} name="productName" value={product.productName} onChange={(e) => handleProductChange(index, 'productName', e.target.value)} />
                                <input className='product_table_iamgeurl' type="text" id={`imageurl${index}`} name="productPrice" value={product.productPrice} onChange={(e) => handleProductChange(index, 'productPrice', e.target.value)} />
                                <input className='product_table_iamgeurl' type="text" id={`imageurl${index}`} name="productImageUrl" value={product.productImageUrl} onChange={(e) => handleProductChange(index, 'productImageUrl', e.target.value)} />
                                <input className='product_table_quantity' type="text" id={`quantity${index}`} name="productQuantity" value={product.productQuantity} onChange={(e) => handleProductChange(index, 'productQuantity', e.target.value)} />
                                <input className='product_table_expiry' type="text" id={`expiry${index}`} name="productExpiry" value={product.productExpiry} onChange={(e) => handleProductChange(index, 'productExpiry', e.target.value)} />
                                <input className='product_table_desc' type="text" id={`desc${index}`} name="productDescription" value={product.productDescription} onChange={(e) => handleProductChange(index, 'productDescription', e.target.value)} />
                                <input className='product_table_store' type="text" id={`desc${index}`} name="productStore" value={storeData.storeName} onChange={(e) => handleProductChange(index, 'productStore', e.target.value)} />
                                <button className='product_table_btn' type="button" onClick={() => removeProduct(index)}>Remove Product</button>
                            </div>
                        ))}
                    </div>
                    <h4 className='subtitle_mini' >Add Products</h4>

                    <form className='store_form'>
                        <div className='store_form_first'>

                            <label className="store_form_label" htmlFor="newProductName">Product Name:</label>
                            <input className="store_form_input" type="text" id="newProductName" name="productName" value={productFormData.productName} onChange={(e) => setProductFormData({ ...productFormData, productName: e.target.value })} />

                            <label className="store_form_label" htmlFor="newProductImageUrl">Product Image URL:</label>
                            <input className="store_form_input" type="text" id="newProductImageUrl" name="productImageUrl" value={productFormData.productImageUrl} onChange={(e) => setProductFormData({ ...productFormData, productImageUrl: e.target.value })} />
                        </div>
                        <div className='store_form_first'>
                            <label className="store_form_label" htmlFor="newProductQuantity">Product Quantity:</label>
                            <input className="store_form_input" type="text" id="newProductQuantity" name="productQuantity" value={productFormData.productQuantity} onChange={(e) => setProductFormData({ ...productFormData, productQuantity: e.target.value })} />

                            <label className="store_form_label" htmlFor="newProductExpiry">Product Expiry:</label>
                            <input className="store_form_input" type="text" id="newProductExpiry" name="productExpiry" value={productFormData.productExpiry} onChange={(e) => setProductFormData({ ...productFormData, productExpiry: e.target.value })} />
                        </div>
                        <div className='store_form_first'>
                            <label className="store_form_label" htmlFor="newProductDescription">Product Description:</label>
                            <input className="store_form_input" id="newProductDescription" name="productDescription" value={productFormData.productDescription} onChange={(e) => setProductFormData({ ...productFormData, productDescription: e.target.value })} />
                            <label className="store_form_label" htmlFor="newProductDescription">Product Price:</label>
                            <input className="store_form_input" id="newProductPrice" name="productPrice" value={productFormData.productPrice} onChange={(e) => setProductFormData({ ...productFormData, productPrice: e.target.value })} />
                        </div>

                        <button className="add_product" type="button" onClick={addProduct}>Add Product</button>
                    </form>
                    <div className='loading_text'>{loadingText}</div>
                    <button className="store_save_submit" type="button" onClick={saveStore}>Save Store</button>
                </div>
            </div>
        </div>
    );
}

export default Create;
