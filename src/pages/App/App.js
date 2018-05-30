import React, { Component } from "react";
import "./App.css";
import {
  Link,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import userService from "../../utils/userService";
import MainPage from "../../pages/MainPage/MainPage";
import SignupPage from "../../pages/SignupPage/SignupPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import EventPage from '../../pages/EventPage/EventPage';
import NavBar from '../../components/NavBar/NavBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      user_location: null
    };
  }
  //---Helper Methods ---//

  //---Callback Methods---//
  handleLogin = () => {
    this.setState({ user: userService.getUser() });
  };

  handleSignup = () => {
    this.setState({ user: userService.getUser() });
  };

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  };

  //---lifecycle methods ---//
  componentDidMount() {
    let user = userService.getUser();
    this.setState({ user });
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
              path="/events"
              render={props => 
              <EventPage 
              {...props} 
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
