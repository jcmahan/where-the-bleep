import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "../../utils/userService";
import tokenService from "../../utils/tokenService";
import eventAPI from "../../utils/eventAPI";

class EventForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      eTitle: "",
      eAddress: "",
      eCity: "",
      eState: "",
      eDate: "",
      eTime: ""
    };
  }
  handleChange = (field, e) => {
    this.setState({
      [field]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();

    fetch("/api/events/create", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenService.getToken()
      }),
      body: JSON.stringify({
        eventTitle: this.state.eTitle,
        eventAddress: this.state.eAddress,
        eventCity: this.state.eCity,
        eventState: this.state.eState,
        eventDate: this.state.eDate,
        eventTime: this.state.eTime,
        eventHost: this.props.user._id
      })
    }).then(() => {
        this.props.history.push('/');
    })
  };

  render() {
    return (
      <div>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                placeholder="event title"
                value={this.state.eventTitle}
                onChange={e => this.handleChange("eTitle", e)}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                placeholder="street address"
                value={this.state.eventAddress}
                onChange={e => this.handleChange("eAddress", e)}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                placeholder="city"
                value={this.state.eventCity}
                onChange={e => this.handleChange("eCity", e)}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                placeholder="state"
                value={this.state.eventState}
                onChange={e => this.handleChange("eState", e)}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="date"
                className="form-control"
                placeholder="event date"
                value={this.state.eventDate}
                onChange={e => this.handleChange("eDate", e)}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="string"
                className="form-control"
                placeholder="event time"
                value={this.state.eventTime}
                onChange={e => this.handleChange("eTime", e)}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              <button className="btn btn-secondary">Create Event</button>&nbsp;&nbsp;&nbsp;
              <Link to="/">Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default EventForm;
