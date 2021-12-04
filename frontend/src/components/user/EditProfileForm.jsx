import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UserService from "../../service/userService";
import Loader from '../common/loader';
import {PersonIcon} from '../common/icons'

function EditProfile({user}) {

  const [message, setMessage] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [ userProfile, setUserProfile] = useState({
    lastName: "",
    firstName: "",
    phoneNumber: "",
    city: "",
    address: "",
    imageUrl: ""
  });

  let  { firstName, lastName, phoneNumber, city, address, imageUrl} = userProfile

  useEffect(() => {
      setUserProfile({...user})
      setImage(user.imageUrl)
  }, [user]);

  const onChange = (e) => {
    setUserProfile({...userProfile,[e.target.name]:e.target.value})
  }

  const editInfo = async(e) => {
    e.preventDefault();
    setLoading(true)
    var formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("phoneNumber", phoneNumber);
    formData.append("city", city);
    formData.append("address", address);
    if(imageUrl) {
      formData.append("imageUrl",imageUrl);
    }

    await UserService.editUser(formData)
    .then((response) => {
      setSuccessMsg(response.msg);
      window.location.href ='./profile'
    })
    .catch((error) => {
      setIsError(error.response.data.error);
      setMessage(error.response.data.msg);
      console.log(error)
    });
    setLoading(false)
  };

  const errors = message.map((err,index) => (
    <div key={index}>
      <label className="text-red-500">{err}</label>
    </div>
  ));

  const handleFileSelected = (e) => {
    const files = Array.from(e.target.files)
    setUserProfile({...userProfile, imageUrl: files[0]})
    setImage(URL.createObjectURL(files[0]))
  }

  const success = <div className="text-green-400">{successMsg}</div>;
  const renderMsg = isError ? errors : success;

  const loadIcon = <div className="relative h-8 flex justify-center"> <Loader/> </div>
  const render = loading? loadIcon:renderMsg;

  const Avt = !image? <ProfileIcon className="text-xl"></ProfileIcon>:<img src={image} alt="anh dai dien"></img>
    return (
        <Wrap>
          <Container>
            <Title>Chỉnh sửa thông tin cá nhân</Title>
            <Form>
              <FullName>
                <Name>
                    <span>Họ của bạn</span>
                    <input
                    value={firstName}
                    type="text"
                    name="firstName"
                    placeholder="Enter your name"
                    onChange={onChange}
                    />
                </Name>
                <Name>
                    <span>Tên của bạn</span>
                    <input
                    value={lastName}
                    type="text"
                    name="lastName"
                    placeholder="Enter your name"
                    onChange={onChange}
                    ></input>
                </Name>
              </FullName>
              <h4 className="relative top-3 ">Ảnh đại diện</h4>
              <Image>
                  <div>
                  {Avt}
                  </div>

                  <input 
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={handleFileSelected}
                  ></input>
              </Image>
              <UserDetails>
                <InputBox>
                  <Span>Số điện thoại</Span>
                  <input
                  value={phoneNumber}
                  type="text"
                  name="phoneNumber"
                  placeholder="Enter your name"
                  onChange={onChange}
                  ></input>
                </InputBox>
                <InputBox>
                  <Span>Địa chỉ</Span>
                  <input
                  value={address}
                  type="text"
                  name="address"
                  placeholder="Enter your name"
                  onChange={onChange}
                  ></input>
                </InputBox>
                <InputBox>
                  <Span>Thành phố</Span>
                  <input
                  value={city}
                  type="text"
                  name="city"
                  placeholder="Enter your name"
                  onChange={onChange}
                  ></input>
                </InputBox>
                {render}
                <Confirm>
                <input
                  type="Submit"
                  value="Confirm"
                  onClick={editInfo}
                  ></input>
                </Confirm>
              </UserDetails>
            </Form>
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
const Form = styled.form``;
const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InputBox = styled.div`
  margin: 20px 0 12px 0;
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

const Span = styled.div`
  display: block;
  font-weight: 500;
  margin-bottom: 5px;
`;

const Confirm = styled.button`
  height: 45px;
  margin: 45px 0;
  input {
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

const FullName = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Name = styled.div`
  span {
    float: left;
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

const Image = styled.div`
  margin: 1rem 0 0.1rem 0;
  display: flex;
  min-height: 10rem;

  input {
    position: relative;
    margin: auto 5rem;
  }
  img {
    position: relative;
    top: 1rem;
    width: 10rem;
  }
`;
const ProfileIcon = styled(PersonIcon)`
  height: 100%;
  width: 100%;
  border: 1px solid skyblue;
  position: relative;
  margin: 4rem 3rem;
  color: white;
  background: skyblue;
  transform: scale(5);
`;

export default EditProfile;
