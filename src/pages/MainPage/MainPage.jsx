import React from 'react';
import {Link} from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import Map from '../../components/Map/Map';
import './MainPage.css';

const MainPage = (props) => {
    return(
        <div className='MainPage'>
            <Map 
                user={props.user}
            />
        </div>
    )
}

export default MainPage;