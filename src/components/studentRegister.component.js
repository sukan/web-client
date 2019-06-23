import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from '../components/images/sliit_logo.png';
import axios from 'axios';
import swal from 'sweetalert';

export default class StudentRegister extends Component {

    constructor(props){
        super(props);

        this.onChangeRegNo=this.onChangeRegNo.bind(this);
        this.onChangeFname =this.onChangeFname.bind(this);
        this.onChangeLname = this.onChangeLname.bind(this);
        this.onChangeEmail =this.onChangeEmail.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.onChangeConfirmPassword=this.onChangeConfirmPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
            regNo:'',
            fname:'',
            lname:'',
            role:'Student',
            email:'',
            password:'',
            confirmPassword:''
        }
    }

    onChangeRegNo(e) {
        this.setState({
            regNo: e.target.value
        });
    }

    onChangeFname(e) {
        this.setState({
            fname: e.target.value
        });
    }
    
    onChangeLname(e) {
        this.setState({
            lname: e.target.value
        });
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

    onChangeConfirmPassword(e) {
        this.setState({
            confirmPassword: e.target.value
        });
    }
    
    passwordMatch(){
        if(this.state.password !== '' && this.state.confirmPassword !== ''){
            if(this.state.password === this.state.confirmPassword ){
                console.log('password match');
                return (<p class="text-success">Password Match</p>);

            }else{
                console.log('password not match');
                return (<p class="text-danger">Password not matching '</p>);
            }
        }
    }
    onSubmit(e){
        e.preventDefault();

        if(this.state.password !== '' && this.state.confirmPassword !== ''){
            if(this.state.password === this.state.confirmPassword ){
                const user= {
                    regNo:this.state.regNo,
                    fname:this.state.fname,
                    lname:this.state.lname,
                    role:'Student',
                    email:this.state.email,
                    password:this.state.password,
                }

                axios.post('https://stormy-coast-77416.herokuapp.com/api/users/add', user)
                    .then(result => {
                        swal("Successful", "Account adding Successfull", "success");
                        this.props.history.push('/');
                    }).catch(error => {
                        swal("Error", "Error in adding Account :Email or Reg number may be already in use", "error");
                    });
            }

        }
    }
    
    render() {
        return (
            <div style={{background:'#e0e0e0'}}>
                <div className="col-md-3  mx-auto" style={{paddingTop:'12vh',paddingBottom:'23.5vh'}}>
                    <div className="text-center">
                        <form className="form-signin" onSubmit={this.onSubmit}>
                            <img class="mb-4" src={logo} alt="" width="60" height="72"/>
                            <h1 className="h3 mb-1 font-weight-normal" style={{paddingBottom:'10%'}}>Sign Up</h1>
                            
                            <label for="inputRegNo" className="sr-only">Register Number</label>
                            <input type="text" className="form-control"
                                   style={{marginBottom:'3%'}} 
                                   placeholder="Register Number"
                                   value={this.state.regNo}
                                   onChange={this.onChangeRegNo} 
                                   required autofocus='autofocus'/>

                            <label for="inputFname" className="sr-only">First Name</label>
                            <input type="text" className="form-control" 
                                   style={{marginBottom:'3%'}}
                                   placeholder="First Name"
                                   value={this.state.fname}
                                   onChange={this.onChangeFname} 
                                   required />

                            <label for="inputLname" className="sr-only">Last Name</label>
                            <input type="text" className="form-control" 
                                   style={{marginBottom:'3%'}}
                                   placeholder="Last Name"
                                   value={this.state.lname}
                                   onChange={this.onChangeLname} 
                                   required />
                            
                            <label for="inputEmail" className="sr-only">Email address</label>
                            <input type="email" className="form-control" 
                                   style={{marginBottom:'3%'}}
                                   placeholder="Email address"
                                   value={this.state.email}
                                   onChange={this.onChangeEmail} 
                                   required />
                                   
                            <label for="inputPassword" className="sr-only">Password</label>
                            <input type="password" 
                                   className="form-control"
                                   style={{marginBottom:'3%'}}
                                   placeholder="Password" 
                                   value={this.state.password}
                                   onChange={this.onChangePassword}
                                   required/>

                            <label for="inputPassword" className="sr-only">Confirm Password</label>
                            <input type="password" 
                                   style={{marginBottom:'3%'}}
                                   className="form-control"
                                   placeholder="Confirm Password" 
                                   value={this.state.confirmPassword}
                                   onChange={this.onChangeConfirmPassword}
                                   required/>
                            <span>{this.passwordMatch()}</span>
                            <br/>

                            <button className="btn  btn-primary btn-block" type="submit">Register</button> 
                            <h6 className="h6 mb-1 font-weight-normal" >Already Have an Account ?  
                            <Link to="/login"> Log in</Link></h6>
                            <p className="mt-5 mb-3 text-muted">&copy; 2002-2019</p>

                        </form>
                    </div>
                </div>
            </div> 
        )
    }

}