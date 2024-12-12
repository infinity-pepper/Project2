import Navbar from './Navbar';
import EventList from './EventList';
function MyEvents() {
    return (
        <div className='full'>
            <Navbar />
            <EventList live={false} myevents={true} />
        </div>
    );
}

export default MyEvents
