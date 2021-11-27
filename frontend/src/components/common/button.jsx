import React from "react";
import styled from "styled-components";

function SubmitButton(prop) {
  return <AddButton onClick={prop.click}>{prop.value}</AddButton>;
}

export default SubmitButton;
const AddButton = styled.button`
  background-color: #4caf50;
  height: 40px;
  font-weight: bold;
  color: white;
  transition: 0.3s ease 0s;
  cursor: pointer;
  &:hover {
    border: transparent;
    color: white;
    background-color: #04aa6d;
  }
`;