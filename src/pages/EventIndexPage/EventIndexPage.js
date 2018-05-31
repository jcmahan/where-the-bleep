import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import eventAPI from "../../utils/eventAPI";
import './EventIndexPage.css'

class EventIndexPage extends Component {

    formatDate(x) {
        var str = x.split("-");
        return str[1] + "/" + str[2].substring(0, 2) + "/" + str[0];
    }

    joinEvent(evt) {
        eventAPI.joinEvt(evt, this.props.user).then(res => res.json())
        .then(events => {
            this.props.history.push('/')
        })
        
    }

    render() {
        const eventRows = this.props.events ? this.props.events.map((event, idx) => 
        
        <tr key={idx}>
            <td>{event.eventTitle}</td>
            <td>{event.eventStreetAddress}</td>
            <td>{event.eventCity}</td>
            <td>{event.eventState}</td>
            <td>{this.formatDate(event.eventDate)}</td>
            <td>{event.eventTime}</td>
            <td><button onClick={() => this.joinEvent(event)} type='button' className="btn btn-dark btn-sm" to={`/events/index/${event._id}`} style={{ marginTop: 25, marginRight: 25 }}>
            Join Event
        </button></td>
        </tr>) : <h1>Loading...</h1>

        return (
            <div className="HighScores">
            {this.props.events.length ? (
            <table className="table HighScores-table text-info">
                <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>{eventRows}</tbody>
            </table>
            ) : (
            <h4 className="text-info">No Upcoming Events</h4>
            )}
            <div>
        </div>
    </div>
    );
    }
}

export default EventIndexPage;
