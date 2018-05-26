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
      </div>
    );
  }
}

export default App;
