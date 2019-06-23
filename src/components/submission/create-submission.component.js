import React, {Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import swal from 'sweetalert';


export default class StudentSubmissionComponent extends Component {
    constructor(props) {
        super(props);

        this.onChangeComment = this.onChangeComment.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);

        this.state = {
            subject : '',
            assignmentName : '',
            startDate : '',
            dueDate : '',
            file : '',
            comment : '',
            mark : '',
            remaining : ''
        }
    }

    componentDidMount() {

            axios.get('https://stormy-coast-77416.herokuapp.com/api/assignments/find/'+this.props.match.params.id )
                .then(res=>{
                    this.setState({
                        subject : res.data.subject,
                        assignmentName : res.data.assignmentName,
                        startDate : res.data.startDate,
                        dueDate : res.data.dueDate
                    })

                    const data = new FormData();

                    data.append("deadLineDate",res.data.dueDate );

                    axios.post('https://sliit-courseweb-af.herokuapp.com/courseweb/api/assignment/time',data )
                        .then(response=>{
                            this.setState({
                                remaining : response.data
                            })
                        })
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

    onFormSubmit(e){
        e.preventDefault();

        const data = new FormData();

        data.append("file", this.state.file );
        data.append("comment", this.state.comment );
        data.append("mark", 0 );
        data.append("assignment", this.props.match.params.id);
        data.append("userId", sessionStorage.getItem("id"))
        data.append("regNo", sessionStorage.getItem("regNo"));

        axios.post("https://sliit-courseweb-af.herokuapp.com/courseweb/api/assignment/submit" , data )
            .then(res=>{
                console.log(res.data);
                swal("Submission Complete", "You have sucessfully submitted your assignment!", "success");
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
                    <h2>Submit Assignment</h2>
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
                            <td>  {this.state.remaining} </td>
                        </tr>

                        <tr>
                            <td> Submit File </td>

                            <td>
                                <input type = "file"
                                    onChange={this.onChangeFile}
                                       required
                                />
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
                               value="Submit Assignment"
                               className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}