import Navbar from './Navbar';
import Login from './Login';
import { useAuth } from '../contexts/authContext';
import Register from './Register';
import { Navigate } from 'react-router-dom';
import '../styles/Home.css'
function Home() {
    const { userLoggedIn } = useAuth()
    console.log(userLoggedIn)
    return (
        <>
            <Navbar />
            {userLoggedIn ? (<Navigate to={'/MyEvents'} replace={true} />
            ) : (
                <div className="auth-container">
                    <Login />
                    <Register />
                </div>
            )}
        </>
    )
}

export default Home
