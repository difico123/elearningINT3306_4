import React from 'react'
import styled from "styled-components";
import './ShowQuestion.css'

function ShowQuestion() {
    return (
        <ContentWrap>
          <table>
                <thead>
                    <th>Tên câu hỏi</th>
                    <th>Đ/S</th>
                    <th colSpan="4">Đáp Án</th>
                    <th>Điểm</th>
                    <th></th>
                </thead>
                <tbody>
                    <tr>
                    <td rowSpan="4" data-label="name">KensdafsdsfasfsadfasdGriadsfdsaKensdafsdsfasfsadfasdGriadsfdsafsdafasdfsdafasdfsaffeyfsdafasdfsdafasdfsaffey Jr.</td>
                    <td data-label="Đáp án">.907</td>
                    <td colSpan="4" data-label="Đáp án">KensdafsdsfasfsadfasdGriadsfdsaKensdafsdsfasfsadfasdGriadsfdsafsdafasdfsdafasdfsaffeyfsdafasdfsdafasdfsaffey</td>
                    <td rowSpan="4" data-label="marks">1836</td>
                    <td data-label="">630</td>
                    </tr>
                    
                    <tr>
                    <td data-label="ds">71.3</td>
                    <td colSpan="4" data-label="Đáp án">KensdafsdsfasfsadfasdGriadsfdsaKensdafsdsfasfsadfasdGriadsfdsafsdafasdfsdafasdfsaffeyfsdafasdfsdafasdfsaffey</td>
                    <td data-label="">260</td>
                    </tr>
                    
                    <tr>
                    <td data-label="Đáp án">.907</td>
                    <td colSpan="4" data-label="Đáp án">KensdafsdsfasfsadfasdGriadsfdsaKensdafsdsfasfsadfasdGriadsfdsafsdafasdfsdafasdfsaffeyfsdafasdfsdafasdfsaffey</td>
                    <td data-label="">630</td>
                    </tr>
                    
                    <tr>
                    <td data-label="Đáp án">.907</td>
                    <td colSpan="4" data-label="Đáp án">KensdafsdsfasfsadfasdGriadsfdsaKensdafsdsfasfsadfasdGriadsfdsafsdafasdfsdafasdfsaffeyfsdafasdfsdafasdfsaffey</td>
                    <td data-label="">630</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                    <td rowSpan="4" data-label="name">KensdafsdsfasfsadfasdGriadsfdsaKensdafsdsfasfsadfasdGriadsfdsafsdafasdfsdafasdfsaffeyfsdafasdfsdafasdfsaffey Jr.</td>
                    <td data-label="Đáp án">.907</td>
                    <td colSpan="4" data-label="Đáp án">KensdafsdsfasfsadfasdGriadsfdsaKensdafsdsfasfsadfasdGriadsfdsafsdafasdfsdafasdfsaffeyfsdafasdfsdafasdfsaffey</td>
                    <td rowSpan="4" data-label="marks">1836</td>
                    <td data-label="">630</td>
                    </tr>
                    
                    <tr>
                    <td data-label="ds">71.3</td>
                    <td colSpan="4" data-label="Đáp án">KensdafsdsfasfsadfasdGriadsfdsaKensdafsdsfasfsadfasdGriadsfdsafsdafasdfsdafasdfsaffeyfsdafasdfsdafasdfsaffey</td>
                    <td data-label="">260</td>
                    </tr>
                    
                    <tr>
                    <td data-label="Đáp án">.907</td>
                    <td colSpan="4" data-label="Đáp án">KensdafsdsfasfsadfasdGriadsfdsaKensdafsdsfasfsadfasdGriadsfdsafsdafasdfsdafasdfsaffeyfsdafasdfsdafasdfsaffey</td>
                    <td data-label="">630</td>
                    </tr>
                    
                    <tr>
                    <td data-label="Đáp án">.907</td>
                    <td colSpan="4" data-label="Đáp án">KensdafsdsfasfsadfasdGriadsfdsaKensdafsdsfasfsadfasdGriadsfdsafsdafasdfsdafasdfsaffeyfsdafasdfsdafasdfsaffey</td>
                    <td data-label="">630</td>
                    </tr>
                </tbody>
            </table>
        </ContentWrap>
    )
}

export default ShowQuestion;

const ContentWrap = styled.div`
    width:50%;
    height:100vh;
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.7);

`