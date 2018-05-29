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
}

    render() {
        return ( 
            <div id='map' ref={(div) => this.mapDiv = div}>
                <h1>Loading...</h1>
            </div>
        );
    }
}

export default Map; 