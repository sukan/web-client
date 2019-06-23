import React, {Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import swal from 'sweetalert';


export default class SingleSubmission extends Component {
    constructor(props) {
        super(props);

        this.onChangeComment = this.onChangeComment.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onDeleteSubmission = this.onDeleteSubmission.bind(this);

        this.state = {
            subject : '',
            assignmentName : '',
            startDate : '',
            dueDate : '',
            file : '',
            comment : '',
            mark : '',
            remaining : '',
            fileName : '',
            assignmentId : '',
            lastDate : '',
            lastTime : ''
        }
    }

    componentDidMount() {

        axios.get('https://stormy-coast-77416.herokuapp.com/api/submission/single/'+this.props.match.params.id )
            .then(res=>{

                this.setState({
                    comment : res.data.comment,
                    fileName : res.data.fileName,
                    assignmentId : res.data.assignment,
                    lastDate : res.data.submitDate,
                    lastTime : res.data.submitTime
                })

                axios.get('https://stormy-coast-77416.herokuapp.com/api/assignments/find/'+res.data.assignment )
                    .then(newRes=>{
                        this.setState({
                            subject : newRes.data.subject,
                            assignmentName : newRes.data.assignmentName,
                            startDate : newRes.data.startDate,
                            dueDate : newRes.data.dueDate

                        })
                        const data = new FormData();

                        data.append("deadLineDate",newRes.data.dueDate );

                        axios.post('https://sliit-courseweb-af.herokuapp.com/courseweb/api/assignment/time',data )
                            .then(response=>{
                                this.setState({
                                    remaining : response.data
                                })


                            })


                    });

            })
            .catch(err=>{
                console.log(err);
            })
    }

    onChangeFile(e){
        this.setState({
            file : e.target.files[0]
        })
    }

    onChangeComment(e){
        this.setState({
            comment : e.target.value
        })
    }

    onDeleteSubmission(e){

        e.preventDefault();

        axios.delete("https://stormy-coast-77416.herokuapp.com/api/submission/delete/"+this.props.match.params.id )
            .then(res=>{
                console.log(res.data);
                swal("Deleted Successfully", "You deleted the Submission", "success")
                this.props.history.push("/studentAssignmentList");
            })
            .catch(err=>{
                console.log(err);
            })
    }

    onFormSubmit(e){
        e.preventDefault();

        const data = new FormData();

        data.append("file", this.state.file );
        data.append("comment", this.state.comment );
        data.append("mark", 0 );
        data.append("assignment", this.state.assignmentId);
        data.append("userId", sessionStorage.getItem("id"));
        data.append("regNo", sessionStorage.getItem("regNo"));

        axios.put("https://sliit-courseweb-af.herokuapp.com/courseweb/api/assignment/submit" , data )
            .then(res=>{
                console.log(res.data);
                swal("Update Complete", "You have sucessfully updated your assignment!", "success")
                this.props.history.push('/showSubmission/'+res.data._id);
            })
            .catch(err=>{
                console.log(err);
            })
    }

    componentDidUpdate() {

    }

    render() {
        return (
            <div className="container" style={{backgroundColor: "#FFF"}}>
                <br/><br/><br/>
                <form onSubmit={this.onFormSubmit}>
                    <h2>Edit Assignment</h2>
                    <br/><br/>
                    <table className="table">
                        <thead>
                        <tr>

                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Subject</td>
                            <td>
                                {this.state.subject}
                            </td>
                        </tr>

                        <tr>
                            <td>Assignment Name </td>

                            <td>
                                {this.state.assignmentName}
                            </td>
                        </tr>

                        <tr>

                            <td> Start </td>

                            <td>
                                {this.state.startDate}
                            </td>
                        </tr>

                        <tr>
                            <td>Due Date </td>

                            <td>
                                {this.state.dueDate}
                            </td>
                        </tr>

                        <tr>
                            <td> Time remaining </td>
                            <td>
                                {this.state.remaining}
                            </td>
                        </tr>

                        <tr>
                            <td> Last modified Date </td>
                            <td>
                                {this.state.lastDate}
                            </td>
                        </tr>
                        <tr>
                            <td> Last modified Time </td>
                            <td>
                                {this.state.lastTime}
                            </td>
                        </tr>

                        <tr>
                            <td> Submit File </td>

                            <td>
                                <input type = "file"
                                       onChange={this.onChangeFile}
                                        required
                                />
                                <label htmlFor="files" className="btn">Old File : {this.state.fileName} </label>
                            </td>
                        </tr>

                        <tr>
                            <td> Comment </td>

                            <td>
                                <input type = "text"
                                       onChange={this.onChangeComment}
                                       value = {this.state.comment}
                                       required/>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                    <div className="form-group">
                        <input type="submit"
                               value="Edit Submission"
                               className="btn btn-primary"/>
                    </div>

                    <div className="form-group">
                        <input type="button"
                               value="Delete Submission"
                               className="btn btn-primary"
                                onClick={this.onDeleteSubmission}
                        />
                    </div>
                </form>
            </div>
        );
    }
}