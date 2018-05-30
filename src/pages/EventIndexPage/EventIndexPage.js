import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import eventAPI from "../../utils/eventAPI";

class EventIndexPage extends Component {
    render() {
        const eventRows = this.props.events.map((post, idx) => 
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
            <td>{event.eventHost}</td>
            <td>{event.eventAttendees}</td>

        <Link className="HighScores-cancel btn btn-default btn-sm" to={`/events/index/${event._id}`} style={{ marginTop: 40 }}>
            See This Event
        </Link>
        </tr>);

        return (
            <div className="HighScores">
            <header className="header-footer">Home Page</header>
            {this.props.events.length ? (
            <table className="table HighScores-table text-info">
                <thead>
                    <tr>
                        <th width={80}>Event Name</th>
                        <th width={100}>Address</th>
                        <th width={100}>City</th>
                        <th width={100}>State</th>
                        <th width={100}>Date</th>
                        <th width={100}>Time</th>
                        <th width={100}>See This Post</th>
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
