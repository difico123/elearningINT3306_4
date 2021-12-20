import React, { useState, useEffect } from 'react'
import Material from 'material-table';
import MaterialTable from "material-table";
import styled from "styled-components";
import AdminService from '../../service/AdminService';
import Popup from "../common/popup";
import Toast from "../common/toast.jsx";
import showToast from "../common/toast.js";
import { Warning, BuildIcon, ClearIcon,AccountCircleIcon } from '../common/icons';


function ViewUsers() {
  const [getUsers, setUsers] = useState([
    {
      fullName: '',
      email: '',
      phoneNumber: '',
      address: '',
      role: '',
      imageUrl: ''
    },
  ]);
  const [change, setChange] = useState(false);
  const [toastList, setToastList] = useState([]);

  useEffect(() => {
    AdminService.getUserList(1).then((response) => {
      setUsers(response.users);
    });
  }, [change]);


  const handleUpdateUsers = async (event, data) => {
    setToastList([showToast('success','Thông báo!','Người dùng này đã trở thành giảng viên!')])
    let index = getUsers.findIndex(v => v.id === data.id)
    let newArr = [...getUsers]
    newArr[index].role = 1
    setUsers(newArr)
    await AdminService.setInstructor(data.id).then((res) => {
      console.log(res)
    })
  }
  return (
    <Wrap>
      <MaterialTable title={"Danh sách người dùng - " + getUsers.length+ " người dùng"}
        style={{padding: 10}}
        data={getUsers}
        columns={[
          { title: 'Avatar', field: 'imageUrl',render: rowData => (rowData.imageUrl? <img src={rowData.imageUrl} style={{width: 50,height: 50, borderRadius: '50%'}}/> : <AccountCircleIcon style={{width: 50,height: 50, borderRadius: '50%'}}/>),  cellStyle: {width: 1} },
          { title: 'Họ tên', field: 'fullName', width: "1%"},
          { title: 'Địa chỉ email', field: 'email' },
          { title: 'Số điện thoại', field: 'phoneNumber' },
          { title: 'Nơi ở hiện tại', field: 'address' },
          { title: 'Vai trò', field: 'role', lookup: { 1: 'Giảng viên', 0: 'Học viên' } },
        ]}
        actions={[
          rowData => (
          (rowData.role === 0) &&
          {
            icon: 'upgradeOutlinedIcon',
            tooltip:  'Trở thành giảng viên',
            onClick: (event, rowData) => handleUpdateUsers(event,rowData),
          }
          
          )
        ]}
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
      />
      <Toast toastList={toastList}/>
    </Wrap>
  )
}

export default ViewUsers;

const Wrap = styled.div`
    background-color: white;
    width: 80vw;
    height: 90vh;
    overflow-y:auto;
    padding: 1rem 1rem;
`