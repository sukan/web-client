import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";
import logo from '../images/sliit_logo.png'

export default class Header extends Component {
   
    render() {
        if(sessionStorage.getItem('isloged')){
            return(
                    <nav className="navbar navbar-expand-lg navbar-dark" style={{background:'#1a237e'}}>
                        <div className="container">
                            <Link className="navbar-brand" to="/">
                                <img src={logo} width="32" height="40" />
                                 <span> Sri Lanka Institute of Information Tecnology</span>
                                </Link>
                            <div className="collapse navbar-collapse">
                                <form className="form-inline my-5 my-md-2" style={{paddingLeft:'10%'}}>
                                    <input className="form-control form-control-sm" type="text" placeholder="Search" aria-label="Search"/>
                                </form>
                            </div>
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item dropdown">
                                    <a className="nav-link py-0 dropdown-toggle active" id="dropdown08" 
                                    data-toggle="dropdown" aria-haspopup="true" 
                                    aria-expanded="false">Hi , {sessionStorage.getItem('fname')}</a>
                                    <div className="dropdown-menu" aria-labelledby="dropdown08">
                                        <Link className="dropdown-item"  to="/logout">Log Out</Link>
                                        <hr></hr>
                                        <Link className="dropdown-item" to={"/user/"+sessionStorage.getItem('id')}>Profile</Link>
                                    </div>
                                </li>
                            </ul>
                            
                        </div>
                    </nav>
            );
        }
        else{
            return(
                <div>
                </div>
            );
        }
    }

}