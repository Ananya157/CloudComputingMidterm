import React, { Component } from 'react'
import '../CSS/Common.css';
import StudentList from './StudentList'

class StudentListComponent extends Component {
    render() {
        return (
            <div>
                <div className=" backgroundImage">
                    <div className="container">
                        <StudentList />
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentListComponent