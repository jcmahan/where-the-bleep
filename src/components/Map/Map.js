import React, { Component } from 'react';
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
                    zoom: 12,
                });
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
            timeout: 15000,
            maximumAge: 0
        };
        if(this.props.trackingEvent) {
            this.setupRealtime();
        } else {
            window.navigator.geolocation.getCurrentPosition(({ coords }) => {
                this.mapStyle = [
                    {
                    "elementType": "geometry",
                    "stylers": [
                    {
                        "color": "#212121"
                    }
                    ]
                },
                {
                    "elementType": "labels.icon",
                    "stylers": [
                    {
                        "visibility": "off"
                    }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                    {
                        "color": "#757575"
                    }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                    {
                        "color": "#212121"
                    }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [
                    {
                        "color": "#757575"
                    }
                    ]
                },
                {
                    "featureType": "administrative.country",
                    "elementType": "labels.text.fill",
                    "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "stylers": [
                    {
                        "visibility": "off"
                    }
                    ]
                },
                {
                    "featureType": "administrative.locality",
                    "elementType": "labels.text.fill",
                    "stylers": [
                    {
                        "color": "#bdbdbd"
                    }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                    {
                        "color": "#757575"
                    }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [
                    {
                        "color": "#181818"
                    }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                    {
                        "color": "#616161"
                    }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                    {
                        "color": "#1b1b1b"
                    }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.fill",
                    "stylers": [
                    {
                        "color": "#2c2c2c"
                    }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [
                    {
                        "color": "#8a8a8a"
                    }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [
                    {
                        "color": "#373737"
                    }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                    {
                        "color": "#3c3c3c"
                    }
                    ]
                },
                {
                    "featureType": "road.highway.controlled_access",
                    "elementType": "geometry",
                    "stylers": [
                    {
                        "color": "#4e4e4e"
                    }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [
                    {
                        "color": "#616161"
                    }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "labels.text.fill",
                    "stylers": [
                    {
                        "color": "#757575"
                    }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                    {
                        "color": "#000000"
                    }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                    {
                        "color": "#3d3d3d"
                    }
                    ]
                }
                ]
                this.map = new window.google.maps.Map(this.mapDiv, 
                    {
                        center: { lat: coords.latitude, lng: coords.longitude },
                        zoom: 18,
                        styles: this.mapStyle 
                    }
                );
                new window.google.maps.Marker({
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
        this.props.removeTrackingEvent();
        socket.off('update-locations');
    }

    render() {
        return ( 
            <div id='map' ref={(div) => this.mapDiv = div}>
                <br/>
                <img src='https://i.imgur.com/6mq8iXE.gif' alt="placeholder while map loads" />
                <br/>
                <br/>
                <h1>Big Brother is trying to find you...</h1>
                <br/>
            </div>
        );
    }
}

export default Map; 