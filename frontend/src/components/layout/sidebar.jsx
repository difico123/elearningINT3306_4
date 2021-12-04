import React from 'react'
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function Sidebar() {

    return (
        <SideBar>
            <NavLink to="/user/profile" activeClassName="active">
                <p>Thông tin cá nhân</p>
            </NavLink>
            <NavLink to="/user/editprofile" activeClassName="active">
                <p>Sửa thông tin cá nhân</p>
            </NavLink>
            <NavLink to="/user/editpw" activeClassName="active">
                <p>Thay đổi mật khẩu</p>
            </NavLink>
        </SideBar>
    )
}
const SideBar = styled.div` 
    position: absolute;
    // width: 340px;
    // min-width: 12rem;
    top: 4rem;
    left: 0rem;
    text-align: center;
    a {
        display: block;
        height: 40px;
        font-size: 1.5rem;
        margin: 10px;
        box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
        border-radius:2px;
        background-color: white;
    }
    a:hover {
        cursor: pointer;
        background-color: #758283;
        color: white;
    }
    a.active {
        background-color: #009FFF;
        color: white;
    }
    @media only screen and (min-width: 768px) {
        width: 340px;
        min-width: 12rem;
        p {
            font-size: 1.5rem;
        }
    }
    @media only screen and (max-width: 768px) {
        width: 20px;
        min-width: 12rem;
        p {
            font-size: 1rem;
        }
    }
`
export default Sidebar