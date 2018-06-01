import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import userService from '../../utils/userService';
import socket from '../../utils/socket';
import './Map.css'

class Map extends Component {
    constructor(props){
        super(props);
        this.map = null;
    }

    drawMarkers = () => {
        this.userLocations.forEach(loc => {
            if (loc.marker) {
                loc.marker.setMap(null);
                loc.marker = null;
            }
            loc.marker = new window.google.maps.Marker({
                position: { lat: loc.lat, lng: loc.lng },
                map: this.map,
                title: loc.name,
                icon: loc.userId === this.props.user._id ? 'https://i.imgur.com/EvF2eZx.png' : 'https://i.imgur.com/jqyQN9V.png'
            });
        });
    }

    setupRealtime = () => {
        socket.emit('join-event', this.props.trackingEvent._id);
        window.navigator.geolocation.watchPosition(({coords}) => {
            socket.emit('update-location', {lat: coords.latitude, lng: coords.longitude});
            this.map = new window.google.maps.Map(this.mapDiv, 
                {
                    center: { lat: coords.latitude, lng: coords.longitude },
                    zoom: 12
                }
            );
        }, null, this.options);
        socket.on('update-locations', (locations) => {
            this.userLocations = locations;
            this.drawMarkers();
        });
    }
    /*--Lifecycle Methods--*/

    componentDidMount() {
        this.options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        if(this.props.trackingEvent) {
            this.setupRealtime();
        } else {
            window.navigator.geolocation.getCurrentPosition(({ coords }) => {
                this.map = new window.google.maps.Map(this.mapDiv, 
                    {
                        center: { lat: coords.latitude, lng: coords.longitude },
                        zoom: 18
                    }
                );
                var marker = new window.google.maps.Marker({
                    position: { lat: coords.latitude, lng: coords.longitude },
                    map: this.map,
                    draggable: true, 
                    animation: window.google.maps.Animation.DROP, 
                    title: this.props.user.name
                });
            }, null, this.options);
        }

    }

    componentWillUnmount() {
        this.props.trackingEvent && socket.emit('leave-event', this.props.trackingEvent._id);
        socket.off('update-locations');
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