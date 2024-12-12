import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Register from './Register'
import MyEvents from './MyEvents';
import LiveEvents from './LiveEvents';
import UpcomingEvents from './UpcomingEvents';
import CreateEvent from './CreateEvent';
import Marketplace from './Marketplace';
import { AuthProvider } from '../contexts/authContext';
function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Home" element={<Home />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/MyEvents" element={<MyEvents />} />
                    <Route path="/LiveEvents" element={<LiveEvents />} />
                    <Route path="/UpcomingEvents" element={<UpcomingEvents />} />
                    <Route path="/Marketplace" element={<Marketplace />} />
                    <Route path="/CreateNewEvent" element={<CreateEvent />} />

                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App
