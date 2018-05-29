import React from 'react';
import EventForm from '../../components/EventForm/EventForm';
import './EventPage.css'

const EventPage = (props) => {
    return(
        <div className='EventPage'>
            <EventForm
                {...props}
            />
        </div>
    );
};

export default EventPage; 
