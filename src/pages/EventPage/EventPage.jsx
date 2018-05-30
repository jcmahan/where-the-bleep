import React from 'react';
import EventForm from '../../components/EventForm/EventForm';
import NavBar from '../../components/NavBar/NavBar'
import './EventPage.css'

const EventPage = (props) => {
    return(
        <div className='EventPage'>
            <EventForm
                user={props.user}
                history={props.history}
            />
        </div>
    );
};

export default EventPage; 
