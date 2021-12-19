import React, { Component } from "react";
import styled from "styled-components";

function Categories() {
  return (
    <Container>
      <Title>Danh mục khóa học</Title>
      <Content>
        <Wrap>
          <img src="https://s.udemycdn.com/home/top-categories/lohp-category-design-v2.jpg"></img>
          <CategoryTitle>Sáng tạo</CategoryTitle>
          <CategoryDescription>
            Kích thích sự sáng tạo trong bạn với những chương trình thực tế của
            chúng tôi.
          </CategoryDescription>
        </Wrap>
        <Wrap>
          <img src="https://s.udemycdn.com/home/top-categories/lohp-category-development-v2.jpg"></img>
          <CategoryTitle>Lập trình</CategoryTitle>
          <CategoryDescription>
            Nơi xây những viên gạch đầu tiên để trở thành lập trình viên với mức
            lương đáng mơ ước.
          </CategoryDescription>
        </Wrap>
        <Wrap>
          <img src="https://s.udemycdn.com/home/top-categories/lohp-category-marketing-v2.jpg"></img>
          <CategoryTitle>Marketing</CategoryTitle>
          <CategoryDescription>
            Chưa biết bắt đầu từ đâu? Học marketing online với các giảng viên
            hàng đầu ngành marketing.
          </CategoryDescription>
        </Wrap>
        <Wrap>
          <img src="https://s.udemycdn.com/home/top-categories/lohp-category-it-and-software-v2.jpg"></img>
          <CategoryTitle>Sáng tạo</CategoryTitle>
          <CategoryDescription></CategoryDescription>
        </Wrap>
        <Wrap>
          <img src="https://s.udemycdn.com/home/top-categories/lohp-category-personal-development-v2.jpg"></img>
          <CategoryTitle>Kỹ năng cá nhân</CategoryTitle>
          <CategoryDescription>
            Bước ra khỏi vùng an toàn và đặt ra các mục tiêu lớn hơn để có thể
            nhận thấy được khả năng của mình.
          </CategoryDescription>
        </Wrap>
        <Wrap>
          <img src="https://s.udemycdn.com/home/top-categories/lohp-category-business-v2.jpg"></img>
          <CategoryTitle>Kinh doanh</CategoryTitle>
          <CategoryDescription>
            Bắt đầu sự nghiệp kinh doanh bằng những{" "}
          </CategoryDescription>
        </Wrap>
        <Wrap>
          <img src="https://s.udemycdn.com/home/top-categories/lohp-category-photography-v2.jpg"></img>
          <CategoryTitle>Nhiếp ảnh</CategoryTitle>
          <CategoryDescription></CategoryDescription>
        </Wrap>
        <Wrap>
          <img src="https://s.udemycdn.com/home/top-categories/lohp-category-music-v2.jpg"></img>
          <CategoryTitle>Nghệ thuật</CategoryTitle>
          <CategoryDescription></CategoryDescription>
        </Wrap>
      </Content>
    </Container>
  );
}

export default Categories;

const Container = styled.div``;


const Title = styled.div`
  font-size: 25px;
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
  display: flex;
  flex-flow: row wrap;
  gap: 50px;
  justify-content: space-around;
`;
const Wrap = styled.div`
  background-color: #f7f9fa;
  border-radius: 10%;
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
  img {
    width: 300px;
    height: 250px;
    margin: 20px 0;
    border-radius: 10%;
  }
`;

const CategoryTitle = styled.div`
  padding: 0 20px;
  font-size: 16px;
  font-weight: 600;
`;

const CategoryDescription = styled.div`
  padding: 3px 20px 20px;
  font-size: 15px;
  font-weight: 500;
  inline-size: 300px;
  overflow-wrap: break-word;
`;
