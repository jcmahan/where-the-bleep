import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import userService from '../../utils/userService';

class EventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eTitle: '',
            eDate: '', 
            eTime: '', 
            // eventHost: this.props.user.push([]),
        }
    }
    handleChange = (field, e) => {
        this.setState({
            [field]: e.target.value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault(); 
        userService.login(this.state)
        .then(() => {
            this.props.handleLogin();
            this.props.history.push('/');
        })
        .catch(err => alert('Invalid Credentials!'));
        }
    render() {
        return(
            <div>
                <header className='App-Header text-center'>LOG IN</header>
                    <form className='form-horizontal' onSubmit={this.handleSubmit} >
                        <div className='form-group'>
                            <div className='col-sm-12'>
                                <input type='text' className='form-control' placeholder='event title' value={this.state.eventTitle} onChange={(e) => this.handleChange('eTitle', e)} />
                            </div>   
                        </div>
                        <div className='form-group'>
                            <div className='col-sm-12'>
                                <input type='date' className='form-control' placeholder='event date' value={this.state.eventDate} onChange={(e) => this.handleChange('eDate', e)} />
                            </div>
                        </div>
                        <div className='form-group'>
                            <div className='col-sm-12'>
                                <input type='string' className='form-control' placeholder='event time' value={this.state.eventTime} onChange={(e) => this.handleChange('eTime', e)} />
                            </div>
                        </div>
                        <div className='form-group'>
                            <div className='col-sm-12 text-center'>
                                <button className='btn btn-secondary'>Log In</button>&nbsp;&nbsp;&nbsp;
                                <Link to='/'>Cancel</Link>
                            </div>
                        </div>
                    </form>
            </div>    
        );
    }
};

export default EventForm; 