import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import Menu from './components/includes/menu.component';
import Header from './components/includes/sidebar.component';
import Login from './components/login.component';
import Welcome from './components/welcome.component';
import AllCourses from './components/admin/courses.component';
import AddCourse from './components/course/addCourse.component';
import CourseList from './components/course/courseList.component'
import CurrentCoureseList from './components/course/currentCourseList.component';
import StudentRegister from './components/studentRegister.component';
import Instructors from './components/admin/instructors.component';
import AddInstructors from './components/admin/addInstructors.component';
import AddAdmin from './components/admin/addAdmins.component';
import Add_Assignment_Component from './components/assignments/addassignment.component';
import Show_Assignments_Component from './components/assignments/showassignments.component';
import Edit_Assignment_Component from './components/assignments/editassignment.component';
import Settings from './components/admin/settings.component';
import Students from './components/admin/students.component';
import StudentNewCourses from './components/course/studentNewCourses.component';
import StudentCurrentCourses from './components/course/studentCurrentCourses.component';
import Logout from './components/logout.component';
import UpdateProfile from './components/admin/updateProfile.component';
import StudentAssignmentList from './components/submission/assignment-list.component';
import CreateAssignmentSubmissionComponent from './components/submission/create-submission.component';
import SingleSubmissionComponent from './components/submission/singleSubmission';
import InstructorMarksComponent from './components/submission/instructor-marks.component';
import UpdateMarkComponent from './components/submission/update-mark.component';

function App() {
  return (
    <Router>
        <Route path="/login" component={Login} />
        <Route path="/register" component={StudentRegister}/>  
        <Route path="/logout" component={Logout}/>
            <Header/>
            <Menu/>
        <Route exact path="/" component={Welcome}/>
        <Route path="/addCourse" component={AddCourse}/>
        <Route path="/courseList" component={CourseList}/>
        <Route path="/currentCourseList" component={CurrentCoureseList}/>
        <Route path="/instructores" component={Instructors}/>
        <Route path="/instructores_add" component={AddInstructors}/>
        <Route path="/admin_add" component={AddAdmin}/>
        <Route path="/addassignment" component={Add_Assignment_Component} />
        <Route path="/showinsassignments/" component={Show_Assignments_Component} />
        <Route path="/editinsassignments/:id" component={Edit_Assignment_Component} />
        <Route path="/settings" component={Settings} />
        <Route path="/courses" component={AllCourses} />
        <Route path="/students" component={Students} />
        <Route path="/user/:id" component={UpdateProfile} />
        <Route path="/newStudentCourses" component={StudentNewCourses}/>
        <Route path="/currentStudentCourses" component={StudentCurrentCourses}/>
        <Route path="/studentAssignmentList" component = {StudentAssignmentList} />
        <Route path="/createSubmission/:id" component = {CreateAssignmentSubmissionComponent} />
        <Route path="/showSubmission/:id" component = {SingleSubmissionComponent} />
        <Route path="/instructorAddMarks" component = {InstructorMarksComponent} />
        <Route path="/updateMark/:marks/:id" component = {UpdateMarkComponent} />

      </Router>
  );
}


export default App;
