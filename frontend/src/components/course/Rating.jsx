import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import userCourseService from "../../service/userCourseService";
import { useParams } from "react-router";
import Toast from "../common/toast";
import showToast from "../../dummydata/toast";

function Rate({ rating, role }) {
  let { id } = useParams();
  const [rate, setRate] = useState(0);
  const [toastList, setToastList] = useState([]);
  
  useEffect(() => {
    if(role === 0) {
      userCourseService.getRating(id).then((res) => {
        console.log(res)
        setRate(parseInt(res.rating));
      })
    } else {
      setRate(parseInt(rating));
    }
  }, [rating,role]);

  const handleRate = (givenRating) => {
    setRate(givenRating);
    userCourseService
      .Rate(id, givenRating)
      .then(() => {
        setToastList([
          showToast("success", "Thông báo", "Bạn đã đánh giá thành công!"),
        ]);
      })
      .catch((err) => {
          console.log(err.response)
        setToastList([
          showToast("danger", "Thông báo", "Bạn đã đánh giá khóa học này rồi!"),
        ]);
      });
  };
  return (
    <Container>
      {[...Array(5)].map((item, index) => {
        const givenRating = index + 1;
        return (
          <label>
            <Radio
              type="radio"
              value={givenRating}
              onClick={() => {
                if(role === 0) {
                console.log("ok")

                  handleRate(givenRating);
                }
              }}
            />
            <Rating>
              <FaStar
                color={
                  givenRating < rate || givenRating === rate
                    ? "#FFAE42"
                    : "white"
                }
              />
            </Rating>
          </label>
        );
      })}
      <Toast toastList={toastList} />
    </Container>
  );
}

export default Rate;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Radio = styled.input`
  display: none;
`;
const Rating = styled.div`
  cursor: pointer;
`;