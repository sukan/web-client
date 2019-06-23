import React, { Component } from 'react';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const columns = [
    {
      name: 'Course Name',
      selector: 'course_name',
      sortable: true,
    },
    {
      name: 'Course Code',
      selector: 'course_code',
      sortable: true,
      right: true,
    }
  ];

export default class AllCourses extends Component {

    constructor(props ){
        super(props);
        this.state = {courses :[]};
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

    axios.get('https://stormy-coast-77416.herokuapp.com/api/courses/all')
        .then(response =>{
            this.setState({courses:response.data});
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
                <h1 className="h3 mb-1 font-weight-normal">Courses</h1>
                <div class="float-right" style={{paddingBottom:'4px'}}><Link  class="btn btn-primary btn-sm" to="/addCourse">Add Course</Link></div>
                <DataTable
                    columns={columns}
                    pagination={true}
                    data={this.state.courses}
                />
            </div>
        )
    }

}