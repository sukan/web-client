import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'

const Assignment = props => (
    <tr>
        <td>{props.assignment.assignmentName}</td>
        <td>{props.assignment.subject}</td>
        <td>
            <Link className="btn btn-primary" to={"/editinsassignments/"+props.assignment._id}>Modify</Link>
        </td>
    </tr>
);

class Show_Assignments_Component extends React.Component {

    delete() {
        axios.delete('https://sliit-courseweb-af.herokuapp.com/courseweb/api/newassignment/delete')
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
    }

    componentDidMount() {
        document.title = "Assignments (My) | SLIIT";
        axios.get('https://stormy-coast-77416.herokuapp.com/api/assignments/all')
            .then(response => {
                this.setState({Assignments: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    constructor(props){
        super(props);


        this.state = {
            Assignments : []
        };
    }

    assignmentList() {
        return this.state.Assignments.map(function(currentAssignment, i){
            return <Assignment assignment={currentAssignment} key={i} />;
        })
    }



    render(){
        return(

            <div style={{}}>
                <div style={{width: '800px'}}>
                    <h2 align="center">Assignments</h2>
                </div>
                <div>
                    <div className="container">
                        <table className="table table-responsive-sm"  style={{marginTop: 20, color: 'black', fontWeight: "bold", background: 'white'}} >
                            <thead>
                            <tr>
                                <th>Assignment Name</th>
                                <th>Course Code</th>
                                <th>Modify Course</th>
                                <th>Delete Course</th>
                            </tr>
                            </thead>
                            <tbody>
                            { this.assignmentList() }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        )
    }
}

export default Show_Assignments_Component;