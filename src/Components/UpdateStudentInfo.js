import React, { Component } from 'react';
import '../CSS/Common.css';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

class UpdateStudentInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            studentId: '',
            studentName: '',
            studentEmail: '',
            studentLevel: '',
            studentCourse: '',
            studentExpectation: '',
            selectedOption: '',
            isUpdated: false,
            responseMessage: ''
        }
    }
    changehandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleOptionChange = (e) => {
        this.setState({ studentLevel: e.target.value });
        console.log(this.state.rating)
    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state.studentCourse)
        var body = {
            "level": this.state.studentLevel,
            "course": this.state.studentCourse,
            "expectation": this.state.studentExpectation
        }
        console.log(body)
        const url = 'https://kgt1c7bjf4.execute-api.us-east-1.amazonaws.com/dev/students'
        var that = this;
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body)
        }).then((responseText) => {
            const response = responseText.json();
            response.then(function (response) {
                that.setState({ responseMessage: response.success })
                console.log(that.state.responseMessage)
                if (that.state.responseMessage) {
                    that.setState({ isUpdated: true })
                    console.log(that.state.isUpdated)
                }

            });
        }).catch(error => {
            console.log(error)
        })
    }
    componentWillMount() {
         var str = window.location.href
        var res = str.split("/UpdateStudentInfo/");

        const url = 'https://kgt1c7bjf4.execute-api.us-east-1.amazonaws.com/dev/students/' + res[1]
        var that = this;
        fetch(url, {
            method: 'GET'
        }).then((responseText) => {
            const response = responseText.json();
            response.then(function (response) {
                console.log(response.data[0].students)
                that.setState({ studentId: response.data[0].students.id })
                that.setState({ studentName: response.data[0].students.fullname })
                that.setState({ studentEmail: response.data[0].students.email  })
                that.setState({ studentLevel: response.data[0].students.level  })
                that.setState({ studentCourse: response.data[0].students.course  })
                that.setState({ studentExpectation: response.data[0].students.expectation  })
            });
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        const isUpdated = this.state.isUpdated;
        return (
            <div className="card cardStyle" style={{ opacity: "0.9" }}>
                <div className="container searchHeader">
                    <div className="contactUsHeader"><br />Update review</div>
                    <form onSubmit={this.submitHandler}>
                        <div className="row">
                            <div className="col-lg-6">
                                <label className="userLabel" htmlFor="name">Name:</label>
                                <br/>
                                <input className="inputText" type="text" id="name" value={this.state.studentName} name="name" disabled = "disabled" placeholder="Enter your Name" />
                            </div>
                            <div className="col-lg-6">
                                <label className="userLabel" htmlFor="title">Email:</label>
                                <br />
                                <input className="inputText" type="text" id="email" value={this.state.studentEmail} name="email"  disabled = "disabled" placeholder="Enter your email" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <label className="userLabel" htmlFor="name">Level:</label>
                                <br/>
                                 <span className="radioButton">
                                    <label><input type="radio" value="BS" checked={this.state.studentLevel === "BS"} onChange={this.handleOptionChange} /> BS </label>
                                    <label><input type="radio" value="MS" checked={this.state.studentLevel === "MS"} onChange={this.handleOptionChange} /> MS </label>
                                </span>
                            </div>
                            <div className="col-lg-6">
                                <label className="userLabel" htmlFor="title">Course:</label>
                                <br />
                                <input className="inputText" type="text" id="course" value={this.state.studentCourse} name="course" onChange={this.changehandler} placeholder="Enter the course" />
                            </div>
                        </div> 
                        <br /> <br />
                        <label className="userLabel" htmlFor="title">Expectation:</label><br />
                        <textarea className="textarea" type="text" id="expectation" value={this.state.studentExpectation} onChange={this.changehandler} name="expectation" placeholder="Please mention your expectation in here..." />
                        <br /> <br /><br /> <br />
                        <div>
                            <span>
                                <button type="submit" className="addReviewButton">Update Student Info</button>
                            </span>
                           <span>
                               <Link to={`/`}>
                                    <button className="cancelReviewButton">Cancel</button>
                                </Link>
                            </span> 
                            
                        </div>
                        {
                            isUpdated ? (
                                <Redirect to={`/`} />
                            ) : (
                                    <span>{this.state.responseMessage}</span>
                                )
                        }
                    </form>
                   
                </div >
            </div >
        )
    }
}

export default UpdateStudentInfo