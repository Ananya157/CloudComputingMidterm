
import React, { Component } from 'react';
import '../CSS/Common.css';
import { Link } from 'react-router-dom';

class StudentInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            studentInfo: [],
            studentId: '',
            responseMessage: ""
        }
    }

    componentDidMount() {
        var str = window.location.href
        var res = str.split("/StudentInfo/");

        const url = 'https://kgt1c7bjf4.execute-api.us-east-1.amazonaws.com/dev/students/' + res[1]
        var that = this;
        fetch(url, {
            method: 'GET'
        }).then((responseText) => {
            const response = responseText.json();
            response.then(function (response) {
                that.setState({ studentId: res[1] })
                that.setState({studentInfo: response.data[0].students})
            });
        }).catch(error => {
            console.log(error)
        })

    }

    render() {
        return (
            <div>
                <div className="card cardStyle">
                    <div className="searchHeader info">
                        <span>
                            <Link to={`/StudentList`} >
                                 <button className = "backButton" >
                                    Back
                                </button> 
                            </Link>
                      
                        </span>
                        <div>
                            Name: {this.state.studentInfo.fullname}
                            <br/><br/>
                        </div>
                        <div>
                            Email: {this.state.studentInfo.email}
                            <br /><br/>
                        </div>
                        <div>
                            Level: {this.state.studentInfo.level}
                            <br /><br/>
                        </div>
                        <div>
                            Course: {this.state.studentInfo.course}
                            <br /><br/>
                        </div>
                        <div>
                            Expectation: {this.state.studentInfo.expectation}
                            <br /><br/>
                        </div>
                    </div>
                    
                </div>
            </div >
        )
    }

}

export default StudentInfo

