import React from "react";
import styled from "styled-components";

function NotFound() {
  return (
    <Container>
      <Error>
        <h1>404 NOT FOUND</h1>
        <p>You have landed on a page that doesn't exist</p>
      </Error>
    </Container>
  );
}

export default NotFound;

const Container = styled.div`
  min-height: calc(100vh - 435px);
`;

const Error = styled.div`
  padding-top: 50px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  h1 {
    font-weight: bold;
    font-size: 2rem;
  }
  p {
    font-weight: 400;
    font-size: 1.2rem;
  }
`;