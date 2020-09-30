import React, { Component } from 'react'
import '../CSS/Common.css';
import AddStudent from './AddStudent'

class AddStudentComponent extends Component {
    render() {
        return (
            <div>
                <div className=" backgroundImage">
                    <div className="container">
                        <AddStudent />
                    </div>

                </div>

            </div>
        )

    }

}

export default AddStudentComponent
