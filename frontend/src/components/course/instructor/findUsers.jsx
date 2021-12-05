import React, { Component,useState } from 'react'
import CourseService from '../../../service/courseService'
import { useParams } from "react-router-dom";
import Loader from '../../common/loader.jsx'

function FindUsers() {
    const [students,setStudents] = useState([]);
    const params = useParams();

    const findUsers = (e) => {
        CourseService.findUsers(params.courseId,e.target.value).then((users) => {
            let {students} = users.data
            console.log("students",students)
            if(students === undefined) {
                setStudents(['Không tìm thấy học sinh'])
            } else  {
                setStudents(users.data.students)
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    console.log(params.courseId)

    const renderStudents = students.map((student) =>(
        <div key={student.id}>
            {student.email}
        </div>
    ))
    return ( 
        <div>
            <input type="text" />
            <input
              type="email"
              id="email"
              name="findUsers"
              placeholder="Địa chỉ Email...."
              onChange={findUsers}/>
             
              <div>
              {/* <Loader/> */}
                {renderStudents}
              </div>
              
              <div>
                  {/* {params.courseId} */}
                  {/* {students.length} */}
              </div>
        </div>
     );
}

export default FindUsers;