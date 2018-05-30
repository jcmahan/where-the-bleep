import React, { Component } from "react";
import "./App.css";
import {
  Link,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import userService from "../../utils/userService";
import tokenService from '../../utils/tokenService';
import MainPage from "../../pages/MainPage/MainPage";
import SignupPage from "../../pages/SignupPage/SignupPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import NavBar from '../../components/NavBar/NavBar';
import EventsPage from '../../pages/EventsPage/EventsPage';
import NewEventsPage from '../../pages/NewEventsPage/NewEventsPage';
import socket from '../../utils/socket';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: userService.getUser(), 
      user_location: null
    };
  }
  //---Helper Methods ---//

  //---Callback Methods---//
  handleLogin = () => {
    this.setState({ user: userService.getUser() });
    if (this.state.user) socket.emit('register', tokenService.getToken());
  };

  handleSignup = () => {
    this.setState({ user: userService.getUser() });
    if (this.state.user) socket.emit('register', tokenService.getToken());
  };

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
    if (this.state.user) socket.emit('register', null);
  };

  //---lifecycle methods ---//
  componentDidMount() {
    if (this.state.user) socket.emit('register', tokenService.getToken());

  }

  render() {
    return (
      <div className='App'>
        <header className="App-header">
          <h1 className="App-title">Where The &lt;Bleep&gt; Are You?!?</h1>
            <NavBar
              user={this.state.user}
              handleLogout={this.handleLogout}
              />
        </header>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <MainPage
                user={this.state.user}
                handleLogout={this.handleLogout}
                />
              )}
            />
            <Route
              exact
              path="/signup"
              render={props => (
                <SignupPage 
                {...props} 
                handleSignup={this.handleSignup} 
                />
              )}
            />
            <Route
              exact
              path="/login"
              render={props => (
                <LoginPage
                  {...props}
                  history={props.history}
                  handleLogin={this.handleLogin}
                />
              )}
            />
            <Route
              exact
              path="/newevent"
              render={props => 
              <NewEventsPage 
              user={this.state.user} 
              history={props.history}
              />}
            />
            <Route 
              exact 
              path='/events'
              render={props => 
              <EventsPage
              user={this.state.user}
              history={props.history}
              />}
            />
          </Switch>
      </div>
    );
  }
}

export default App;
