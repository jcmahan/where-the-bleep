import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { render } from 'react-dom';
import App from './pages/App/App';
import './index.css'
import './utils/socket'

render((
    <Router>
        <Route render={(props) => <App history={props.history} />} />
    </Router>
), document.getElementById('root'));
