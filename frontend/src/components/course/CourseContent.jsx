import React from "react";
import styled from "styled-components";

function CourseContent() {
  return (
    <Container>
      <CourseInfos>
        <InfoWrap>
          <Breadcrumb>abc - def - ghi</Breadcrumb>
          <CourseTitle>
            Khóa học gì gì gì gì đấy rất rất rất căn bản
          </CourseTitle>
          <CourseDescription>
            Hôm nay là một ngày hết sức đẹp trời để đi học nhưng tôi lại không
            thấy trời đẹp lắm nên là thôi tôi không học Hôm nay là một ngày hết
            sức đẹp trời để đi học nhưng tôi lại không thấy trời đẹp lắm nên là
            thôi tôi không học
          </CourseDescription>
          <ARWrap>
            <CourseAttendance>Số học viên: 123123</CourseAttendance>
            <CourseRating>Đánh giá: 4 sao;</CourseRating>
          </ARWrap>
          <CourseInstructor>Giảng viên: Đức múp rụp</CourseInstructor>
        </InfoWrap>
        <EnrollSection>
          <BackgroundImage src="https://res.cloudinary.com/subarashis/image/upload/v1637942441/courses/hueihncfseglg2hkrkzg.jpg"></BackgroundImage>
          <EnrollButton>Tham gia</EnrollButton>
        </EnrollSection>
      </CourseInfos>
      <Title>Nội dung khóa học</Title>
      <Body>
        <Content>
          <Wrap>
            <Topic>Chủ đề 1: Giới thiệu về Web</Topic>
            <TopicContent>
              <Slide>Có gì cứ nhét vào đây</Slide>
              <Quiz>Nhét quiz vào đây</Quiz>
            </TopicContent>
          </Wrap>
          <Wrap>
            <Topic>Chủ đề 2: Xác định mục tiêu</Topic>
            <TopicContent>
              <Slide>Có gì cứ nhét vào đây</Slide>
              <Quiz>Nhét quiz vào đây</Quiz>
            </TopicContent>
          </Wrap>
          <Wrap>
            <Topic>Chủ đề 3: Đi sâu vào HTML</Topic>
            <TopicContent>
              <Slide>Có gì cứ nhét vào đây</Slide>
              <Quiz>Nhét quiz vào đây</Quiz>
            </TopicContent>
          </Wrap>
          <Wrap>
            <Topic>Chủ đề 4: Đá qua CSS</Topic>
            <TopicContent>
              <Slide>Có gì cứ nhét vào đây</Slide>
              <Quiz>Nhét quiz vào đây</Quiz>
            </TopicContent>
          </Wrap>
          <Wrap>
            <Topic>Chủ đề 5: Sử dụng Javascript</Topic>
            <TopicContent>
              <Slide>Có gì cứ nhét vào đây</Slide>
              <Quiz>Nhét quiz vào đây</Quiz>
            </TopicContent>
          </Wrap>
        </Content>
        <Leaderboard>
          <LBTitle>Đại lộ danh vọng</LBTitle>
          <LBContent>
            <Pro>
              <Grandmaster>Lăn Lông Lốc</Grandmaster>
              <Point>10</Point>
            </Pro>
            <Pro>
              <Master>Lông Nương Múp</Master>
              <Point>10</Point>
            </Pro>
            <Pro>
              <Master>Cindy Thái Tài</Master>
              <Point>10</Point>
            </Pro>
            <Pro>
              <Master>Duy Mạnh</Master>
              <Point>10</Point>
            </Pro>
            <Pro>
              <Master>Tiến Bịp</Master>
              <Point>10</Point>
            </Pro>
            <Pro>
              <Hacker>Putin</Hacker>
              <Point>10</Point>
            </Pro>
            <Pro>
              <Hacker>Chim Bé</Hacker>
              <Point>10</Point>
            </Pro>
            <Pro>
              <Hacker>Bùi Xuân Huấn</Hacker>
              <Point>10</Point>
            </Pro>
            <Pro>
              <Hacker>Tập Cận Bình</Hacker>
              <Point>10</Point>
            </Pro>
            <Pro>
              <Hacker>ĐàM VĩnH HưnG</Hacker>
              <Point>10</Point>
            </Pro>
          </LBContent>
        </Leaderboard>
      </Body>
    </Container>
  );
}

