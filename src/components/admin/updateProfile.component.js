import React, { Component } from 'react';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import axios from 'axios';


export default class UpdateProfile extends Component {

    constructor(props){
        super(props);

        this.onChangeRegNo=this.onChangeRegNo.bind(this);
        this.onChangeFname =this.onChangeFname.bind(this);
        this.onChangeLname = this.onChangeLname.bind(this);
        this.onChangeEmail =this.onChangeEmail.bind(this);
        this.onChangeCurrentPassword=this.onChangeCurrentPassword.bind(this);
        this.onChangeNewPassword=this.onChangeNewPassword.bind(this);
        this.onChangeConfirmPassword=this.onChangeConfirmPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
            id:'',
            regNo:'',
            fname:'',
            lname:'',
            role:'',
            email:'',
            password:'',
            currentPassword:'',
            newPassword:'',
            confirmPassword:''
        }
    }
    
    componentDidMount(){
        if(!sessionStorage.getItem('isloged')){
            this.props.history.push('/login');
            }

        axios.get('https://stormy-coast-77416.herokuapp.com/api/users/'+this.props.match.params.id)
            .then(response=>{
                this.setState({
                    id:response.data.id,
                    regNo:response.data.regNo,
                    fname:response.data.fname,
                    lname:response.data.lname,
                    role:response.data.role,
                    email:response.data.email,
                    password:response.data.password
                })
            })
            .catch(function(error){
                console.log(error)
            })
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

    onChangeCurrentPassword(e) {
        this.setState({
            currentPassword: e.target.value
        });
    }

    onChangeNewPassword(e) {
        this.setState({
            newPassword: e.target.value
        });
    }
    onChangeConfirmPassword(e) {
        this.setState({
            confirmPassword: e.target.value
        });
    }
    
    passwordMatch(){
        if(this.state.currentPassword !== '' && this.state.newPassword !== ''){
            if(this.state.password !== this.state.currentPassword ){
                return (<p class="text-danger">Invalid Current Password </p>);

            }else{
                if(this.state.newPassword!==this.state.confirmPassword){
                return (<p class="text-danger">Password not matching</p>);
                }else{
                    return (<p class="text-success">Password matches</p>);  
                }
            }
        }
    }

    onSubmit(e){
        e.preventDefault();
        if(this.state.password === this.state.currentPassword){
                if(this.state.newPassword === this.state.confirmPassword ){
                    if(this.state.newPassword===''){
                        const user= {
                            regNo:this.state.regNo,
                            fname:this.state.fname,
                            lname:this.state.lname,
                            role:this.state.role,
                            email:this.state.email,
                            password:this.state.password,
                        }
    
                        axios.post('http://localhost:4030/api/users/update/'+this.props.match.params.id, user)
                            .then(result => {
                                swal("Successful", "Account Update Successfull", "success");
                            }).catch(error => {
                                swal("Error", "Error in updating Account", "error");
                            }); 
                        
                    }else{
                        const user= {
                            regNo:this.state.regNo,
                            fname:this.state.fname,
                            lname:this.state.lname,
                            role:this.state.role,
                            email:this.state.email,
                            password:this.state.newPassword,
                        }
    
                        axios.post('http://localhost:4030/api/users/update/'+this.props.match.params.id, user)
                            .then(result => {
                                swal("Successful", "Account Update Successfull", "success");
                            }).catch(error => {
                                swal("Error", "Error in updating Account", "error");
                            }); 
                    }
                }
        }else{
            swal("Enter the correct current password");
        }
    }


    render() {
        return (
            <div className="container">
                <br/>
                <h1 className="h3 mb-1 font-weight-normal offset-md-2">Update User Profile</h1><br/>
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
                                   
                            <label for="inputPassword" className="sr-only">Current Password</label>
                            <input type="password" 
                                   className="form-control"
                                   style={{marginBottom:'3%'}}
                                   placeholder="Current Password" 
                                   value={this.state.currentPassword}
                                   onChange={this.onChangeCurrentPassword}
                                   required/>

                            <label for="inputPassword" className="sr-only">New Password</label>
                            <input type="password" 
                                   className="form-control"
                                   style={{marginBottom:'3%'}}
                                   placeholder="New Password" 
                                   value={this.state.newPassword}
                                   onChange={this.onChangeNewPassword}
                                   />

                            <label for="inputPassword" className="sr-only">Confirm Password</label>
                            <input type="password" 
                                   style={{marginBottom:'3%'}}
                                   className="form-control"
                                   placeholder="Confirm Password" 
                                   value={this.state.confirmPassword}
                                   onChange={this.onChangeConfirmPassword}
                                   />
                            <span>{this.passwordMatch()}</span>
                            <br/>
                            <div className="col-md-4 offset-md-4">
                            <button className="btn btn-primary btn-block" type="submit">Update</button> 
                            </div>
                        </form>
                    </div>
            </div>
        )
    }

}