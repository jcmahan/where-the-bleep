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
        var styledMapType = new window.google.maps.StyledMapType(
            [
                {
                    "elementType": "geometry",
                    "stylers": [
                    {
                        "color": "#ebe3cd"
                    }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                    {
                        "color": "#523735"
                    }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                    {
                        "color": "#f5f1e6"
                    }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [
                    {
                        "color": "#c9b2a6"
                    }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "geometry.stroke",
                    "stylers": [
                    {
                        "color": "#dcd2be"
                    }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels",
                    "stylers": [
                        {
                        "visibility": "off"
                        }
                    ]
                },
                    {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                        "color": "#ae9e90"
                        }
                    ]
                    },
                    {
                    "featureType": "administrative.neighborhood",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                        "color": "#3c82ff"
                        }
                    ]
                    },
                    {
                    "featureType": "administrative.neighborhood",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                        "color": "#fff5f5"
                        }
                    ]
                    },
                    {
                    "featureType": "landscape.natural",
                    "elementType": "geometry",
                    "stylers": [
                        {
                        "color": "#dfd2ae"
                        }
                    ]
                    },
                    {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                        "color": "#dfd2ae"
                        }
                    ]
                    },
                    {
                    "featureType": "poi",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                        "visibility": "off"
                        }
                    ]
                    },
                    {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                        "color": "#93817c"
                        }
                    ]
                    },
                    {
                    "featureType": "poi.business",
                    "stylers": [
                        {
                        "visibility": "simplified"
                        }
                    ]
                    },
                    {
                    "featureType": "poi.park",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                        "color": "#a5b076"
                        }
                    ]
                    },
                    {
                    "featureType": "poi.park",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                        "visibility": "off"
                        }
                    ]
                    },
                    {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                        "color": "#447530"
                        }
                    ]
                    },
                    {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                        "color": "#f5f1e6"
                        }
                    ]
                    },
                    {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [
                        {
                        "color": "#fdfcf8"
                        }
                    ]
                    },
                    {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                        "color": "#f8c967"
                        }
                    ]
                    },
                    {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                        "color": "#e9bc62"
                        }
                    ]
                    },
                    {
                    "featureType": "road.highway.controlled_access",
                    "elementType": "geometry",
                    "stylers": [
                        {
                        "color": "#e98d58"
                        }
                    ]
                    },
                    {
                    "featureType": "road.highway.controlled_access",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                        "color": "#db8555"
                        }
                    ]
                    },
                    {
                    "featureType": "road.local",
                    "elementType": "labels",
                    "stylers": [
                        {
                        "visibility": "off"
                        }
                    ]
                    },
                    {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                        "color": "#806b63"
                        }
                    ]
                    },
                    {
                    "featureType": "transit.line",
                    "elementType": "geometry",
                    "stylers": [
                        {
                        "color": "#dfd2ae"
                        }
                    ]
                    },
                    {
                    "featureType": "transit.line",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                        "color": "#8f7d77"
                        }
                    ]
                    },
                    {
                    "featureType": "transit.line",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                        "color": "#ebe3cd"
                        }
                    ]
                    },
                    {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [
                        {
                        "color": "#dfd2ae"
                        }
                    ]
                    },
                    {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                        "color": "#b9d3c2"
                        }
                    ]
                    },
                    {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                        "color": "#92998d"
                        }
                    ]
                    }
                ], 
                {name: 'Styled Map'});  
        window.navigator.geolocation.watchPosition(({coords}) => {
            socket.emit('update-location', {lat: coords.latitude, lng: coords.longitude});
            this.styledMapType = new window.google.maps.Map(this.mapDiv, 
                {
                    center: { lat: coords.latitude, lng: coords.longitude },
                    zoom: 12, 
                    mapTypeControlOptions: {
                        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                                'styled_map']
                    }
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
            timeout: 5000,
            maximumAge: 1000
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