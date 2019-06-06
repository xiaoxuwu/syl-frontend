import React, { Component } from 'react';
import {removeToken} from './AuthService'
import { Redirect } from 'react-router'

class Logout extends Component {
    componentDidMount() {
        removeToken()
        this.props.setLoginCallback(false)
    }

    render() {
        return <Redirect to='/influencer/' />
    }
}

export default Logout;