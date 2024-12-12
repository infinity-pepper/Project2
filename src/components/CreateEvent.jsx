import React, { useState, useRef } from 'react';
import Navbar from './Navbar';
import Map from './Map';
import axios from 'axios';
import Confetti from 'react-confetti';
import { useAuth } from '../contexts/authContext';
import '../styles/CreateEvent.css'
function CreateEvent() {
    const { userLoggedIn, currentUser } = useAuth();
    const mapRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        startTime: '',
        endTime: '',
        info: '',
        url: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

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
            setError("You must be logged in to create an event.");
            return;
        }

        const { startTime, endTime } = formData;
        if (startTime && endTime && startTime >= endTime) {
            setError("End time must be later than start time.");
            return;
        }

        if (
            !formData.name ||
            !formData.date ||
            !formData.startTime ||
            !formData.endTime ||
            !formData.info
        ) {
            setError("All fields except URL are required.");
            return;
        }

        const selectedAddress = mapRef.current.getAddress();
        const dataToSubmit = {
            ...formData,
            address: selectedAddress,
            creator: currentUser.email,
            url: formData.url || "https://www.designmantic.com/logo-images/20501.png?company=Company%20Name&keyword=event&slogan=&verify=1",
        };

        try {
            const response = await axios.post('http://localhost:3000/postEvents', dataToSubmit);
            if (response.status === 200 || response.status === 201) {
                setSuccess(true);
                setShowConfetti(true);
                setTimeout(() => {
                    setShowConfetti(false); 
                }, 4000);

                setFormData({
                    name: '',
                    address: '',
                    date: '',
                    startTime: '',
                    endTime: '',
                    info: '',
                    url: '',
                });
            }
        } catch (err) {
            console.error("Error submitting event:", err);
            setError(err.response?.data?.message || 'Error creating event');
        }
    };

    return (
        <>
            {showConfetti && <Confetti />}
            <Navbar />
            <div className="form-container">
                <h1 className="form-header">Create Event</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Event Name</label>
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
                        <label htmlFor="address">Address</label>
                        <Map ref={mapRef} />
                    </div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="time-container">
                        <div>
                            <label htmlFor="startTime">Start Time</label>
                            <input
                                type="time"
                                id="startTime"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="endTime">End Time</label>
                            <input
                                type="time"
                                id="endTime"
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="info">Event Info</label>
                        <textarea
                            id="info"
                            name="info"
                            value={formData.info}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="url">Event Image URL</label>
                        <input
                            type="url"
                            id="url"
                            name="url"
                            value={formData.url}
                            onChange={handleChange}
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>Event Created Successfully!</p>}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}

export default CreateEvent;
