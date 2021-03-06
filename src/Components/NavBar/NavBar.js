import React from 'react'; 
import {Link} from 'react-router-dom';
import './NavBar.css';

const NavBar = (props) => {
    let nav = props.user ?
    <div>
        <Link to='/newevent' className='NavBar-link' >CREATE NEW EVENT</Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <Link to='/events' className='NavBar-link' >SEE ALL EVENTS</Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <Link to='' className='NavBar-link' onClick={props.handleLogout} >LOG OUT</Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <span className='NavBar-welcome'>WELCOME, {props.user.name}</span>
        <br/>
        <span className='NavBar-trackingEvent'>{ props.trackingEvent ? `currently tracking people attending ${props.trackingEvent.eventTitle}` : 'not currently tracking any events' } </span>
    </div>
    :
    <div>
        <Link to='/login' className='NavBar-link'>LOG IN</Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <Link to='/signup' className='NavBar-link'>SIGN UP</Link>
    </div>;
    return (
        <div className='NavBar'>
        {nav}
        </div>
    );
};

export default NavBar; 