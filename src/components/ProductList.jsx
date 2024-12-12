import { useEffect, useState, useRef } from 'react';
import Product from './Product';
import AddProduct from './AddProduct';
import axios from 'axios';
import '../styles/ProductList.css';
import { useAuth } from '../contexts/authContext';

function ProductList({ live, myevents }) {
    const [products, setProducts] = useState([]);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [closing, setClosing] = useState(false);
    const addProductRef = useRef(null);

    useEffect(() => {
        axios
            .get('http://localhost:3000/getProducts')
            .then(products => setProducts(products.data))
            .catch(err => console.log(err));
    }, []);
    
    const toggleAddProduct = () => {
        if (showAddProduct) {
            setClosing(true);
            setTimeout(() => {
                setShowAddProduct(false);
                setClosing(false);
            }, 300);
        } else {
            setShowAddProduct(true);
        }
    };

    const handleClickOutside = (event) => {
        if (addProductRef.current && !addProductRef.current.contains(event.target)) {
            toggleAddProduct();
        }
    };

    useEffect(() => {
        if (showAddProduct) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showAddProduct]);

    return (
        <>
            <div className="banner">
                <p className="banner-text">🛒 Marketplace 🛒</p>
            </div>
            <button className="add-product" onClick={toggleAddProduct}>
                Add a Product
            </button>
            {showAddProduct && (
                <div
                    className={`add-product-container ${closing ? 'closing' : 'opening'
                        }`}
                    ref={addProductRef}
                >
                    <AddProduct closeForm={toggleAddProduct} />
                </div>
            )}
            <section className="product-list">
                {products.map(product => (
                    <Product key={product.id} product={product} />
                ))}
            </section>
        </>
    );
}

export default ProductList;
