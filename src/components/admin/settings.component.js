import React, { Component } from 'react';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const columns = [
    {
      name: 'Register Number',
      selector: 'regNo',
      sortable: true,
    },
    {
      name: 'First Name',
      selector: 'fname',
      sortable: true,
      right: true,
    },
    {
      name: 'Last Name',
      selector: 'lname',
      sortable: true,
      right: true,
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
      right: true,
    }
  ];

export default class Settings extends Component {

    constructor(props ){
        super(props);
        this.state = {admins :[]};
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

    axios.get('https://stormy-coast-77416.herokuapp.com/api/users/admins')
        .then(response =>{
            this.setState({admins:response.data.admins})
            console.log(response);
        })
        .catch(function(error){
            swal("Oops,Something wrong"+error,"error", {
                buttons: false,
                timer: 2000,
              })
        })

    }

    render() {
        return (
            <div className="container">
                <br/>
                <h1 className="h3 mb-1 font-weight-normal">Settings</h1>
                <div class="float-right" style={{paddingBottom:'4px'}}><Link  class="btn btn-primary btn-sm" to="/admin_add">Add Admin</Link></div>
                <DataTable
                    title='Admins'
                    columns={columns}
                    pagination={true}
                    data={this.state.admins}
                />
            </div>
        )
    }

}