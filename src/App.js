import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import NavBar from './components/NavBar.js';
import Footer from './components/Footer.js';
import Example from './components/Example.js';
import Login from './components/Login.js';

class App extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Footer />
        
        <Route path="/example" component={Example} />
        <Route path="/login" component={Login} />
      </Router>
    )
  }
}

export default App;
