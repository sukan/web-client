import React, {Component} from 'react';
import axios from 'axios';
const Course = props => (
    <tr>
        {/*<td>{props.id}</td>*/}
        <td>{props.code}</td>
        <td>{props.name}</td>
        <td><input type="button" value="View Assignments" className="btn btn-primary" onClick={props.onClick}
                   id={props.id}/></td>
        <td><input type="button" value="View Exams" className="btn btn-primary" onClick={props.onClick} id={props.id}/>
        </td>

    </tr>
);


export default class CurrentCoursesStudent extends Component {

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
        axios.get('https://stormy-coast-77416.herokuapp.com/api/courses/student/current/' + sessionStorage.getItem('id'))
            .then(response => {
                console.log(response);
                this.setState({courses: response.data.courses});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onClick(e) {

        // console.log('click');
        // console.log(sessionStorage.getItem('UserID'));
        // console.log(e.target.id);
        // console.log('http://localhost:4000/node/course/student/join/' + e.target.id + '/' + sessionStorage.getItem('UserID'));

        // console.log(this.state.courses);


        // //var studentsArray = [];
        // var course = '';


        // this.state.courses.forEach(element => {

        //     if (element._id === e.target.id) {
        //         console.log('ifone');
        //         console.log(element._id);
        //         console.log(e.target.id);

        //         //studentsArray.push(sessionStorage.getItem('UserID'));
        //         element.students.push(sessionStorage.getItem('UserID'));
        //         console.log(element.students);
        //         course = element;
        //         console.log(this.state.courses);
        //         console.log(element);


        //     }


        // });


        // axios.post('http://localhost:4000/node/course/student/join/' + e.target.id + '/' + sessionStorage.getItem('UserID'), course)
        //     .then(response => {
        //         console.log(response);
        //         //this.setState({ courses: response.data.courses });
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

        // window.location.reload();


    }


    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-12 col-lg-12 col-md-12">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">


                                <div className="col-lg-12">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4"> Registered Courses</h1>
                                        </div>
                                        <table className="table table-bordered" style={{marginTop: 20}}>
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
                                                    <Course onClick={this.onClick} id={currentCourse._id} key={i}
                                                            code={currentCourse.course_code} name={currentCourse.course_name}/>
                                                ))
                                            }


                                            </tbody>
                                        </table>
                                        <hr/>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>

            </div>


        )
    }
}