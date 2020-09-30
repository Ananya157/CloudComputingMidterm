import React from 'react';
import './App.css';
import Header from './Components/Header'
import StudentListComponent from './Components/StudentListComponent'
import AddStudentComponent from './Components/AddStudentComponent'
import StudentInfoComponent from './Components/StudentInfoComponent'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/StudentList" >
            <Header />
            <StudentListComponent />
          </Route>
          <Route path="/AddStudent">
            <Header />
            <AddStudentComponent />
          </Route>
           <Route path="/StudentInfo/:hotelId">
            <Header />
            <StudentInfoComponent />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
