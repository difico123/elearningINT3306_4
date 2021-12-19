import React, { useState, useEffect } from 'react'
import Material from 'material-table';
import MaterialTable from "material-table";
import AdminService from '../../service/AdminService';
import { ClearIcon } from '../common/icons';

function ViewCourses() {
    const [getCourses, setCourses] = useState([
        {
            name: '',
            instructorName: ''
        },
    ]);
    const [change, setChange] = useState(false);
    // const [toggleDelQuiz, setToggleDelQuiz] = useState(false);

    const columns = [
        {
            title: 'Tên khóa học', field: 'name'
        },
        {
            title: 'Tên giảng viên', field: 'instructorName'
        }
    ]

    useEffect(() => {
        (async () => {
            await AdminService.getCourseList(1).then((response) => {
                setCourses(response.courses);
            });
        })()
    }, [change]);

    const handleDeleteCourse = (courseId) => {
        AdminService.deleteCourse(courseId).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err.response.data);
        })
    }

    return (
        <div>
            <MaterialTable title="Danh sách khóa học"
                style={{ padding: 50 }}
                data={getCourses}
                columns={columns}
                actions={[
                    rowData => ({
                        icon: 'delete',
                        tooltip: 'Delete User',
                        onClick: (event, rowData) => { if (window.confirm("Bạn có chắc muốn xóa khóa học này?") === true) { handleDeleteCourse(rowData.id) } else { } },
                        disabled: rowData.birthYear < 2000
                    })
                ]}
                options={{
                    actionsColumnIndex: -1,
                    headerStyle: {
                        backgroundColor: '#039be5',
                        color: '#FFF'
                    },
                    rowStyle: {
                        backgroundColor: '#EEE',
                        padding: 5,
                    }

                }}
            />
        </div>
    )

}

export default ViewCourses;
