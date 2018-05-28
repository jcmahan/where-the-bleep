import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import userService from '../../utils/userService';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pw: ''
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
                                <input type='email' className='form-control' placeholder='email' value={this.state.email} onChange={(e) => this.handleChange('email', e)} />
                            </div>   
                        </div>
                        <div className='form-group'>
                            <div className='col-sm-12'>
                                <input type='password' className='form-control' placeholder='password' value={this.state.pw} onChange={(e) => this.handleChange('pw', e)} />
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

export default LoginForm; 