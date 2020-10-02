import React from 'react';
import './App.css';
import StudentListComponent from './Components/StudentListComponent'
import AddStudentComponent from './Components/AddStudentComponent'
import StudentInfoComponent from './Components/StudentInfoComponent'
import UpdateStudentInfoComponent from './Components/UpdateStudentInfoComponent'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div>
        <Switch> 
              <Route exact path='/' component={StudentListComponent}></Route> 
              <Route exact path='/AddStudent' component={AddStudentComponent}></Route> 
              <Route exact path='/StudentInfo/:hotelId' component={StudentInfoComponent}></Route> 
              <Route exact path='/UpdateStudentInfo/:hotelId' component={UpdateStudentInfoComponent}></Route> 
            </Switch> 
      </div>
    </Router>

  );
}

export default App;
