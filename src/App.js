import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter, 
  Link, 
  Switch, 
  Route
} from 'react-router-dom';

class App extends Component {
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
