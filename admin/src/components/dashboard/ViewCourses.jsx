import React, { useState, useEffect } from 'react'
import Material from 'material-table';
import MaterialTable from "material-table";
import AdminService from '../../service/AdminService';
import { ClearIcon } from '../common/icons';
import styled from "styled-components";
import Toast from "../common/toast.jsx"
import showToast from "../common/toast.js"
function ViewCourses() {
    const [getCourses, setCourses] = useState([
        {
            name: '',
            instructorName: ''
        },
    ]);
    
    const [toastList, setToastList] = useState([]);

    const columns = [
        {
            title: 'Tên khóa học', field: 'name'
        },
        {
            title: 'Tên giảng viên', field: 'instructorName'
        },
        {
            title: 'Hình ảnh khoá học', field: 'courseImg',render: rowData => (rowData.courseImg&& <img src={rowData.courseImg} style={{height: 50}}/>)
        }
    ]
 
    useEffect(() => {
        (async () => {
            await AdminService.getCourseList().then((response) => {
                setCourses(response.courses);
            });
        })()
    }, []);

    const handleDeleteCourse = (data) => {
        AdminService.deleteCourse(data.id).then((res) => {
            setToastList([showToast('success','thông báo!', 'Xoá thành công!')])
        }).catch((err) => {
            console.log(err.response.data);
        })
    }

    return (
        <Wrap>
            <MaterialTable title={"Danh sách khóa học - " + getCourses.length+ " khoá học"}
                style={{padding: 10}}
                data={getCourses}
                columns={columns}
                options={{
                    actionsColumnIndex: -1,
                    pageSize:10,
                    headerStyle: {
                        backgroundColor: '#039be5',
                        color: '#FFF'
                    },
                    rowStyle: {
                        backgroundColor: '#EEE',
                        padding: 5,
                    }
                }}

                editable={{
                    onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        handleDeleteCourse(oldData)
                        const dataDelete = [...getCourses];
                        const index = oldData.tableData.id;
                        dataDelete.splice(index, 1);
                        setCourses([...dataDelete]);
                        resolve();
                      }, 1000)
                    }),
                }}
            />
            <Toast toastList={toastList}/>
        </Wrap>
    )
}

export default ViewCourses;

const Wrap = styled.div`
    background-color: white;
    width: 80vw;
    height: 90vh;
    overflow-y:auto;
    padding: 1rem 1rem;
`