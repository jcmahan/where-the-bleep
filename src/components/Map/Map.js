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
                            "color": "#f5f5f5"
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
                            "color": "#616161"
                            }
                        ]
                        },
                        {
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                            "color": "#f5f5f5"
                            }
                        ]
                        },
                        {
                        "featureType": "administrative.country",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                            "color": "#3c2bff"
                            }
                        ]
                        },
                        {
                        "featureType": "administrative.land_parcel",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                            "color": "#3123dc"
                            }
                        ]
                        },
                        {
                        "featureType": "administrative.land_parcel",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                            "color": "#bdbdbd"
                            }
                        ]
                        },
                        {
                        "featureType": "administrative.locality",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                            "weight": 0.5
                            }
                        ]
                        },
                        {
                        "featureType": "administrative.locality",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                            "color": "#000000"
                            }
                        ]
                        },
                        {
                        "featureType": "administrative.neighborhood",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                            "color": "#3123dc"
                            },
                            {
                            "weight": 2.5
                            }
                        ]
                        },
                        {
                        "featureType": "administrative.province",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                            "color": "#3c2bff"
                            }
                        ]
                        },
                        {
                        "featureType": "landscape.man_made",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                            "color": "#000000"
                            }
                        ]
                        },
                        {
                        "featureType": "landscape.natural.landcover",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                            "color": "#3c2bff"
                            }
                        ]
                        },
                        {
                        "featureType": "landscape.natural.terrain",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                            "color": "#3c2bff"
                            }
                        ]
                        },
                        {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [
                            {
                            "color": "#eeeeee"
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
                        "featureType": "poi.attraction",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                            "color": "#000000"
                            }
                        ]
                        },
                        {
                        "featureType": "poi.business",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                            "color": "#000000"
                            }
                        ]
                        },
                        {
                        "featureType": "poi.government",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                            "color": "#000000"
                            }
                        ]
                        },
                        {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [
                            {
                            "color": "#e5e5e5"
                            }
                        ]
                        },
                        {
                        "featureType": "poi.park",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                            "color": "#9e9e9e"
                            }
                        ]
                        },
                        {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [
                            {
                            "color": "#ffffff"
                            }
                        ]
                        },
                        {
                        "featureType": "road.arterial",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                            "color": "#a09bff"
                            }
                        ]
                        },
                        {
                        "featureType": "road.arterial",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                            "color": "#0b0b0b"
                            }
                        ]
                        },
                        {
                        "featureType": "road.highway",
                        "elementType": "geometry",
                        "stylers": [
                            {
                            "color": "#dadada"
                            }
                        ]
                        },
                        {
                        "featureType": "road.highway",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                            "color": "#3c2bff"
                            }
                        ]
                        },
                        {
                        "featureType": "road.highway",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                            "color": "#616161"
                            }
                        ]
                        },
                        {
                        "featureType": "road.local",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                            "color": "#a09bff"
                            }
                        ]
                        },
                        {
                        "featureType": "road.local",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                            "color": "#050505"
                            }
                        ]
                        },
                        {
                        "featureType": "road.local",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                            "color": "#b7b7b7"
                            }
                        ]
                        },
                        {
                        "featureType": "transit.line",
                        "elementType": "geometry",
                        "stylers": [
                            {
                            "color": "#e5e5e5"
                            }
                        ]
                        },
                        {
                        "featureType": "transit.station",
                        "elementType": "geometry",
                        "stylers": [
                            {
                            "color": "#eeeeee"
                            }
                        ]
                        },
                        {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                            {
                            "color": "#c9c9c9"
                            }
                        ]
                        },
                        {
                        "featureType": "water",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                            "color": "#9e9e9e"
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