import React from 'react';
import {Link} from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';

const MainPage = (props) => {
    return(
        <div className='MainPage'>
            <NavBar
                user={props.user}
                handleLogout={props.handleLogout}
            />
        </div>
    )
}

export default MainPage;