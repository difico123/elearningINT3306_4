import React, { useCallback, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import {CourseImgIcon} from '../../common/icons'
import styled from "styled-components";
import "react-quill/dist/quill.snow.css";

import "./TextEditor.css";
import CourseService from "../../../service/courseService";
import {useParams,Link} from 'react-router-dom'
import Loader from '../../common/loader'
import Toast from '../../common/toast'
import showToast from '../../../dummydata/toast'

function CreateTopic() {
  const {id} = useParams();
  const [topic, setTopic] = useState({
    title: '',
    content: '',
    description: ''
  });
  const [listNotifications,setListNotifications] = useState([]);
  const [isLoading, setLoading] = useState(null)

  const loading = <WrapLoader> <Loader /> </WrapLoader>

  const onChangeValue = (e) => {
    setTopic({
      ...topic,
      [e.target.name]:e.target.value
    });
  }

  const onChangeContent = (value) => {
    setTopic({ ...topic,
        content: value
    });
  } 

  const [isError, setError] = useState(null);
  const addDetails = async(e) => {
      e.preventDefault();
      e.persist();
      if(topic.title.length < 10){
        setError('Tiêu đề bắt buộc phải có ít nhất 10 ký tự');
        return;
      }
      if(topic.description.length < 20){
        setError('Phần mô tả bắt buộc phải có ít nhất 20 ký tự');
        return;
      }
      if(topic.content.length < 30){
        setError('Phần nội dung bắt buộc phải có ít nhất 30 ký tự');
        return;
      }
      setLoading(true);
      await CourseService.createTopic(id, topic).then((res) => {
        setListNotifications([showToast('success','Thông báo', res.msg.toString())])
        window.location.href = "./infos";
      }).catch((err) => {
        setListNotifications([showToast('danger','Thông báo',"lỗi")])
      })
      setLoading(false);
  } 

return ( 
<>
    <Container>
    <Link to="./"><Title>Tạo topic mới</Title></Link>
      <CreateCourseForm>
        <Wrap>
        <div className="App">
                <div className="container">
                <div className="row"> 
                    <form className="update__forms" >
                    <div className="form-row">
                        <div className="form-group col-md-12">
                        <label className="font-weight-bold"> Tiêu đề <span className="required"> * </span> </label>
                        <br />
                        <br />
                        <input type="text" name="title" value={topic.title} onChange={onChangeValue}  className="form-control" placeholder="Title" required />
                        </div>
                        <br />
                        <div className="form-group col-md-12">
                          <div className="mb-3">
                            <label className="font-weight-bold"> Mô tả ngắn gọn <span className="required"> * </span> </label>
                          </div>
                          <textarea
                            rows="3"
                            name="description"
                            value={topic.description}
                            onChange={onChangeValue}
                          ></textarea>
                        </div>

                        {/* <div className="clearfix"></div> */}
                        <div className="form-group col-md-12 editor">
                            <br />  
                            <div className="mb-3">
                            <label className="font-weight-bold"> Nội dung <span className="required"> * </span> </label>
                            </div>
                            <EditorToolbar toolbarId={'t1'}/>
                            <Editor
                                theme="snow"
                                value={topic.content}
                                onChange={onChangeContent}
                                placeholder={"Write something awesome..."}
                                modules={modules('t1')}
                                formats={formats}
                            />
                        </div>
                        <br />
                          <div className="relative">
                            {isLoading ? loading : isError !== null && <span className="errors absolute"> {isError} </span>}
                          </div>
                        <div className="form-group col-sm-12 text-right">
                        <button type="submit" className="btn btn__theme" onClick={addDetails}> Tạo topic  </button>
                        </div> 
                    </div> 
                    </form>
                </div>
                </div>
            </div>
        </Wrap>
      </CreateCourseForm>
      <Toast toastList={listNotifications}/>
    </Container>
</>
)
}
export default CreateTopic;

const Editor = styled(ReactQuill) `
  background-color: #f9f9f9;
  outline: none;
  border-radius: 5px;
  border: 1px solid #ccc;
`
 
const Container = styled.div`
  padding: 5vh 5vw;
  height: 90vh;
  width: 85vw;
  overflow: auto;
`;

const Title = styled.span`
    font-size: 1rem;
    font-weight: bold;
    padding: 8px 20px;
    box-shadow: rgb(6 24 44 / 40%) 0px 0px 0px 2px, rgb(6 24 44 / 65%) 0px 4px 6px -1px, rgb(255 255 255 / 8%) 0px 1px 0px inset;
    border-radius: 5px;
    background-color: white;
    color: #3b5990;
`;

const CreateCourseForm = styled.form`
  margin: 2rem auto;
  padding: 2rem 0 5rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  width: 70vw;
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
  background-color: rgba(255, 255, 255, 0.2)
`;

const WrapLoader = styled.div`
position: absolute;
top: 50%;
left: 45%;
transform: translate(-50%,-50%)
`;

const Wrap = styled.div`
  padding: 0.2rem 3vw;
  input{
    padding: 0.35rem 5vw 0.35rem 1vw;
    height: 45px;
    width: 100%;
    autocomplete: off;
    background-image: none;
    font-size: 18px;
    font-weight: lighter;
    background-color: #f9f9f9;
    outline: none;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  textarea {
    padding: 0.35rem 0.5vw;
    height: 10rem;
    width: 100%;
    autocomplete: off;
    background-image: none;
    font-size: 18px;
    font-weight: lighter;
    background-color: #f9f9f9;
    outline: none;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row nowrap;
`;