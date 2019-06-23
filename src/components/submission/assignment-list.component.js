import React, {Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


const Assignmet = props =>(
    <tr>
        <td>{props.assignment.subject}</td>
        <td>{props.assignment.assignmentName}</td>
        <td>{props.assignment.description}</td>
        <td>{props.assignment.dueDate}</td>
        <td>{props.assignment.startDate}</td>
        <td>
            <Link to={"/createSubmission/"+props.assignment._id}>Submit</Link>
        </td>
    </tr>
)

export default class StudentAssignmentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            assignments : []
        }
    }

    componentDidMount() {

        axios.get("https://stormy-coast-77416.herokuapp.com/api/assignments/all")
            .then(res=>{
                console.log(res.data);
                this.setState({
                    assignments : res.data
                })
            })
            .catch(err=>{
                console.log(err);
            })

    }

    assignmentList(){
        return this.state.assignments.map(function (currentAssignment, i) {
            return <Assignmet assignment = {currentAssignment} key = {i} />;
        })
    }

    render() {
        return (
            <div className="container">
                <br/>
                <h3 align="center">Assignments to Submit </h3>
                <br/>
                <table className="table table-bordered " style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Assignment Name</th>
                        <th>Description</th>
                        <th>Due Date </th>
                        <th>Start Date </th>
                        <th colSpan="2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.assignmentList()}
                    </tbody>
                </table>
            </div>
        );
    }
}