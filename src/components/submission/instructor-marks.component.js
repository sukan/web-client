import React, {Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import swal from 'sweetalert';

const Submission = props =>(
    <tr>
        <td>{props.submission.regNo}</td>
        <td>{props.submission.submitDate}</td>
        <td>{props.submission.submitTime}</td>
        <td>{props.submission.mark}</td>
        <td>{props.submission.comment}</td>
        <td>
            <Link to={"/updateMark/"+props.submission.mark+"/"+props.submission._id}>Update Marks</Link>
        </td>
    </tr>
)

export default class InstructorMarksComponent extends Component {
    constructor(props) {
        super(props);

        this.onClickMark = this.onClickMark.bind(this);


        this.state = {
            submissions : []
        }
    }

    componentDidMount() {

        axios.get("https://stormy-coast-77416.herokuapp.com/api/submission/all")
            .then(res=>{
                console.log(res.data);
                this.setState({
                    submissions : res.data
                })
            })
            .catch(err=>{
                console.log(err);
            })

    }

    submissionList(){
        return this.state.submissions.map(function (currentSubmission, i) {
            return <Submission submission = {currentSubmission} key = {i} />;
        })
    }

    onClickMark(e){

    }

    render() {
        return (
            <div className="container">
                <br/>
                <h3 align="center">Mark Assignment</h3>
                <br/>
                <table className="table table-bordered " style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>Reg No</th>
                        <th>Submit Date</th>
                        <th>Submit Time</th>
                        <th>Mark</th>
                        <th>Comment</th>
                        <th colSpan="2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.submissionList()}
                    </tbody>
                </table>
            </div>
        );
    }
}