import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { CreateUser } from '../auth';
import '../styles/Register.css';

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { userLoggedIn } = useAuth();

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        if (!isRegistering) {
            setIsRegistering(true);
            try {
                await CreateUser(email, password);
            } catch (error) {
                setErrorMessage('Email is invalid, or already in use!');
                setIsRegistering(false)
            }
        }
    };

    return (
        <div>
            {userLoggedIn && <Navigate to={'/Home'} replace={true} />}

            <main className="register-container">
                <div className="register-box">
                    <div className="register-header">
                        <h3>Create a New Account</h3>
                    </div>
                    <form onSubmit={onSubmit} className="register-form">
                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                autoComplete="new-password"
                                required
                                disabled={isRegistering}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                autoComplete="off"
                                required
                                disabled={isRegistering}
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                            />
                        </div>

                        {errorMessage && <span className="error-message">{errorMessage}</span>}

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className="sign-up"
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Register;
