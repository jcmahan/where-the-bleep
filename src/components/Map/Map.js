import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import userService from '../../utils/userService';
import './Map.css'

class Map extends Component {
    constructor(props){
    super(props);
    this.state = {
        usersLocations: []
    };
    this.map = null;
}
/*--Lifecycle Methods--*/

componentDidMount() {

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

    window.navigator.geolocation.getCurrentPosition(({ coords }) => {
        console.log(coords);

        this.map = new window.google.maps.Map(this.mapDiv, 
            {
                center: { lat: coords.latitude, lng: coords.longitude },
                zoom: 20
            }
        );

        var marker = new window.google.maps.Marker({
            position: { lat: coords.latitude, lng: coords.longitude },
            map: this.map,
            draggable: true, 
            animation: window.google.maps.Animation.DROP, 
            title: "Hello!"
        });
    }, null, options);

    }

    render() {
        return ( 
            <div id='map' ref={(div) => this.mapDiv = div}>
                <br/>
                <img src='https://i.imgur.com/6mq8iXE.gif' />
                <br/>
                <br/>
                <h1>Big Brother is trying to find you...</h1>
                <br/>
            </div>
        );
    }
}

export default Map; 