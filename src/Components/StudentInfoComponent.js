import React, { Component } from 'react'
import '../CSS/Common.css';
import StudentInfo from './StudentInfo'

class StudentInfoComponent extends Component {
    render() {
        return (
            <div>
                <div className=" backgroundImage">
                    <div className="container">
                        <StudentInfo />
                    </div>

                </div>

            </div>
        )

    }

}

export default StudentInfoComponent
