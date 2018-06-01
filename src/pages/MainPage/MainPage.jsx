import React from 'react';
import Map from '../../components/Map/Map';
import './MainPage.css';

const MainPage = (props) => {
    return(
        <div className='MainPage'>
            <Map 
                user={props.user}
                trackingEvent={props.trackingEvent}
                handleTracking={props.handleTracking}
                removeTrackingEvent={props.removeTrackingEvent}
            />
        </div>
    )
}

export default MainPage;