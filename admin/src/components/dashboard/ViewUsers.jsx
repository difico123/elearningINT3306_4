import React, { useState, useEffect } from 'react'
import Material from 'material-table';
import MaterialTable from "material-table";
import styled from "styled-components";
import AdminService from '../../service/AdminService';
import Popup from "../common/popup";
import Toast from "../common/toast.jsx";
import showToast from "../common/toast.js";
import { Warning, BuildIcon, ClearIcon } from '../common/icons';


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

  useEffect(() => {
    AdminService.getUserList(1).then((response) => {
      setUsers(response.users);
      console.log(response.users)
    });
  }, [change]);

  const columns = [
    {
      field: 'imageUrl',
      render: getUsers => <img src={getUsers.imageUrl} style={{ width: 50, height: 50, borderRadius: '50%' }} />,
      type: 'numeric'
    },
    {
      title: 'Họ tên', field: 'fullName'
    },
    {
      title: 'Địa chị email', field: 'email'
    },
    {
      title: 'Số điện thoại', field: 'phoneNumber'
    },
    {
      title: 'Nơi ở hiện tại', field: 'address'
    },
    {
      title: 'Vai trò', field: 'role', lookup: { 1: 'Giảng viên', 0: 'Học viên' }
    }
  ]

  return (
    <div>
      <MaterialTable title="Danh sách người dùng"
        style={{ padding: 50 }}
        data={getUsers}
        columns={columns}
        actions={[
          {
            icon: 'library_add',
            tooltip: 'Save User',
            onClick: (event, rowData) => alert("Đã trở thành giảng viên ")
          },
          rowData => ({
            icon: 'delete',
            tooltip: 'Delete User',
            onClick: (event, rowData) => window.confirm("Bạn có chắc muốn xóa người dùng này?"),
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

export default ViewUsers;
