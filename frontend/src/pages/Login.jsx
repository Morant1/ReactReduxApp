import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

import { loadUsers, login, logout, signup } from '../store/actions/userActions';

class _Login extends Component {
    state = {
        msg: '',
        loginCred: {
            password: '',
            username: ''
        },
        signupCred: {
            isAdmin: false,
            password: '',
            username: ''
        }
    };

    componentDidMount = () => {
        this.props.loadUsers();
    }

    loginHandleChange = ev => {
        const { name, value } = ev.target;
        this.setState(prevState => ({
            loginCred: {
                ...prevState.loginCred,
                [name]: value
            }
        }));
    };

    signupHandleChange = ev => {
        let { name, value } = ev.target;
        if (name === 'isAdmin') value = true;
        this.setState(prevState => ({
            signupCred: {
                ...prevState.signupCred,
                [name]: value
            }
        }));
    };

    doLogin = async ev => {
        ev.preventDefault();
        const { username, password } = this.state.loginCred;
        if (!username || !password) {
            return this.setState({ msg: 'Please enter username/password' });
        }
        const userCreds = { username, password };

        this.props.login(userCreds)
        .then(user=> {
            if (user) this.props.history.push('/toy')
        })

        this.setState({ loginCred: { username: '', password: '' } });
    };

    doSignup = async ev => {
        ev.preventDefault();
        const { isAdmin, password, username } = this.state.signupCred;
        console.log("sign-up Login", this.state.signupCred)
        if (!password || !username) {
            return this.setState({ msg: 'Username & password inputs are required!' });
        }
        const signupCreds = { isAdmin, password, username };
        
        this.props.signup(signupCreds)
        .then(user=> {
            if (user) this.props.history.push('/toy')
        })

        // this.props.loadUsers(); // Store and DB are not the same!
        this.setState({ signupCred: { isAdmin: false, password: '', username: '' } });
    };


    render() {
        return (
            <React.Fragment>
            <div className="log-sign-container flex center round">
                <form onSubmit={this.doSignup}>
                    <h2>{this.state.msg}</h2>
                    <input
                        type="text"
                        name="username"
                        value={this.state.signupCred.username}
                        onChange={this.signupHandleChange}
                        placeholder="Username"
                        autoComplete="off"
                        required
                    />
                    <br />
                    <input
                        name="password"
                        type="password"
                        value={this.state.signupCred.password}
                        onChange={this.signupHandleChange}
                        placeholder="Password"
                        required
                    />
                    <br />
                    <label htmlFor="admin" style={{color:'white'}}>Admin?</label>
                    <input id="admin" name="isAdmin" type="checkbox" value={true} onChange={this.signupHandleChange} />
                    <br />

                    <Button type="submit" size="small" variant="contained">Signup</Button>
                </form>
                <form onSubmit={this.doLogin}>
                    <input
                        type="text"
                        name="username"
                        value={this.state.loginCred.username}
                        onChange={this.loginHandleChange}
                        placeholder="Username"
                        autoComplete="off"
                        required
                    />
                    <br />
                    <input
                        type="password"
                        name="password"
                        value={this.state.loginCred.password}
                        onChange={this.loginHandleChange}
                        placeholder="Password"
                        required
                    />
                    <br />
                    <Button type="submit" size="small" variant="contained">Login</Button>
                </form>
            </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.userReducer.users,
        loggedInUser: state.userReducer.loggedInUser,
    };
};
const mapDispatchToProps = {
    login,
    logout,
    signup,
    loadUsers
};

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login)
