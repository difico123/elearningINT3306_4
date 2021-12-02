import dummydata from "../../dummydata/data2.json";
import categoryDumy from "../../dummydata/category.ratio.json";
import React from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CourseService from "../../service/courseService";
import CategoryService from "../../service/categoryService";
import { SearchIcon } from "../common/icons";
import Loader from "../common/loader";

function Course() {
  const { id } = useParams();
  const [CategoryParam, setCategoryParam] = useState(id);

  const [category, setCategory] = useState(id);
  const [keyword, setKeyword] = useState("");
  const [rating, setRating] = useState("");
  const [isLoading, setLoading] = useState(true);

  const [getCourses, setCourses] = useState([
    {
      imageUrl: "",
      courseId: "",
      name: "",
      description: "",
      categoryId: "",
      instructorName: "",
      rating: "",
      register: "",
    },
  ]);
  const [getCategoryName, SetCategoryName] = useState([
    {
      id: "",
      name: "",
    },
  ]);

  useEffect(() => {
    let couserData = CourseService.getAll(id)
    .then((response) => {
          setCourses(response.courses);
          setLoading(false);
    });
    let categoryData = CategoryService.getAllName()
    .then((response) => {
      SetCategoryName(response.categories)
    })
    Promise.all([couserData, categoryData])
  }, []);

  const searchByKeyword = async (e) => {
    setRating("")
    setLoading(true);
    await CourseService.getAll(category, e.target.value).then((data) => {
      setCourses(data.courses);
      setKeyword(e.target.value);
      setLoading(false);
    });
  };

  const content = getCourses.map((course,index) => (
    <Link to={`/category/${CategoryParam}/course/${course.courseId}`}>
      <Wrap key={index}>
        <CourseImage alt="" src={course.imageUrl}></CourseImage>
        <CourseTitle>{course.name}</CourseTitle>
        <CourseTitle>{course.instructorName}</CourseTitle>
        <CourseDescription>{course.description}</CourseDescription>
        <CourseInfo>
          <CourseAttendance>Số học viên: {course.register}</CourseAttendance>
          <CourseRating>
            Đánh giá: {course.rating ? course.rating : 0}
          </CourseRating>
        </CourseInfo>
      </Wrap>
    </Link>
  ));

  const loading = (
    <div className="flex content-center justify-start ml-20 ">
      <Loader />
    </div>
  );

  const loaded = (
    < >
        <Courses>{content}</Courses>
    </>
  );

  const categoryRatio = async(e) => {
    setLoading(true);
    setRating("")
    await CourseService.getAll(e.target.value,keyword).then((data) => {
      setCategory(e.target.value);
      setCourses(data.courses);
      setLoading(false);
    });
  }

  const ratingRatio = async(e) => {
    setLoading(true);
    await CourseService.getAll(category,keyword,e.target.value).then((data) => {
      setRating(e.target.value);
      setCourses(data.courses);
      setLoading(false);
    });
  }

  const renderCategoryRatio = getCategoryName.map((element,index) => {
    return (<>
    <FilterWrap key={index}>
      <input value={element.id} type="radio" checked={element.id === Number(category)} name="category" onChange={categoryRatio} />
      <label for={element.name}>{element.name}</label>
    </FilterWrap>
    </>)
  })

  const [page,setPage] = useState(1);

  const pageClick = (e) => {
    if (page === 1 && e.target.value <= 3) {
      setPage(1);
      return;
    };
    if(e.target.value > (page + 2)) {
      setPage(page + 1);
    } else if (e.target.value < (page + 2)) {
      setPage(page - 1);
    }
  }

  return (
    <Container>
      <div>
        <Btn value={page} onClick={pageClick}>{page}</Btn>
        <Btn value={page+1} onClick={pageClick}>{page+1}</Btn>
        <Btn value={page+2} onClick={pageClick}>{page+2}</Btn>
        <Btn value={page+3} onClick={pageClick}>{page+3}</Btn>
        <Btn value={page+4} onClick={pageClick}>{page+4}</Btn>
      </div>
      <Title>Các khóa học nổi bật về Lập trình</Title>
      <SearchBar>
        <input
          onChange={searchByKeyword}
          type="text"
          placeholder="Tìm kiếm khóa học..."
        />
        <button type="submit">
          <CustomSearch />
        </button>
      </SearchBar>
      <hr></hr>
      <Content>
        <LeftNav>
          <Filter>
            <FilterTitle>Ngôn ngữ</FilterTitle>
            <FilterWrap className="mb-2" >
              <input value="" type="radio" checked={!category} name="category" onChange={categoryRatio} />
              <label for="tất cả">Tất cả</label>
            </FilterWrap>
            {renderCategoryRatio}
          </Filter>
          
          <Filter>
            <FilterTitle>Đánh giá</FilterTitle>
            <FilterWrap>
              <input value="" type="radio" name="rating" checked={!rating}  onChange={ratingRatio} />
              <label for="other">Tất cả</label>
            </FilterWrap>
            <FilterWrap>
              <input value="4.5" type="radio" name="rating" checked={rating === "4.5"} onChange={ratingRatio} />
              <label for="fourhalf">4.5 sao trở lên</label>
            </FilterWrap>
            <FilterWrap>
              <input value="4" type="radio" name="rating" checked={rating === "4"} onChange={ratingRatio} />
              <label for="four">4 sao trở lên</label>
            </FilterWrap>
            <FilterWrap>
              <input value="3.5" type="radio" name="rating" checked={rating === "3.5"} onChange={ratingRatio} />
              <label for="threehalf">3.5 sao trở lên</label>
            </FilterWrap>
            <FilterWrap>
              <input value="3" type="radio" name="rating" checked={rating === "3"} onChange={ratingRatio} />
              <label for="three">3 sao trở lên</label>
            </FilterWrap>

          </Filter>
        </LeftNav>
        {isLoading? loading : loaded}
      </Content>
      <Page></Page>
    </Container>
  );
}
const Btn = styled.button`
  margin: 0.1rem;
  padding:10px;
  border: 1px solid black;
`
const Container = styled.div`
  min-height: 100vh;
  padding: 40px 3vw 50px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: flex-start;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  padding-bottom: 10px;
`;

