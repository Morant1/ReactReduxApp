import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core';
import { withRouter } from "react-router";

import { logout } from '../store/actions/userActions';

class _Navbar extends Component {

    onLogout = () => {
        this.props.logout()
            .then(res => this.props.history.push('/'))

    }

    render() {
        return (
            <div className="navbar flex column">
                <div>
                    {this.props.loggedinUser ?
                        <Link to={`/toy`}><Button size="small" variant="contained">Home</Button></Link>
                        :
                        <Link to={`/`}><Button size="small" variant="contained">Home</Button></Link>
                    }
                    <Link to={`/about`}><Button size="small" variant="contained">About</Button></Link>
                    {this.props.loggedinUser && <Link to={`/dash`}><Button size="small" variant="contained">Our stores</Button></Link>}

                </div>
                <div>
                    <Button className="logout" onClick={this.onLogout} size="small" variant="contained">Logout
                    <img className="toy-img" alt="toy-img" style={{width:'30px'}}src="toy.png"/>
                    </Button>
                </div>
                {this.props.loggedinUser &&
                    <React.Fragment>
                    <h1 className="center">Welcome {this.props.loggedinUser.username}
                        {this.props.loggedinUser.isAdmin ? <span style={{ fontSize: '14px', color: 'lightblue' }}>   (Admin)</span> : ''}
                    </h1>
                    <div style={{fontSize:"10px",color:"lightgrey"}}>*Edit/Delete/Add options for Admin only</div>
                    </React.Fragment>}
            </div>
               
        
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedinUser: state.userReducer.loggedinUser
    }
}

const mapDispatchToProps = {
    logout
};

export const Navbar = connect(mapStateToProps, mapDispatchToProps)(withRouter(_Navbar))
