import React, { Component } from 'react'
import '../CSS/Common.css';
import UpdateStudentInfo from './UpdateStudentInfo'

class UpdateStudentInfoComponent extends Component {
    render() {
        return (
            <div>
                <div className=" backgroundImage">
                    <div className="container">
                        <UpdateStudentInfo />
                    </div>

                </div>

            </div>
        )

    }

}

export default UpdateStudentInfoComponent