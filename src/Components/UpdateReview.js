import React, { Component } from 'react';
import '../CSS/Common.css';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

class UpdateReview extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hotelId: '',
            reviewId: '',
            userName: '',
            title: '',
            reviewText: '',
            rating: '',
            selectedOption: '',
            isUpdated: false,
            responseMessage: '',
            reviewInfo: []

        }
    }
    changehandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleOptionChange = (e) => {
        this.setState({ rating: e.target.value });
        console.log(this.state.rating)
    }

    submitHandler = (e) => {
        e.preventDefault()
        var that = this;
        const url = 'http://localhost:9090/UpdateReview?hotelId=' + this.state.hotelId + '&title=' + this.state.title
            + '&reviewText=' + this.state.reviewText + '&rating=' + this.state.rating
            + '&reviewId=' + this.state.reviewId

        fetch(url, {
            method: 'POST',
            credentials: 'include',
        }).then((responseText) => {
            const response = responseText.json();
            response.then(function (response) {
                that.setState({ responseMessage: response.ResponseMessage })
                console.log(that.state.responseMessage)
                if (that.state.responseMessage == "Updated Review successfully") {
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
        var res = str.split("/UpdateReview/");
        var result = res[1].split("/");

        const url = 'http://localhost:9090/ReviewInfo?hotelId=' + result[0] + '&reviewId=' + result[1]
        var that = this;
        fetch(url, {
            method: 'GET',
            credentials: 'include'
        }).then((responseText) => {
            const response = responseText.json();
            response.then(function (response) {
                console.log(response)
                that.setState({ hotelId: result[0] })
                that.setState({ title: response.ResponseContent.ReviewTitle })
                that.setState({ reviewText: response.ResponseContent.ReviewText })
                that.setState({ rating: response.ResponseContent.Rating.toString() })
                that.setState({ reviewId: result[1] })

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
                    <br />
                    <form onSubmit={this.submitHandler}>
                        <span>
                            <label className="userLabel" htmlFor="title">Short description:</label>
                            <label className="userLabel1" htmlFor="title">Rating</label>
                            <br />
                            <input style={{ width: "45%" }} type="text" id="title" value={this.state.title} name="title" onChange={this.changehandler} placeholder="Short Description.." />
                            <span style={{ marginLeft: "80px", width: "50%" }}>

                                <label><input type="radio" value="0" checked={this.state.rating === "0"} onChange={this.handleOptionChange} /> 0 </label>
                                <label><input type="radio" value="1" checked={this.state.rating === "1"} onChange={this.handleOptionChange} /> 1 </label>
                                <label><input type="radio" value="2" checked={this.state.rating === "2"} onChange={this.handleOptionChange} /> 2 </label>
                                <label><input type="radio" value="3" checked={this.state.rating === "3"} onChange={this.handleOptionChange} /> 3 </label>
                                <label><input type="radio" value="4" checked={this.state.rating === "4"} onChange={this.handleOptionChange} /> 4 </label>
                                <label><input type="radio" value="5" checked={this.state.rating === "5"} onChange={this.handleOptionChange} /> 5 </label>

                            </span >
                        </span>

                        <br /> <br />
                        <label className="userLabel" htmlFor="title">Comment:</label><br />
                        <textarea style={{ width: "90%", height: "70px" }} type="text" id="reviewText" value={this.state.reviewText} onChange={this.changehandler} name="reviewText" placeholder="Please type your comment in here..." />
                        <br /> <br /><br /> <br />
                        <div>
                            <button type="submit" className="addReviewButton">Update Review</button>
                        </div>
                        <div style={{ float: "right" }}>
                            <Link to={`/HotelInfo/${this.state.hotelId}`}>
                                <button type="submit" className="addReviewButton"  >Cancel</button>
                            </Link>

                        </div>
                        {
                            isUpdated ? (
                                <Redirect to={`/HotelInfo/${this.state.hotelId}`} />
                            ) : (
                                    <span>{this.state.responseMessage}</span>
                                )
                        }
                    </form >
                </div >
            </div >
        )
    }
}

export default UpdateReview