export default CourseContent;

const Container = styled.div`
  min-height: calc(100vh - 435px);
  display: flex;
  flex-flow: column nowrap;
  padding: 0;
`;
const CourseInfos = styled.div`
  background-color: #1c1d1f;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  padding: 5vh 16vw;
  gap: 2.5vw;
`;

const Breadcrumb = styled.div`
  color: #c0c0c0;
  font-weight: bold;
  font-size: 1rem;
  padding-bottom: 1.5rem;
`;

const InfoWrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const CourseTitle = styled.div`
  color: white;
  font-size: 2rem;
  font-weight: bold;
  padding-bottom: 0.5rem;
  inline-size: 45vw;
  overflow-wrap: break-word;
`;

const CourseDescription = styled.div`
  color: white;
  font-size: 1.2rem;
  padding-bottom: 1rem;
  inline-size: 45vw;
  overflow-wrap: break-word;
`;

const CourseInstructor = styled.div`
  color: white;
  font-size: 0.9rem;
  padding-bottom: 1rem;
  inline-size: 45vw;
  overflow-wrap: break-word;
  font-weight: bold;
`;

const CourseAttendance = styled.div`
  color: white;
  font-size: 1rem;
`;
const CourseRating = styled.div`
  color: white;
  font-size: 1rem;
`;
const ARWrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 50px;
  padding-bottom: 20px;
`;

const EnrollSection = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const BackgroundImage = styled.img`
  width: 100%;
`;

const EnrollButton = styled.div`
  text-align: center;
  cursor: pointer;
  color: white;
  font-weight: 600;
  padding: 12px 0;
  font-size: 15px;
  height: 50px;
  transition: 0.5s ease 0s;
  background-color: #b266ff;
  &:hover {
    background-color: #a435f0;
  }
`;

const Body = styled.div`
  padding: 0 12vw 5vh;
  display: flex;
  flex-flow: row nowrap;
  gap: 7vw;
`;

const Title = styled.div`
  padding: 6vh 12vw 0;
  font-size: 1.75rem;
  font-weight: bold;
`;

const Content = styled.div`
  display: flex;
  padding-top: 1.5rem;
  flex-flow: column nowrap;
  gap: 2.75rem;
  inline-size: 50vw;
  overflow-wrap: break-word;
`;

const Wrap = styled.div`
  padding-left: 1rem;
`;

const Topic = styled.div`
  padding: 0.7rem 0.6rem;
  border-left: 5px solid grey;
  background-color: #f7f9fa;
  font-size: 1.25rem;
  font-weight: bold;
`;

const TopicContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
  padding: 3vh 1vw 0;
`;

const Slide = styled.div``;

const Quiz = styled.div``;

const Leaderboard = styled.div`
  width: 20vw;
  border-top: 1px solid black;
  display: flex;
  flex-direction: column;
`;

const LBTitle = styled.div`
  background-color: #82b74b;
  font-size: 1.25rem;
  font-weight: bold;
  padding: 0.7rem 1rem;
  border-left: 5px solid orange;
  color: white;
`;

const LBContent = styled.div`
  background-color: #f0f0f0;
  display: flex;
  flex-flow: column nowrap;
`;
const Pro = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 1vh 1vw;
  border-bottom: 1px solid white;
  font-weight: bold;
`;
const Grandmaster = styled.div`
  animation: colorRotate 10s linear 0s infinite;
  @keyframes colorRotate {
    from {
      color: red;
    }
    16% {
      color: yellow;
    }
    33% {
      color: green;
    }
    50% {
      color: lightblue;
    }
    66% {
      color: blue;
    }
    83% {
      color: purple;
    }
    100% {
      color: red;
    }
  }
`;
const Master = styled.div`
  color: red;
`;
const Hacker = styled.div`
  color: orange;
`;

const Point = styled.div`
  font-weight: 300;
`;
