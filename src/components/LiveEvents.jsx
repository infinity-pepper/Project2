import Navbar from './Navbar';
import EventList from './EventList';
function LiveEvents() {
  return (
    <div className='full'>
      <Navbar />
      <EventList live={true} myevents={false} />
    </div>
  );
}

export default LiveEvents
