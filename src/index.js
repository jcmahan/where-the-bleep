import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { render } from 'react-dom';
import App from './pages/App/App';
import './index.css'

render((
    <Router>
        <App /> 
    </Router>
), document.getElementById('root'));
