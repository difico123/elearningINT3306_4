import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Course from '../components/course/Course'

function CourseRouter() {
    return (
        <React.Fragment>
                <Course/>
            <Routes>
                <Route path="/course/:id" element = {<div>abc</div>}/>
            </Routes>
        </React.Fragment>
    )
}

export default CourseRouter
