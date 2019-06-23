import React, {Component} from 'react';
import axios from 'axios';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Course = props => (
    <tr>
        {/*<td>{props.id}</td>*/}
        <td>{props.code}</td>
        <td>{props.name}</td>
        <td><input type="button" value="Assignments" className="btn btn-primary" onClick={props.onClick} id={props.id}/>
        </td>
        <td><input type="button" value="Exams" className="btn btn-primary" onClick={props.onClick} id={props.id}/></td>
        {/* <td>
            <Link to={"/books/" + props._id}>Book</Link>
        </td>
        <td>
            <Link to={"/books/" + props._id}>Book</Link>
        </td> */}
    </tr>
);


export default class CurrentCoursesInstructor extends Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);

        this.state = {
            courses: []
        };


    }


    //this methed invoked after rendering home component and it send a get request to api and api send response with all trains
    componentDidMount() {
        document.title = "Current Courses";
        console.log(sessionStorage.getItem('id'));
        axios.get('https://stormy-coast-77416.herokuapp.com/api/courses/instructor/current/' + sessionStorage.getItem('id'))
            .then(response => {
                console.log(response);
                this.setState({courses: response.data.courses});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onClick(e) {

        console.log('click');
        console.log(sessionStorage.getItem('UserID'));
        console.log(e.target.id);
        console.log('https://stormy-coast-77416.herokuapp.com/node/course/instructor/accept/' + e.target.id + '/' + sessionStorage.getItem('UserID'));

        console.log(this.state.courses);

        var course='';


        this.state.courses.forEach(element => {

            if(element._id===e.target.id){
                console.log('ifone');
                console.log(element._id);
                console.log(e.target.id);

                element.instructors.forEach(element2 => {

                    if(element2.instructor===sessionStorage.getItem('UserID')){
                        console.log('iftwo');
                        console.log(element2.instructor);
                        console.log(sessionStorage.getItem('UserID'));


                        element2.status='accepted';
                        course=element;
                        console.log(this.state.courses);
                        console.log(element);
                    }
                });
            }


        });


        axios.post('https://stormy-coast-77416.herokuapp.com/node/course/instructor/accept/' + e.target.id + '/' + sessionStorage.getItem('UserID'),course)
            .then(response => {
                console.log(response);
                //this.setState({ courses: response.data.courses });
            })
            .catch(function (error) {
                console.log(error);
            });

            window.location.reload();
    }


    render() {
        return (


            <div className="container">
                <br/>
                <h3 className="h3 mb-1 font-weight-normal ">Current Course List</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        {/*<th>ID</th>*/}
                        <th>Code</th>
                        <th>Name</th>
                        <th>Actions</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>


                    {
                        this.state.courses.map((currentCourse, i) => (
                            <Course onClick={this.onClick} id={currentCourse._id} key={i} code={currentCourse.course_code}
                                    name={currentCourse.course_name}/>
                        ))
                    }
                    </tbody>
                </table>
            </div>


        )
    }
}