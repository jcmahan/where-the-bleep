import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import userService from '../../utils/userService';
import './Map.css'

class Map extends Component{
    constructor(props){
    super(props);
    this.state = {
        usersLocations: [],
        map: null
    };
}
/*--Lifecycle Methods--*/

componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(({coords}) => {
        this.map = new window.google.maps.Map(this.mapDiv, 
            {
                center: { lat: coords.latitude, lng: coords.longitude },
                zoom: 15
            }
        );       
    });
    // var marker = new window.google.maps.Marker({
    //     position: { lat: user.coords.latitude, lng: user.coords.longitude },
    //     map: this.map,
    //     title: '{user.name}'
    // });
}

    render() {
        return ( 
            <div id='map' ref={(div) => this.mapDiv = div}>
                <h1>Big Brother is trying to find you...</h1>
                <br/>
                <br/>
                <img src='https://i.imgur.com/QyK3QKe.gif'/>
            </div>
        );
    }
}

export default Map; 