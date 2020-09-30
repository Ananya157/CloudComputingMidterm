import React, { Component } from 'react'
import '../CSS/Header.css';


class HomePage extends Component {
    render() {
        return (
            <div>
                <div id="page-container" className='mainHeader'>
                    <div className="container sportsClubContainer">
                        <span className="sportsClubTitle">
                            <div className="addReviewButton">
                                <span>Student Info</span>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        )

    }

}

export default HomePage