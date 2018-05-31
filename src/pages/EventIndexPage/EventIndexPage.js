import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import eventAPI from "../../utils/eventAPI";
import './EventIndexPage.css'

class EventIndexPage extends Component {
    render() {
        const eventRows = this.props.events ? this.props.events.map((event, idx) => 
        <tr key={idx}>
            <td>
                <span className="badge">{idx + 1}</span>
            </td>
            <td>{event.eventTitle}</td>
            <td>{event.eventStreetAddress}</td>
            <td>{event.eventCity}</td>
            <td>{event.eventState}</td>
            <td>{event.eventDate}</td>
            <td>{event.eventTime}</td>

        <button type='button' class="btn btn-dark btn-sm" to={`/events/index/${event._id}`} style={{ marginTop: 40 }}>
            Join Event
        </button>

        </tr>) : <h1>Loading...</h1>

        return (
            <div className="HighScores">
            {this.props.events.length ? (
            <table className="table HighScores-table text-info">
                <thead>
                    <tr>
                        <th width={50}>Event Number</th>
                        <th width={50}>Event Name</th>
                        <th width={150}>Address</th>
                        <th width={100}>City</th>
                        <th width={100}>State</th>
                        <th width={100}>Date</th>
                        <th width={100}>Time</th>
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
