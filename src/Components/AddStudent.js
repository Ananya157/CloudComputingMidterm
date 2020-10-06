import React, { Component } from 'react';
import '../CSS/Common.css';
import '../CSS/Header.css';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

class AddStudent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            level: '',
            course: '',
            expectation: '',
            selectedOption: 'BS',
            responseMessage: '',
            isInstered: false

        }
    }
    changehandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleOptionChange = (e) => {
        this.setState({ selectedOption: e.target.value });
        console.log(this.state.selectedOption)
    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state.selectedOption)
        var body = {
            "fullname": this.state.name,
            "email": this.state.email,
            "level": this.state.selectedOption,
            "course": this.state.course,
            "expectation": this.state.expectation
        }
        console.log(body)
        const url = 'https://kgt1c7bjf4.execute-api.us-east-1.amazonaws.com/dev/students'
        var that = this;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(body)
        }).then((responseText) => {
            const response = responseText.json();
            response.then(function (response) {
                that.setState({ responseMessage: response.success })
                console.log(that.state.responseMessage)
                if (that.state.responseMessage) {
                    that.setState({ isInstered: true })
                    console.log(that.state.isInstered)
                }

            });
        }).catch(error => {
            console.log(error)
        })
    }
    

    render() {
        const isInstered = this.state.isInstered;
        return (
            <div>
                
           <div id="page-container" className='mainHeader'>
                    <div className="container sportsClubContainer">
                        <span className="sportsClubTitle">
                            <div className="header">
                                <span>Add Student</span>
                            </div>
                        </span>
                    </div>
                </div> 
            <div className="card cardStyle">
                <div className="container searchHeader">
                    <form onSubmit={this.submitHandler}>
                        <div className="row">
                            <div className="col-lg-6">
                                <label className="userLabel" htmlFor="name">Name:</label>
                                <br/>
                                <input className="inputText" type="text" id="name" value={this.state.name} name="name" onChange={this.changehandler} placeholder="Enter your Name" />
                            </div>
                            <div className="col-lg-6">
                                <label className="userLabel" htmlFor="title">Email:</label>
                                <br />
                                <input className="inputText" type="text" id="email" value={this.state.email} name="email" onChange={this.changehandler} placeholder="Enter your email" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <label className="userLabel" htmlFor="name">Level:</label>
                                <br/>
                                 <span className="radioButton">
                                    <label><input type="radio" value="BS" checked={this.state.selectedOption === "BS"} onChange={this.handleOptionChange} /> BS </label>
                                    <label><input type="radio" value="MS" checked={this.state.selectedOption === "MS"} onChange={this.handleOptionChange} /> MS </label>
                                </span>
                            </div>
                            <div className="col-lg-6">
                                <label className="userLabel" htmlFor="title">Course:</label>
                                <br />
                                <input className="inputText" type="text" id="course" value={this.state.course} name="course" onChange={this.changehandler} placeholder="Enter the course" />
                            </div>
                        </div> 
                        <br /> <br />
                        <label className="userLabel" htmlFor="title">Expectation:</label><br />
                        <textarea className="textarea" type="text" id="expectation" value={this.state.expectation} onChange={this.changehandler} name="expectation" placeholder="Please mention your expectation in here..." />
                        <br /> <br /><br /> <br />
                        <div>
                            <span>
                                <button type="submit" className="addReviewButton">Add Student</button>
                            </span>
                           <span>
                               <Link to={`/StudentList`}>
                                    <button className="cancelReviewButton">Cancel</button>
                                </Link>
                            </span> 
                            
                        </div>
                       
                       {isInstered} 
                        {
                            isInstered ? (
                                <Redirect to={`/StudentList`} />
                            ) : (
                                    <span>{this.state.responseMessage}</span>
                                )
                        }
                    </form>
                </div>
            </div>
            </div>
        )
    }
}

export default AddStudent