import React from "react";
import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

function Footer() {
  return (
    <BottomNav>
      <Title>Công ty trách nhiệm hữu hạn nhiều thành viên Nông Lương Đức</Title>
      <Section>
        <AboutUs>
          <Wrap>
            <h4>Về chúng tôi</h4>
            <a href="#">Điều khoản và quy chế hoạt động</a>
            <a href="#">Chính sách bảo mật</a>
          </Wrap>
        </AboutUs>
        <Community>
          <Wrap>
            <h4>Cộng đồng</h4>
            <a href="#">Chăm sóc khách hàng</a>
            <a href="#">Blog</a>
          </Wrap>
        </Community>
        <ContactInfo>
          <Wrap>
            <h4>Thông tin liên lạc</h4>
            <a href="#">Địa chỉ: INT3306 4 - Nhóm Syntax Error</a>
            <a href="#">Nhóm trưởng: Nông Lương Đức</a>
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
    </BottomNav>
  );
}

export default Footer;
const BottomNav = styled.div`
  overflow: hidden;
  bottom: 0px;
  height: 350px;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  padding: 30px 0;
  border-top: 0.1px solid black;
  gap: 25px;
  text-align: center;
`;

const Title = styled.div`
  padding-left: 150px;
  font-size: 30px;
  font-weight: bold;
`;

const Section = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
`;

const AboutUs = styled.div``;
const Community = styled.div``;
const ContactInfo = styled.div``;
const Logos = styled.div``;

const Wrap = styled.div`
  height: 250px;
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

  a:hover {
    color: orangered;
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
  color: #385898;
`;
const Icon2 = styled(InstagramIcon)`
  color: #f09433;
`;
