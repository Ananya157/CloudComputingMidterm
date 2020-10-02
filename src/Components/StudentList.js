import React, { Component } from 'react';
import '../CSS/Common.css';
import Header from './Header';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

class StudentList extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            studentList: [],
            offset: 0,
            orgStudentList: [],
            perPage: 5,
            currentPage: 0,
            validationError: "",
            clicked: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

     handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };
    loadMoreData() {
        const data = this.state.orgStudentList;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            studentList: slice
        })

    }
    
    rerenderParentCallback() {
        this.forceUpdate();
    }
    componentDidMount() {
        var that = this;
        fetch('https://kgt1c7bjf4.execute-api.us-east-1.amazonaws.com/dev/students', {
            method: 'GET'
        }).then((responseText) => {
            const response = responseText.json();
            response.then(function (response) {
                var data = response.data[0].students;	
                var slice = data.slice(that.state.offset, that.state.offset + that.state.perPage)
                that.setState({
                    pageCount: Math.ceil(data.length / that.state.perPage),
                    orgStudentList: response.data[0].students,
                    studentList: slice
                })
            });
        }).catch(error => {
            console.log(error)
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
   deleteStudent(id){
       console.log(id)
       var that = this;
       var url = 'https://kgt1c7bjf4.execute-api.us-east-1.amazonaws.com/dev/students/' + id;
       fetch(url, {
            method: 'DELETE'
        }).then((responseText) => {
            const response = responseText.json();
            response.then(function (result) {
                console.log(result)
                if (result.success) {
                    alert('Deleted Student Record');
                    that.componentDidMount();
                }
            }); 
        }).catch(error => {
            console.log(error)
        })
   }

    render() {
        return (
        <div>
            <Header/>
            <div className="card cardStyle" style={{ opacity: "0.9" }}>
                <div className="container searchHeader">
                    <div className="row">
                        <div className="col-lg-10">
                            <br/>
                            <h2 >List of  Students</h2>
                         </div>
                        <div className="col-lg-2" style={{ margin: "auto" }}>
                            <span className="email">
                                <Link to={`/AddStudent`} >
                                    <button className="cancelReviewButton">  Add Student  </button>
                                </Link>
                            </span>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    
                    {
                        this.state.studentList.length ?
                            this.state.studentList.map(student => <div key={student.id} className="seachHeader" >
                                <div className="cardStyle">
                                    <Link to={`/StudentInfo/${student.id}`} >
                                        <div className="hotelList">
                                            <span>{student.fullname}</span>
                                         </div>
                                    </Link>
                                    <div className="hotelList">
                                        <span>
                                            Level: {student.level}
                                        </span>
                                        <span className="email">
                                            <Link to={`/UpdateStudentInfo/${student.id}`} >
                                                <button className="individualButton"> Update </button>
                                            </Link>
                                            <button type="button" className="individualButton"  onClick={() => this.deleteStudent(student.id)}>
                                                Delete
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>) : (<span>
                                {this.state.clicked ? (
                                    <span className="seachHeader">No students Found</span>
                                ) : (
                                        null
                                    )
                                }
                            </span>
                        )
                    }
                    <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>

                </div>
            </div>
        </div>
        )
    }

}


export default StudentList