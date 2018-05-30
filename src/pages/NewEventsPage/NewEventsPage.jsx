import React, {Component} from 'react';
import tokenService from '../../utils/tokenService';
import EventForm from '../../components/EventForm/EventForm';
import NavBar from '../../components/NavBar/NavBar'
import './NewEventsPage.css'

class NewEventsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [], 
        }
    }
    componentDidMount() {
        fetch('/api/events'/*, this.getAuthRequestOptions('GET')*/)
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
        headers: new Headers({'Authorization': 'Bearer' + tokenService.getToken()})
    };
}

    render() {
        return (
        <div className='EventPage'>
            <EventForm
                user={this.props.user}
                history={this.props.history}
            />
        </div>
    );
};
}

export default NewEventsPage; 