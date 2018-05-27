import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter, 
  Link, 
  Switch, 
  Route
} from 'react-router-dom';
import userService from ('../../utils/userService');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      user_location: null, 
    } 
  }
  //---Helper Methods ---//

  //---Callback Methods---//
  handleSignup = () => {
    this.setState({user: userService.getUser()});
  }

  handleLogout = () => {
    userService.logout();
    this.setState({user:null});
  }

  //---lifecycle methods ---//
  componentDidMount() {
    let user = userService.getUser(); 
    this.setState({user});
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Where The &lt;Bleep&gt; Are You?!?</h1>
        </header>
          <Router>
            <Switch>
              <Route exact path='/' render={() => 
              <MainPage
                user={this.state.user}
                handleLogout={this.handleLogout}
              />
              }/>
              <Route exact path='/signup' render={(props) => 
              <SignupPage
              {...props}
                handleSignup={this.handleSignup}              
              />
              }/>
              <Route exact path='/login' render={(props) =>
              <LoginPage
                history={props.history}
                handleLogin={this.handleLogin}
              />
              }/>
              </Switch>
            </Router>
      </div>
    );
  }
}

export default App;
