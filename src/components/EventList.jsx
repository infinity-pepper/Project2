import { useEffect, useState } from 'react';
import Event from './Event';
import axios from 'axios';
import '../styles/EventList.css'
import { useAuth } from '../contexts/authContext';
import { use } from 'react';
function EventList({ live, myevents }) {
    useEffect(() => {
        axios.get('http://localhost:3000/getEvents')
            .then(events => setEvents(events.data))
            .catch(err => console.log(err))
    }, [])

    const [events, setEvents] = useState([])
    
    events.sort((a, b) => {
        const dateTimeA = new Date(a.date + 'T' + a.startTime);
        const dateTimeB = new Date(b.date + 'T' + b.startTime);
        return dateTimeA - dateTimeB;
    });
    const currentDate = new Date()
    const updatedEvents = events.filter(event => {
        const eventStart = new Date(event.date + 'T' + event.startTime);
        const eventEnd = new Date(event.date + 'T' + event.endTime);
        return live ? currentDate >= eventStart && currentDate <= eventEnd :
            currentDate <= eventStart
    })
    if (myevents) {
        const { currentUser } = useAuth()
        const myEvents = events.filter(event => event.creator == currentUser.email)

        return (
            <>
                <div className="banner">
                    <p className="banner-text">📅 My Events 📅</p>
                </div>
                <section className='myevent-list'>
                    {myEvents.map(event => {
                        return (
                            <Event key={event.id} event={event} />
                        )
                    })}
                </section>

            </>
        )
    }
    else if (live) {
        if (updatedEvents.length)
            return (
                <>
                    <div className="banner">
                        <p className="banner-text">🎉 Live Events 🎉</p>
                    </div>
                    <section className='liveevent-list'>
                        {updatedEvents.map(event => {
                            return (
                                <Event key={event.id} event={event} />
                            )
                        })}
                    </section>

                </>
            )
        return (
            <div className="banner">
                <p className="banner-text"> There are no ongoing events. :(</p>
            </div>
        )
    }
    else if (updatedEvents.length) {
        return (
            <>
                <div className="banner">
                    <p className="banner-text">🎉 Upcoming Events 🎉</p>
                </div>
                <section className='upcomingevent-list'>
                    {updatedEvents.map(event => {
                        return (
                            <Event key={event.id} event={event} />
                        )
                    })}
                </section>

            </>
        )
    }
    else {
        return (
            <div className="banner">
                <p className="banner-text">There are no upcoming events. :(</p>
            </div>
        )
    }
}

export default EventList