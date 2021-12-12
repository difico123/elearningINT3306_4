import React, { useCallback, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import {CourseImgIcon} from '../../common/icons'
import styled from "styled-components";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.css";
import CourseService from "../../../service/courseService";
import {useParams} from 'react-router-dom'
import Loader from '../../common/loader'
import Toast from '../../common/toast'
import showToast from '../../../dummydata/toast'

function EditTopic({setEditToggle, topicId, setTopics, topics}) {
    const {id} = useParams();

    const [topic, setTopic] = useState({
      title: '',
      content: '',
      description: ''
    });

    const [listNotifications,setListNotifications] = useState([]);
    const [isLoading, setLoading] = useState(null)
  
    const loading = <WrapLoader> <Loader /> </WrapLoader>
    
    useEffect(() => {
        (async () => {
            await CourseService.getTopicDetails(id, topicId).then(res => {
                setTopic({...res.topic})
                console.log(res)
            })
        })()
    },[topicId])
    console.log(topic)

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
          setListNotifications([showToast('danger','Thông báo', err.response.data.msg.toString())])
        })
        setLoading(false);
    }
  
    const handleEditToggle = () => {
        setEditToggle(false)
    }
return ( 
    <>
        <Container>
            <Back onClick={handleEditToggle}>Quay lại</Back>
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

export default EditTopic;


const Editor = styled(ReactQuill) `
  background-color: #f9f9f9;
  outline: none;
  border-radius: 5px;
  border: 1px solid #ccc;
`
 
const Container = styled.div`

`;

const Back = styled.button`
    position: absolute;
    top: 2%;
    right: 2%;
  font-size: 1.25rem;
  font-weight: bold;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: green;
  padding: 0.2rem 0.5rem;
  text-align: center;
  color: white;
`;

const CreateCourseForm = styled.form`
  margin: 1rem auto;
  width: 70vw;
  display: flex;
  flex-flow: column nowrap;
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
    padding: 0.2rem 0.5rem;
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