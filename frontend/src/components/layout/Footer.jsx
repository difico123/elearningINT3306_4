import React from "react";
import styled from "styled-components";
import { FacebookIcon, InstagramIcon } from "../common/icons";

function Footer() {
  return (
    <BottomNav>
      <Title>Công ty trách nhiệm hữu hạn nhiều thành viên Syntax Error</Title>
      <Section>
        <AboutUs>
          <Wrap>
            <h4>Về chúng tôi</h4>
            <p>Điều khoản và quy chế hoạt động</p>
            <p>Chính sách bảo mật</p>
          </Wrap>
        </AboutUs>
        <Community>
          <Wrap>
            <h4>Cộng đồng</h4>
            <p>Chăm sóc khách hàng</p>
            <p>Blog</p>
          </Wrap>
        </Community>
        <ContactInfo>
          <Wrap>
            <h4>Thông tin liên lạc</h4>
            <p>Địa chỉ: INT3306 4 - Nhóm Syntax Error</p>
            <p>Nhóm trưởng: Nông Lương Đức</p>
          </Wrap>
        </ContactInfo>
        <Logos>
          <Wrap>
            <h4>Mạng xã hội</h4>
            <IconButtons>
              <a href="https://www.facebook.com/">
                <Icon1 style={{ fontSize: 40 }}></Icon1>
              </a>
              <a href="https://www.instagram.com/">
                <Icon2 style={{ fontSize: 40 }}></Icon2>
              </a>
            </IconButtons>
          </Wrap>
        </Logos>
      </Section>
      <SmallText>@ 2021 Ducmup, Inc.</SmallText>
    </BottomNav>
  );
}

export default Footer;
const BottomNav = styled.div`
  overflow: hidden;
  bottom: 0px;
  height: 350px;
  // background-image: url("https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/vp933-audi-41_1_3.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=71e74d1507e7b8637b84e9fb9601ecbd");
  // background-color: #82ccdd;
  background-color: white;
  background-size: 45rem 30rem;
  background-repeat: repeat;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 30px 0;
  border-top: 0.1px solid black;
  gap: 25px;
  text-align: center;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const Section = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
`;

const SmallText = styled.p`
  font-weight: bold;
  font-size: 10px;
  bottom: 20px;
  padding-right: 20px;
  display: flex;
  justify-content: flex-end;
`;

const AboutUs = styled.div``;
const Community = styled.div``;
const ContactInfo = styled.div``;
const Logos = styled.div``;

const Wrap = styled.div`
  h4 {
    text-transform: uppercase;
    color: #c89f65;
    padding: 10px 0;
    font-size: 18px;
  }
  p {
    display: block;
    text-decoration: none;
    color: black;
    padding: 2px 0;
    font-weight: 400;
    font-size: 16px;
  }
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const IconButtons = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: space-around;
  h4 {
    text-transform: uppercase;
    color: #c89f65;
    padding: 10px 0;
    font-size: 18px;
  }
  a {
    display: block;
    text-decoration: none;
    color: black;
    padding: 2px 0;
    font-weight: 400;
    font-size: 16px;
  }
`;

const Icon1 = styled(FacebookIcon)`
  &:hover {
    color: #385898;
  }
`;
const Icon2 = styled(InstagramIcon)`
  &:hover {
    color: #f09433;
  }
`;