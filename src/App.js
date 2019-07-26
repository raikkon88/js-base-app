import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";

import Index from "./components/index.component";
import Login from "./components/login.component";
import Admin from "./components/admin";

const PrivateRoute = ({ component: Component, ...rest }) => (
  
  <Route {...rest} render={(props) => (  
    localStorage.getItem('token') ? (
      <Component {...props} />
    ) : (
      <Redirect to='/login' />
    )
  )} />
)

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        isAuthenticated: null
    }
  }

  componentWillMount() {
    this.setState({
      isAuthenticated: localStorage.getItem('token') ? true : false
    })
  }

  render(){
    const { isAuthenticated } = this.state;
    return (
      <Router>
          <div>
            <Switch>
              <Route path="/" exact component={Index} />
              <Route path="/login" exact component={Login} />
              <PrivateRoute path="/dashboard" exact component={Admin} />
              
            </Switch>
          </div>
      </Router>
    );

  }
}
/*<div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link to="/" className="navbar-brand">APP Name</Link>
              <div className="collpase navbar-collapse">
                { isAuthenticated &&
                <ul className="navbar-nav mr-auto">  
                  <li className="navbar-item">
                    <a onClick={ event => { localStorage.removeItem('token'); window.location = "/"} } className="nav-link">Logout</a>
                  </li>
                </ul>
                }
                {
                  !isAuthenticated && 
                  <ul className="navbar-nav mr-auto">  
                    <li className="navbar-item">
                      <Link to="/login" className="nav-link">Login</Link>
                    </li>
                  </ul>
                }
              </div> 
            </nav>
            <br/>*/