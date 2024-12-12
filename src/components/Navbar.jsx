import { useAuth } from '../contexts/authContext';
import { SignOut } from '../auth';
import { Link, useNavigate } from 'react-router-dom'; 
import '../styles/Navbar.css';

function Navbar() {
    const { userLoggedIn } = useAuth();
    const navigate = useNavigate(); 

    const handleNavigation = (path) => {
        navigate(path); 
        window.location.reload(); 
    };

    return (
        <header className="header">
            <div className="logo-container">
                <a href="" className="logo">Community Hub</a>
                <span className="logo-subtext">: by Jonathan Song and Joshua Jainarine</span>
            </div>
            <nav className="navbar">
                <ul>
                    {userLoggedIn ? (
                        <li onClick={() => handleNavigation('/MyEvents')}>📅My Events</li>
                    ) : (
                        <button onClick={() => { window.location.href = "/" }} className="signin">
                            Sign In
                        </button>
                    )}
                    <li onClick={() => handleNavigation('/LiveEvents')}>🎉Live Events</li>
                    <li onClick={() => handleNavigation('/UpcomingEvents')}>🎉Upcoming Events</li>
                    <li onClick={() => handleNavigation('/Marketplace')}>🛒Marketplace</li>
                    <li onClick={() => handleNavigation('/CreateNewEvent')}>📝Create New Event</li>
                    {userLoggedIn && (
                        <button onClick={() => { SignOut(); window.location.href = "/" }} className="logout">
                            Logout
                        </button>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;
