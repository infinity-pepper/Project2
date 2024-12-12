import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/authContext';
import '../styles/CreateEvent.css'

function AddProduct() {
    const { userLoggedIn, currentUser } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: '',
        description: '',
        url: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (!userLoggedIn) {
            setError("You must be logged in to add a product.");
            return;
        }
        if (
            !formData.name ||
            !formData.price ||
            !formData.quantity ||
            !formData.description
        ) {
            setError("All fields except product image URL are required.");
            return;
        }

        if (formData.price < 0) {
            setError("Price cannot be less than 0.");
            return;
        }

        if (formData.quantity < 0) {
            setError("Quantity cannot be less than 0.");
            return;
        }

        const dataToSubmit = {
            ...formData,
            creator: currentUser.email,
            url: formData.url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdD7G7FFg1UKZFXhyP45b4AvY-qKEFvfjj3w&s",
        };

        try {
            const response = await axios.post('http://localhost:3000/postProduct', dataToSubmit);
            if (response.status === 200 || response.status === 201) {
                setSuccess(true);
                setFormData({
                    name: '',
                    price: '',
                    quantity: '',
                    description: '',
                    url: ''
                });
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error adding product');
        }
    };

    return (
        <>
            <div className="form-container">
                <h1 className="form-header">Add New Product</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Product Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="url">Product Image URL</label>
                        <input
                            type="url"
                            id="url"
                            name="url"
                            value={formData.url}
                            onChange={handleChange}
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>Product Added Successfully!</p>}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}

export default AddProduct;
