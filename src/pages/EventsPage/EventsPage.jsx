import React, {Component} from 'react';
import tokenService from '../../utils/tokenService';
import EventIndexPage from '../../pages/EventIndexPage/EventIndexPage';
import NavBar from '../../components/NavBar/NavBar'
import './EventsPage.css'

class EventsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [], 
        }
    }

    updateEvents = (events) => {
        this.setState({events});
    } 

    componentDidMount() {
        fetch('/api/events', this.getAuthRequestOptions('GET'))
        .then(res => {
            if (res.ok) return res.json();
            throw new Error ('Bad Credentials!');
        })
        .then(events => this.setState({events}));
    }
/*-Helper Methods-*/

    getAuthRequestOptions(method) {
        return {
            method: method, 
            headers: new Headers({'Authorization': 'Bearer ' + tokenService.getToken()})
        };
    }

    render() {
        return (
        <div className='EventPage'>
            <EventIndexPage
                user={this.props.user}
                history={this.props.history}
                events={this.state.events}
                updateEvents={this.updateEvents}
                handleTracking={this.props.handleTracking}
            />
        </div>
    );
};
}

export default EventsPage; 