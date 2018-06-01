import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import eventAPI from "../../utils/eventAPI";
import './EventIndexPage.css'

class EventIndexPage extends Component {
    formatDate(x) {
        var str = x.split("-");
        return str[1] + "/" + str[2].substring(0, 2) + "/" + str[0];
    }

    joinEvent(e, event) {
        e.preventDefault();
        eventAPI.joinEvt(event, this.props.user)
        .then(events => {
            this.props.updateEvents(events);
        });
    }

    render() {
        const eventRows = this.props.events.length ? this.props.events.map((event, idx) => 
            <tr key={idx}>
                <td>{event.eventTitle}</td>
                <td>{event.eventStreetAddress}</td>
                <td>{event.eventCity}</td>
                <td>{event.eventState}</td>
                <td>{this.formatDate(event.eventDate)}</td>
                <td>{event.eventTime}</td>
                <td>{(
                    (this.props.user._id === event.eventHost) ||
                    event.eventAttendees.includes(this.props.user._id)
                    ) ? <button onClick={() => this.props.handleTracking(event)} className="btn btn-danger btn-sm" style={{ marginRight: 25 }}>
                    &#191;WTBAY&#63;
                        </button> 
                        :
                        <button onClick={(e) => this.joinEvent(e, event)} className="btn btn-dark btn-sm" style={{ marginRight: 25 }}>
                            Join Event
                        </button>
                    }
                </td>
            </tr>)
        :
            <h1>Loading...</h1>

        return (
            <div className="EvtIdx">
            {this.props.events.length ? (
            <table className="table EvtIdx-tableData text-info">
                <thead className="headers">
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
