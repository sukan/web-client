import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from '../components/images/sliit_logo.png';
import axios from 'axios';
import swal from 'sweetalert';

export default class Login extends Component {

    constructor(props){
        super(props);

        this.onChangeEmail =this.onChangeEmail.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
            email:'',
            password:''
        }
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const user= {
            email:this.state.email,
            password:this.state.password
        }

        axios.post('http://localhost:8080/api/user/validate/', user)
            .then(result => {

                let validUser=result.data;
                if(result.data===[]){
                    this.state={
                        email:'',
                        password:''
                    }
                    swal("Invalid", "Invalid Username or Password", "error");
                }else{
                    //create session variables and assign currently logged user details as values
                    sessionStorage.setItem('isloged',true);
                    sessionStorage.setItem('id',validUser.id);
                    sessionStorage.setItem('regNo',validUser.regNo);
                    sessionStorage.setItem('fname',validUser.fname);
                    sessionStorage.setItem('lname',validUser.lname);
                    sessionStorage.setItem('role',validUser.role);
                    sessionStorage.setItem('email',validUser.email);
                    sessionStorage.setItem('password',validUser.password);
                    
                    this.props.history.push('/');
                    window.location.reload();
                }
            }).catch(error => {
                swal("Invalid", "Invalid Username or Password", "error");
            });

    }
    
    render() {
        return (
            <div style={{background:'#e0e0e0'}}>
                <div className="col-md-3  mx-auto" style={{paddingTop:'24vh',paddingBottom:'35vh'}}>
                    <div className="text-center">
                        <form className="form-signin" onSubmit={this.onSubmit}>
                            <img class="mb-4" src={logo} alt="" width="60" height="72"/>
                            <h1 className="h3 mb-1 font-weight-normal" style={{paddingBottom:'10%'}}>Please sign in</h1>
                            <label for="inputEmail" className="sr-only">Email address</label>
                            <input type="email" className="form-control" 
                                   placeholder="Email address"
                                   value={this.state.email}
                                   onChange={this.onChangeEmail} 
                                   required autofocus='autofocus'/>
                            <label for="inputPassword" className="sr-only">Password</label>
                            <input type="password" 
                                   className="form-control"
                                   placeholder="Password" 
                                   value={this.state.password}
                                   onChange={this.onChangePassword}
                                   required/>
                            <br/>
                            <button className="btn  btn-primary btn-block" type="submit">Sign in</button> 
                            <h6 className="h6 mb-1 font-weight-normal" >Don't Have a Account ? Create A 
                            <Link to="/register"> Student Account</Link></h6>
                            <p className="mt-5 mb-3 text-muted">&copy; 2002-2019</p>

                        </form>
                    </div>
                </div>
            </div> 
        )
    }

}