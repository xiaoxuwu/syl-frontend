import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import NavBar from './components/NavBar.js';
import Footer from './components/Footer.js';
import Example from './components/Example.js';
import ExampleGet from './components/ExampleGet.js';
import Dashboard from './components/Dashboard.js';
import Login from './components/Login.js';
import Links from './components/Links.js';

class App extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Footer />
        
        <Route path="/example" component={Example} />
        <Route path="/get" component={ExampleGet} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/links" component={Links} />
      </Router>
    )
  }
}

export default App;
