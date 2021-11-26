import styled from "styled-components";
import React, { useState, useEffect } from "react";

import UserService from "../../service/userService";


function EditPassword() {

  const [ userPw, setUserPw ] = useState({
    password: "",
    newPassword: "",
    confirmPassword: ""
  });

  let  { password, newPassword, confirmPassword } = userPw

  const onChange = (e) => {
    setUserPw({...userPw,[e.target.name]:e.target.value})
  }

  const editPw = () => {
    UserService.editPw(userPw)
    .then((response) => {
      setSuccessMsg(response.msg);

      setTimeout(() => {window.location = "./user/profile"},3000)
    })
    .catch((error) => {
      setIsError(error.response.data.error);
      setMessage(error.response.data.msg);
    });
  };

  const [message, setMessage] = useState([]);
  var [successMsg, setSuccessMsg] = useState("");
  var [isError, setIsError] = useState(false);

  const errors = message.map((err,index) => (
    <div key={index}>
      <label className="text-red-500">{err}</label>
    </div>
  ));

  const success = <div className="text-green-400">{successMsg}</div>;


  return (
    <Wrap>
      <Container>
        <Title>Đổi mật khẩu</Title>
          <PW>  
            <label for="password">Mật khẩu cũ</label>
            <input 
                value={password}
                type="password"
                name="password"
                id="password"
                placeholder="Mật khẩu cũ"
                onChange={onChange}
            ></input>
            <label for="new-password">Mật khẩu mới</label>
            <input 
                value={newPassword}            
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="Mật khẩu mới"
                onChange={onChange}

            ></input>
            <label for="cf-password">Xác nhận mật khẩu mới</label>
            <input 
                value={confirmPassword}            
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Xác nhận mật khẩu"
                onChange={onChange}
            ></input>
            {isError ? errors : success}
            <Confirm>
                <input
                  type="Submit"
                  value="Xác nhận"
                  onClick={editPw}
                  ></input>
            </Confirm>
          </PW>
      </Container>
    </Wrap>
  );
}

const Wrap = styled.div`
  min-height: calc(100vh - 435px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
const Container = styled.div`
  max-width: 60%;
  border: 1px solid black;
  width: 100%;
  background-color: #fff;
  padding: 25px 30px;
  border-radius: 5px;
`;
const Title = styled.div`
  font-size: 25px;
  font-weight: 500;
`;

const PW = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px 0 12px 0;
  label {
    display: block;
    font: 1rem 'Fira Sans', sans-serif;
  }

  input,
  label {
    margin: .4rem 0;
  }

  input {
   height: 45px;
   width: 100%;
   outline: none;
   border-radius: 5px;
   border: 1px solid #ccc;
   padding-left: 15px;
   font-size: 16px;
  }
`;

const Confirm = styled.button`

  height: 45px;
  margin: 45px 0;
  input {
    cursor: pointer;
   height: 100%;
   width: 100%;
   outline: none;
   color: #fff;
   border:none;
   font-size: 18px;
   font-weight: 500;
   border-radius: 5px;
   letter-spacing: 1px;
   background: linear-gradient(135deg, #71b7e6, #9b59b6)
  }
`;

export default EditPassword;