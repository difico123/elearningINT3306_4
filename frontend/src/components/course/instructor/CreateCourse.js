import { useState, useEffect,useRef } from "react";
import styled from "styled-components";
import courseService from "../../../service/courseService";
import categoryService from "../../../service/categoryService";
import {CourseImgIcon} from '../../common/icons'
import Loader from "../../common/loader";
import Toast from '../../common/toast'
import toastList from '../../../dummydata/toast'

function CreateCourse() {
  const [image, setImage] = useState(null);
  const isSuccess = useRef('');
  const [msg,setMsg] = useState(null);
  const [content, setContent] = useState({
    name: "",
    description: "",
    courseImageUrl: null,
  });
  const [category, setCategory] = useState([
    {
      id: "",
      name: "",
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    categoryService.getAllName().then((data) => {
      setCategory(data.categories);
    });
  }, []);

  const create = async (e) => {
    e.preventDefault();
    setLoading(true);
    var formData = new FormData();
    formData.append("courseImageUrl", content.courseImageUrl);
    formData.append("name", content.name);
    formData.append("description", content.description);
    await courseService
      .createCourse(selectedCategory, formData)
      .then((response) => {
        console.log(response.msg);
        isSuccess.current = true;
        setMsg(response.msg)
        setTimeout(() => {window.location.href = "./"}, 3000);
      })
      .catch((error) => {
        isSuccess.current = false;
        setMsg(error.response.data.msg.toString());
      });
    setLoading(false);
  };

  const coverPhoto = !image ? (
    <CourseImage className="text-blue-500 border-fuchsia-600"></CourseImage>
  ) : (
    <img src={image} alt="cover"></img>
  );

  const chooseCategory = category.map((v,index) => (
    <option value={v.id} key={index}>{v.name}</option>
  ));

  const selectCategory = (
    <Dropdown
      onChange={(e) => {
        setSelectedCategory(e.target.value);
      }}
    >
      <option disabled selected={true} defaultValue=''>
        Chọn danh mục
      </option>
      {category ? chooseCategory : ""}
    </Dropdown>
  );

  const handleFileSelected = (e) => {
    const files = Array.from(e.target.files);
    setContent({ ...content, courseImageUrl: files[0] });
    setImage(URL.createObjectURL(files[0]));
  };

  const onChange = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  const errors =(
    <div className="text-center">
      <label className="text-red-500">{msg}</label>
    </div>
  );

  const success = <><div className="text-green-400 text-center">{msg}</div>{isSuccess.current? <Toast toastList={[toastList("success","Thông báo",msg)]}/>: ""}</>;
  const renderMsg = !isSuccess.current ? errors : success;
  const loadIcon = <div className="relative h-8 flex justify-center"> <Loader/> </div>
  const render = loading? loadIcon:renderMsg;
  return (
    <Container>
      <Title>Tạo khóa học mới</Title>
      <CreateCourseForm>
        <CategoryWrap>
          <FormTitle>Danh mục khóa học</FormTitle>
          {selectCategory}
        </CategoryWrap>
        <Cover>
          <FormTitle>Ảnh khóa học</FormTitle>
          <div>{coverPhoto}</div>
          <input
            type="file"
            name="coverPhoto"
            accept="image/png, image/jpeg"
            onChange={handleFileSelected}
          ></input>
        </Cover>
        <Wrap>
          <FormTitle>Tên khóa học</FormTitle>
          <input
            value={content.name}
            type="text"
            name="name"
            onChange={onChange}
          ></input>
        </Wrap>
        <Wrap>
          <FormTitle>Mô tả ngắn gọn</FormTitle>
          <textarea
            rows="3"
            name="description"
            value={content.description}
            onChange={onChange}
          ></textarea>
        </Wrap>
        {render}
        <Confirm type='submit' value="Tạo khóa học" onClick={create}/>
      </CreateCourseForm>
    </Container>
  );
}

export default CreateCourse;

const Container = styled.div`
  padding: 5vh 5vw;
  min-height: calc(100vh - 425px);
`;

const CourseImage = styled(CourseImgIcon)`
  font-size: 10rem!important;
  border: 1px solid green;
`

const Title = styled.div`
  font-size: 1.75rem;
  font-weight: bold;
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

const CategoryWrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding: 0 3vw;
`;

const FormTitle = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  padding: 0.4rem 0;
  width: 12vw;
`;

const Dropdown = styled.select`
  cursor: pointer;
  padding: 0.45rem 5vw 0.35rem 1vw;
  height: 45px;
  width: 25%;
  autocomplete: off;
  background-image: none;
  font-size: 18px;
  font-weight: lighter;
  background-color: #f9f9f9;
  outline: none;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
  option {
    cursor: pointer;
  }
`;

const Cover = styled.div`
  padding: 0 3vw;
  display: flex;
  flex-flow: row nowrap;
  min-height: 10rem;
  align-items: center;
  input {
    position: relative;
    margin: auto 3rem;
  }
  img {
    height: 12vh;
    border: 1px solid lightgrey;
  }
`;

const Wrap = styled.div`
  padding: 0.2rem 3vw;
  input,
  textarea {
    padding: 0.35rem 5vw 0.35rem 1vw;
    height: 45px;
    width: 75%;
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
    height: 8rem;
  }
  display: flex;
  flex-flow: row nowrap;
`;

const Confirm = styled.input`
  padding: 0 2rem;
  background-color: #4caf50;
  height: 45px;
  align-self: flex-end;
  margin: 0 3vw -3vh 0;
  font-weight: bold;
  color: white;
  transition: 0.3s ease 0s;
  &:hover {
    border: transparent;
    color: white;
    background-color: #04aa6d;
  }
`;