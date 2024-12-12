import React, { useState, useEffect, useRef } from 'react';
import '../styles/Event.css';
function Event({ event }) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const [Focused, setFocused] = useState(false);
    const [closing, setClosing] = useState(false); 
    const focusedEvent = useRef(null); 

    const handleCardClick = () => {
        setFocused(true);
    };

    const handleClose = (e) => {
        if (focusedEvent.current && focusedEvent.current.contains(e.target)) {
            return;
        }
        setClosing(true); 
        setTimeout(() => {
            setFocused(false); 
            setClosing(false); 
        }, 300);
    };

    const [year, m, d] = event.date.split('-');
    const month = months[parseInt(m) - 1];
    const day = parseInt(d).toString();

    const convertTime = (stringTime) => {
        const [h, m] = stringTime.split(':')
        const hours = parseInt(h)
        if (hours > 12) {
            return (hours - 12).toString() + ':' + m + "PM"
        } else if (hours == 0) { return '12:' + m + "AM" }
        return hours.toString() + ':' + m + "AM"
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (focusedEvent.current && !focusedEvent.current.contains(e.target)) {
                setClosing(true); 
                setTimeout(() => {
                    setFocused(false); 
                    setClosing(false); 
                }, 300);
            }
        };

        if (Focused) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [Focused]);

    return (
        <>
            {Focused ? (
                <div className="focused-card-container" onClick={handleClose}>
                    <article className={`focused-event ${closing ? 'closing' : ''}`} ref={focusedEvent}>
                        <div className="img-container">
                            <img src={event.url} alt="" />
                        </div>
                        <div className="event-info">
                            <h2>{event.name}</h2>
                            <h3>{event.state}</h3>
                            <h3>{month}&nbsp;{day}</h3>
                            <h3 className="time">{convertTime(event.startTime)} - {convertTime(event.endTime)}</h3>
                        </div>
                        <div className="additional-info">
                            <h3>{event.address}&nbsp;{event.zip}</h3>
                            <br />
                            <h3 className='event-information'>Event Information: </h3>
                            <h4>{event.info}</h4>
                        </div>
                    </article>
                </div>


            ) : (
                <div className='eventWrap'>
                    <article className="event" onClick={handleCardClick}>
                        <div className="img-container">
                            <img src={event.url} alt="" />
                        </div>
                        <div className="event-info">
                            <h2>{event.name}</h2>
                            <h3>{event.state}</h3>
                            <h3>{month}&nbsp;{day}</h3>
                            <h3 className="time">
                                {(() => {
                                    const currentTime = new Date();
                                    const startTime = new Date(event.date + 'T' + event.startTime);
                                    const timeDifference = (startTime - currentTime) / 60000;
                                    if (timeDifference > 0 && timeDifference <= 60) {
                                        return <>{convertTime(event.startTime)} - {convertTime(event.endTime)} <span style={{ color: 'red', fontSize: '1rem' }}>Starting Soon</span></>
                                    }
                                    return <> {convertTime(event.startTime)} - {convertTime(event.endTime)}</>;
                                })()}
                            </h3>
                        </div>
                    </article>
                </div>
            )}
        </>
    );
}

export default Event;
