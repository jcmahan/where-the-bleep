import React from 'react';
import {Link} from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import LocateUser from '../../components/LocateUser/LocateUser';
import Map from '../../components/Map/Map';
import './MainPage.css';

const MainPage = (props) => {
    return(
        <div className='MainPage'>
            <NavBar
                user={props.user}
                handleLogout={props.handleLogout}
            />
            <Map />
        </div>
    )
}

export default MainPage;