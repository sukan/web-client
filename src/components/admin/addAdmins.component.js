import React, { Component } from 'react';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import axios from 'axios';


export default class AddAdmin extends Component {

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
            role:'Admin',
            email:'',
            password:'',
            confirmPassword:''
        }
    }
    
    componentDidMount(){
        if(!sessionStorage.getItem('isloged')){
            this.props.history.push('/login');
        }else{
            if(!sessionStorage.getItem('role')==='Admin'){
                swal('Invalid page request');
                this.props.history.push('/');
            }
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
                    role:this.state.role,
                    email:this.state.email,
                    password:this.state.password,
                }

                axios.post('https://stormy-coast-77416.herokuapp.com/api/users/add', user)
                    .then(result => {
                        swal("Successful", "Account adding Successfull", "success");
                        this.props.history.push('/settings');
                    }).catch(error => {
                        swal("Error", "Error in adding Account", "error");
                    });
            }

        }
    }


    render() {
        return (
            <div className="container">
                <br/>
                <h1 className="h3 mb-1 font-weight-normal offset-md-2">Add Admin</h1><br/>
                <div className="text-center offset-md-3 col-md-6">
                        <form className="form-signin" onSubmit={this.onSubmit}>
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
                            <div className="col-md-4 offset-md-4">
                            <button className="btn btn-primary btn-block" type="submit">Add</button> 
                            </div>
                        </form>
                    </div>
            </div>
        )
    }

}