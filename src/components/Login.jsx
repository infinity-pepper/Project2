import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { SignIn } from '../auth'
import { useAuth } from '../contexts/authContext'
import '../styles/Login.css'
function Login() {
    const { userLoggedIn } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    console.log(userLoggedIn
    )
    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            setErrorMessage('');
            try {
                await SignIn(email, password);
            } catch (error) {
                setErrorMessage('Incorrect Username or Password');
                setIsSigningIn(false)
            }
        }
    }

    return (
        <div>
            {userLoggedIn && <Navigate to={'/MyEvents'} replace={true} />}
            <main className="login-container">
                <div className="login-box">
                    <div className="login-header">
                        <h3>Welcome Back</h3>
                    </div>
                    <form onSubmit={onSubmit} className="login-form">
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
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {errorMessage && <span className="error-message">{errorMessage}</span>}
                        <button
                            type="submit"
                            disabled={isSigningIn}
                            className="sign-in"
                        >
                            {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Login