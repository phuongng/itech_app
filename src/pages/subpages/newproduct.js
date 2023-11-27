import React, { Component } from 'react';
import "../dashboard.css";
import "../inventory.css";
import '../../components/breadcrum.css';
import './newproduct.css';
import '../../components/theme_color.css';
import Navbar from '../../components/Navbar/Navbar';

// npm i react-select
// import Select from 'react-select';

import Breadcrumb from '../../components/breadcrumb';
import { Link } from "react-router-dom";

//import icons
import {LiaCloudUploadAltSolid} from 'react-icons/lia';
import {BsTrash} from 'react-icons/bs';
import {HiMiniPhoto} from 'react-icons/hi2';
import {AiOutlineClear} from 'react-icons/ai';

import iphone from "../../image/iphone.svg";
import small_iphone from "../../image/small_iphone.svg";

class NewProduct extends Component {
    constructor() {
      super();
      this.editor = new TextEditor();
      this.state = {
        editorContent: 'Type here...',
      };
   
    } 
    clearText = () => {
        this.setState({ editorContent: '' });
      }  
      handleEditorChange = (e) => {
        this.setState({ editorContent: e.target.innerText });
      }
    render() {
    
    return (
        <>
        <Navbar />
        <div className="dashboardBody">
          {/* breadcrumb   */}
            <div className="breadcrumBody">
            <Breadcrumb className="breadcrumDiv"/>
            </div>

            {/* main inventory page */}
            <div className="main_new_product">
            {/* newproduct_button */}
                <div className="newproduct_button">
                    <div className="addproduct_button">
                        <Link className="add_product"> Save as Draft</Link>      
                    </div>

                    <div className="addproduct_button">
                        <Link className="add_product"> Save & Publish</Link>  
                    </div>
                </div>

            {/* new product form    */}
                <div className="new_product_form">
                    <div className="new_product_form_left shadowBox">
                        <div className="product_form_2_columns">
                            <div className="product_input">
                                <p>Product Name</p>
                                <input type="text" id="product_name"></input>
                            </div>

                            <div className="product_input">
                                <p>Quantity</p>
                                <input type="text" id="product_quantity"></input>
                            </div>
                        </div>
                    
                        <div className="product_form_2_columns">
                        <div className="product_input">
                            {/* <label for="category">Category:</label> */}
                            <p>Category</p>
                            <div className="custom-select ">
                                <select name="category">
                                <option value="none" defaultValue disabled hidden className="custom-option">Select an Option</option> 
                                <option value="iPhone">iPhone</option>
                                <option value="iPad">iPad</option>
                                <option value="Macbook">Macbook</option>
                                <option value="Accessories">Accessories</option>
                                </select>
                            </div>
                            
                        </div>

                        <div className="product_input ">
                            {/* <label for="category">Category:</label> */}
                            <p>Order Type</p>
                            <div className="custom-select ">
                            <select name="order type">
                            <option value="none" selected disabled hidden>Select an Option</option> 
                            <option value="In Store">In Store</option>
                            <option value="Delivery">Delivery</option>
                           
                            </select>
                            </div>
                        </div>

                        </div>

                        <div className="product_form_2_columns">
                            <div className="product_input">
                            {/* price at which the owner or business acquires products from a supplier. */}
                                <p>Cost Price</p>
                                <input type="text" id="cost_price"></input>
                            </div>

                            <div className="product_input">
                                <p>Retail Price</p>
                                <input type="text" id="retail_price"></input>
                            </div>
                        </div>

                        <div className="product_input">
                            <p>Date</p>
                            <input type="date" id="date_import"></input>
                        </div>
                        

                        
                        
                        <div className="product_input short_description">
                            <p>Short Description</p>
                            <input type="text" id="short_description"></input>
                        </div>


                        <div className="product_input long_description">
                            {/* Your NewProduct component content here */}
                            <p>Detail Description</p>
                            <div className="editor-container">
                            <div
                            className="editor"
                            contentEditable="true"
                            onInput={this.handleEditorChange}
                            style={{ textAlign: 'left', direction: 'ltr', unicodeBidi: 'embed' }}
                            >
                            {this.state.editorContent}
                            </div>

                                <div className="actions">
                                <button onClick={() => this.editor.boldText()}>
                                <b>B</b>
                                </button>
                                <button onClick={() => this.editor.underlineText()}>
                                    <u>U</u>
                                </button>
                                
                                <button onClick={() => this.editor.italicizeText()}>
                                    <i>I</i>
                                </button>

                                <button onClick={this.clearText} className="clear-button">
                                    <AiOutlineClear className="clear-icon" />
                                </button>

                                </div>
                                
                            </div>
                        </div>          
                    </div>


                    {/* new_product_form_right  */}
                    <div className="new_product_form_right shadowBox" >

                        <div className="new_product-product_image">
                            <div className="new_product-product_image-uploading_icon">
                                <LiaCloudUploadAltSolid/>
                                <BsTrash/>
                            </div> 
                            <div className='new_product-product_image-uploading_image'>
                            <img src={iphone} className=""/>
                            </div>
                       
                           
                           
                        </div>
                        <div>Additional Images</div>
                        <div className="new_product-product_image-additional_image">
                           
                        <div className="new_product-product_image">
                            <div className="new_product-product_image-uploading_icon_small">
                                <LiaCloudUploadAltSolid/>
                                <BsTrash/>
                            </div> 
                            <img src={small_iphone} className=""/>
                        </div>

                            <div className="product_image-additional_image ">
                                <div className="div-big_additional_image_icon" >
                                    <HiMiniPhoto className="big_additional_image_icon" />
                                </div>
                                <div className="uploadImage_text_icon">
                                <LiaCloudUploadAltSolid/> 
                                <p className="uploadImage_text">Upload Image</p>
                                </div>    
                            </div>

                            <div className="product_image-additional_image ">
                                <div className="div-big_additional_image_icon" >
                                    <HiMiniPhoto className="big_additional_image_icon" />
                                </div>
                                <div className="uploadImage_text_icon">
                                <LiaCloudUploadAltSolid/> 
                                <p className="uploadImage_text">Upload Image</p>
                                </div>    
                            </div>
                        </div>

                    </div>
                </div>

            </div> {/* end main inventory page */}
           

        </div>
        </>
    );
    };
};

class TextEditor {
    boldText() {
      document.execCommand('bold', false, null);
    }
  
    underlineText() {
      document.execCommand('underline', false, null);
    }
  
    italicizeText() {
      document.execCommand('italic', false, null);
    }
  
    // alignText(align) {
    //   document.execCommand('justify' + align, false, null);
    // }
  }
 
export default NewProduct;