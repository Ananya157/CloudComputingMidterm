import React from 'react';
import './App.css';
import StudentListComponent from './Components/StudentListComponent'
import AddStudentComponent from './Components/AddStudentComponent'
import StudentInfoComponent from './Components/StudentInfoComponent'
import UpdateStudentInfoComponent from './Components/UpdateStudentInfoComponent'
import GoogleBtn from './Components/GoogleBtn';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div> 
      <Router>
        <div>
          <Switch> 
              <Route exact path='/' component={GoogleBtn}></Route> 
              {/* <Route path="/StudentList" render={(props) => <StudentListComponent {...props}/>}/> */}
              <Route exact path='/StudentList' component={StudentListComponent}></Route> 
              <Route exact path='/AddStudent' component={AddStudentComponent}></Route> 
              <Route exact path='/StudentInfo/:hotelId' component={StudentInfoComponent}></Route> 
              <Route exact path='/UpdateStudentInfo/:hotelId' component={UpdateStudentInfoComponent}></Route> 
            </Switch> 
        </div>
      </Router>
    </div>
  );
}

export default App;
