import React, { useState, useEffect, useRef } from 'react';
import '../styles/Product.css';
function Product({ product }) {
    return (
        <div className='product'>
            <article className="product">
                <div className="img-container">
                    <img className='product-img' src={product.url} alt="" />
                </div>
                <div className="product-info">
                    <h2>{product.name}</h2>
                    <h2>${product.price}</h2>
                    <h3>{product.quantity} Remaining</h3>
                    <button className='add-to-cart'>Add to Cart</button>
                </div>
            </article>
        </div>

    );
}

export default Product;
