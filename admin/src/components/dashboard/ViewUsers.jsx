import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import AdminService from '../../service/AdminService';

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

    // const [page, setPage] = useState(1);
    // const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        AdminService.getUserList(1).then((response) => {
            setUsers(response.users);
        });
    }, [change]);

    const content = getUsers.length == 0 ? <p className='text-center mt-1'>Không có người dùng nào</p> : getUsers.map((user, index) => {
        let role = '';
        switch (user.role) {
            case 0:
                role = 'Học viên'
                break
            case 1:
                role = 'Giảng viên'
                break
        }

        return (
            <Wrap key={index}>
                <table>
                    <tbody>
                        <tr>
                            <td>{index + 1}</td>
                            <td><img src={`${user.imageUrl}`}></img></td>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.address}</td>
                            <td>{role}</td>
                            <td><span class="blue">View</span><span class="pink">Delete</span></td>
                        </tr>
                    </tbody>
                </table>
            </Wrap>
        )
    })

    return (
        <>
            <Div>
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Avatar</th>
                            <th>Tên học viên</th>
                            <th>Email liên lạc</th>
                            <th>Số điện thoại</th>
                            <th>Địa chỉ hiện tại</th>
                            <th>Vai trò</th>
                            <th>Control</th>
                        </tr>
                    </thead>
                </table>
            </Div>
            {content}
        </>
    )
}

export default ViewUsers;

const Div = styled.div`
table {
    text-align: center;
    width: 700px;
    margin: 20px auto;
    font-family: sans-serif;
    border-bottom: 5px solid #009688;
  }
  th {
    padding: 10px;
  }
  th {
    background-color: #404040;
    color: white;
  }
  td {
    background-color: #eee;
  }
  span {
    padding: 5px 10px;
    margin: 3px;
    color: white;
  }
  .blue {
    background-color: #03a9f4;
  }
  .pink {
    background-color: #e91e63;
  }
`

const Wrap = styled.div`
table {
    text-align: center;
    width: 700px;
    margin: 20px auto;
    font-family: sans-serif;
    border-bottom: 5px solid #009688;
  }
  td {
    padding: 10px;
  }
  th {
    background-color: #404040;
    color: white;
  }
  td {
    background-color: #eee;
  }
  span {
    padding: 5px 10px;
    margin: 3px;
    color: white;
  }
  .blue {
    background-color: #03a9f4;
  }
  .pink {
    background-color: #e91e63;
  }
`