import React, { useEffect, useState } from "react";
import styled from "styled-components";
import data from "../../dummydata/data.json";
import { Link } from "react-router-dom";
import CategoryService from "../../service/categoryService";
import Loader from "../common/loader";
import { StarIcon, PersonIcon, BooksIcon } from "../common/icons";

function Categories() {
  const [categoryData, setCategoryData] = useState([
    {
      categoryId: "",
      categoryName: "",
      imageUrl: "",
      courseNum: "",
      register: "",
      rating: "",
    },
  ]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyAPI() {
      await CategoryService.getAll().then((response) => {
        setCategoryData(response.categories);
        setLoading(false);
      });
    }
    fetchMyAPI();
  }, []);

  const content = categoryData.map((category, index) => (
    <Link to={`/category/${category.categoryId}`}>
      <Wrap key={index}>
        <CategoryRating>
          <span>Đánh giá: {category.rating ? category.rating : "0"}</span>{" "}
          <span>
            <StarIcon />
          </span>
        </CategoryRating>
        <CategoryImage alt="" src={category.imageUrl}></CategoryImage>
        <CategoryTitle>{category.categoryName}</CategoryTitle>
        <CategoryDescription>{}</CategoryDescription>
        <CategoryInfos>
          <CategoryCourseTotal>
            <span>
              Số khóa học: {category.courseNum ? category.courseNum : "0"}
            </span>
            <span>
              <BooksIcon />
            </span>
          </CategoryCourseTotal>
          <CategoryRegister>
            <span>
              Số học viên: {category.register ? category.register : "0"}
            </span>{" "}
            <span>
              <PersonIcon />
            </span>
          </CategoryRegister>
        </CategoryInfos>
      </Wrap>
    </Link>
  ));

  const loading = (
    <WrapLoader>
      <Loader />
    </WrapLoader>
  );

  const loaded = (
    <>
      <Title>Danh mục khóa học</Title>
      <Content>{content}</Content>
    </>
  );

  return <Container>{isLoading ? loading : loaded}</Container>;
}

export default Categories;

const Container = styled.div`
  padding: 5vh 5vw;
  min-height: 100vh;
`;


const Title = styled.span`
font-size: 1rem;
  font-weight: bold;
  padding: 8px 20px;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  border-radius: 5px;
  background-color: white;
  color: #3b5990;
`;


const Content = styled.div`
  padding-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px;
  justify-content: space-around;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const WrapLoader = styled.div `
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`
const Wrap = styled.div`
  position: relative;
  background-color: #f7f9fa;
  border-radius: 10px;
  border: 3px solid rgba(5, 5, 5, 0.1);
  cursor: pointer;
  transition: all 314ms cubic-bezier(0.2, 0.4, 0.38, 0.7) 0s;
  box-shadow: rgb(0 0 0 / 75%) 0 16px 25px -12px,
    rgb(1 1 1 / 55%) 0 9px 16px -10px;
  &:hover {
    box-shadow: rgb(0 0 0 / 65%) 0 25px 36px -20px,
      rgb(1 1 1 / 45%) 0 16px 25px -12px;
    transform: scale(0.9875);
    border-color: rgba(5, 5, 5, 0.314);
  }
  padding: 0 5px;
`;

const CategoryImage = styled.img`
  border-radius: 10%;
  width: 100%;
`;

const CategoryTitle = styled.div`
  padding: 0 1rem;
  font-size: 2rem;
  font-weight: 600;
`;

const CategoryDescription = styled.div`
  padding: 5px 20px;
  font-size: 1rem;
  font-weight: 500;
  inline-size: 300px;
  overflow-wrap: break-word;
`;

const CategoryInfos = styled.div`
  display: flex;
  padding: 0 20px;
  flex-flow: row wrap;
  justify-content: space-between;
  font-weight: bold;
  padding-bottom: 16px;
`;
const CategoryRegister = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const CategoryCourseTotal = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const CategoryRating = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  right: 2rem;
  top: 1rem;
  text-align: center;
  font-weight: bold;
  padding-bottom: 10px;
  svg {
    text-align: center;
    color: #ffb142 !important;
    font-weight: bold;
    font-size: 2rem;
  }
`;