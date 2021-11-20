import React from "react"
import { Link } from "react-router-dom"

import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CourseDetails extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            imgClassName:"img-cover"
        }
        this.renderRating = this.renderRating.bind(this)
        this.imgCoverShow = this.imgCoverShow.bind(this)
        this.imgCoverHidden = this.imgCoverHidden.bind(this)
    }

    renderRating() {
        const courseRating = 4.5; //test
        if(courseRating < 1){
            return(
                <div>
                    <FontAwesomeIcon style={{ color:"#f4c150"}} icon={faStarHalfAlt} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                </div>
            )
        }
        if (courseRating === 1) {
            return (
                <div>
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                </div>
            )
        }

        if (courseRating > 1 && courseRating < 2) {
            return (
                <div>
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStarHalfAlt} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                </div>
            )
        }

        if (courseRating === 2) {
            return (
                <div>
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                </div>
            )
        }

        if (courseRating > 2 && courseRating < 3) {
            return (
                <div>
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStarHalfAlt} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                </div>
            )
        }
        if (courseRating === 3) {
            return (
                <div>
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }}  icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                </div>
            )
        }

        if (courseRating > 3 && courseRating < 4) {
            return (
                <div>
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStarHalfAlt} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                </div>
            )
        }

        if (courseRating === 4) {
            return (
                <div>
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color:"dedfe0" }}icon={faStar} />
                </div>
            )
        }

        if (courseRating > 4 && courseRating < 5) {
            return (
                <div>
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150"}} icon={faStarHalfAlt} />
                </div>
            )
        }
        
        if (courseRating === 5) {
            return (
                <div>
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                </div>
            )
        }
        
    }

    renderPrice() {
       let str = "$9.99";
       return str.slice(0,str.length - 2) + "." + str.slice(str.length -2 )
    }

    imgCoverShow(){
        this.setState({
            imgClassName: "img-cover-show"
        })
    }

    imgCoverHidden(){
        this.setState({
            imgClassName: "img-cover"
        })
    }

    render(){
        return(
            <Link to={``} className="course-card" style={{ textDecoration: "none"}}>
                <div>
                    <img style={{width:"100%"}} src="https://i.udemycdn.com/course/240x135/1456524_4fac_2.jpg" alt="course-img" />
                    <div className="this.state.imgClassName"></div>
                </div>
                <div className="index-card-text">
                    <div className="index-card-title">Learning React in 5 hour......</div>
                    <div className="index-card-ratting"><span className="index-rating-span">{this.renderRating()}</span><span className="index-rating-span">4</span><span className="index-rating-span" style={{ color: "#686f7a" }}>({10})</span></div>
                    <div className="index-card-price">$9.99</div>
                </div>
            </Link>
        )
    }
}

export default CourseDetails