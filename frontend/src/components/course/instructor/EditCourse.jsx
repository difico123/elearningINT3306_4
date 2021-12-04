import React,{ useState } from 'react'
import styled from "styled-components";

import { Link, useParams,Navigate } from "react-router-dom";

function EditCourse() {
    let {id} = useParams();
    return (
        <div>
            <Wrap>
            <Container>
              <div>
                  <Field class="field-container">
                      <FieldInput class="field-input" id="inputid" name="inputName" type="text" placeholder=" "/>
                      <Label class="field-placeholder" for="inputName">First name</Label>
                  </Field>
              </div>
            </Container>
        </Wrap>
    </div>
    )
}

const Wrap = styled.div`
  min-height: calc(100vh - 435px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
const Container = styled.div`
  max-width: 60%;
  border: 1px solid black;
  width: 100%;
  background-color: #fff;
  padding: 25px 30px;
  border-radius: 5px;
`;
const Title = styled.div`
  font-size: 25px;
  font-weight: 500;
`;
const Field = styled.div`
    position: relative;
    border:1px solid #bcbaba;
    height:50px;
    width:320px;
    padding-left:12px;
`;
const FieldInput = styled.input`
color: #000;
border:none;
 padding: $label-padding;
 margin-top:20px;
 font-size: 16px;
 display: block;
 box-sizing: border-box;
 width: 100%;
 bottom:0px;
    &:focus {
        outline: none;
    }
    &.c-fix,
    &:focus,
    &:not(:placeholder-shown),
    {
    border-color: transparent;
    ~ Label {
        color:#646669;
        font-size: 11px;
        top: calc(30% - .5rem);
        transform: translate(#{$label-padding}, 0%);
    }
    }
    
    &::-webkit-input-placeholder {
    color: transparent;
    }
    &::-moz-placeholder {
    color: transparent;
    }
    &:-ms-input-placeholder {
    color: transparent;
    }

`;
const Label = styled.label`
    position: absolute;
    top: 50%;
    transform: translate(#{$label-padding}, -50%);
    pointer-events: none;
    transition: all .14s ease-in-out;
    font-size:18px;
    color:#adadad;
`;

const PW = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px 0 12px 0;
  label {
    display: block;
    font: 1rem 'Fira Sans', sans-serif;
  }

  input,
  label {
    margin: .4rem 0;
  }

  input {
   height: 45px;
   width: 100%;
   outline: none;
   border-radius: 5px;
   border: 1px solid #ccc;
   padding-left: 15px;
   font-size: 16px;
  }
`;

const Confirm = styled.button`

  height: 45px;
  margin: 45px 0;
  input {
    cursor: pointer;
   height: 100%;
   width: 100%;
   outline: none;
   color: #fff;
   border:none;
   font-size: 18px;
   font-weight: 500;
   border-radius: 5px;
   letter-spacing: 1px;
   background: linear-gradient(135deg, #71b7e6, #9b59b6)
  }
`;
export default EditCourse
