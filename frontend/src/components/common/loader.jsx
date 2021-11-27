import React from "react";
import styled from "styled-components";

const Loader = () => {
    return (
        <React.Fragment>
            <Wrap >
            <p>Đang tải</p>
                <Load>
                    <Ring >
                    <BallHolder >
                        <Ball></Ball>
                    </BallHolder>
                    </Ring>
                </Load>
            </Wrap>
        </React.Fragment>
    )
}

const Wrap = styled.div`
    position: absolute;
    float: left;
    width: 100px;
    margin: 0 10px 10px 0;
    border-radius: 5px;
    text-align: center;
`;

const BallHolder = styled.div`
    position: absolute;
    width: 12px;
    height: 45px;
    left: 17px;
    top: 0px;
`;

const Ball = styled.div`
    position: absolute;
    top: -11px;
    left: 0;
    width: 16px;
    height: 16px;
    border-radius: 100%;
    background: #4282b3;
`;

const Load = styled.div`
animation: loadingE 1.3s linear infinite;

@keyframes loadingE {
    0 {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
`;
const Ring = styled.div`
position: relative;
width: 45px;
height: 45px;
margin: 0 auto;
border: 4px solid #4b9cdb;
border-radius: 100%;
`;
export default Loader;