const Content = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 50px;
`;

const LeftNav = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  background-color: #f7f9fa;
  justify-content: space-between;
  border: 4px solid black;
  height:fit-content;
  gap: 2rem;
`;

const Filter = styled.div`
`;

const FilterTitle = styled.div`
  font-size: 17px;
  font-weight: 600;
  padding-bottom: 10px;
  inline-size: 200px;
  overflow-wrap: break-word;
`;

const FilterWrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 12px;
  label {
    font-size: 15px;
  }
`;

const Courses = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
`;

const Wrap = styled.div`
  width: 17vw;
  background-color: #f7f9fa;
  border: 3px solid rgba(5, 5, 5, 0.1);
  cursor: pointer;
  transition: all 314ms cubic-bezier(0.2, 0.4, 0.38, 0.7) 0s;
  box-shadow: rgb(0 0 0 / 35%) 0 16px 25px -12px,
    rgb(1 1 1 / 25%) 0 9px 16px -10px;
  &:hover {
    box-shadow: rgb(0 0 0 / 65%) 0 25px 36px -20px,
      rgb(1 1 1 / 45%) 0 16px 25px -12px;
    transform: scale(0.9875);
    border-color: rgba(5, 5, 5, 0.314);
  }
  padding: 0 5px;
`;

const CourseImage = styled.img`
  margin-bottom: 20px;
  height: 200px;
`;

const CourseTitle = styled.div`
  padding: 0 20px;
  font-size: 16px;
  font-weight: 600;
  height: 5.7vh;
`;

const CourseDescription = styled.div`
  padding: 3px 20px 20px;
  font-size: 15px;
  font-weight: 500;
  inline-size: calc(17vw - 5px);
  overflow-wrap: break-word;
  height: 8vh;
`;

const CourseInfo = styled.div`
  padding: 3px 20px 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

const CourseRating = styled.div`
  font-weight: 600;
`;

const CourseAttendance = styled.div`
  font-weight: 600;
`;

const Page = styled.div``;

export default Course;
const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 900px;
  border: 2px solid black;
  cursor: pointer;
  padding: 8px 25px;
  cursor: text;
  font-weight: lighter;
  input {
    padding-left: 10px;
    border: none;
    width: 90%;
    autocomplete: off;
    background-image: none;
    font-size: 15px;
    font-weight: lighter;
  }
  button {
    cursor: pointer;
    border: none;
    background: transparent;
  }
  textarea:focus,
  input:focus {
    outline: none;
  }
`;

const CustomSearch = styled(SearchIcon)``;