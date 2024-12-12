import Navbar from './Navbar';
import EventList from './EventList';
function UpcomingEvents() {
    return (
        <div className='full'>
            <Navbar />
            <EventList live={false} myevents={false} />
        </div>
    );
}

export default UpcomingEvents
