import React from 'react';
import styled from "styled-components";

const Ball = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-left: 20px;
  font-size: 30px;
  font-weight: bold;
  background-color: ${({number}) => {
    if (number <= 10) {
      return 'red';
    } else if (number <= 20) {
      return 'orange';
    } else if (number <= 30) {
      return 'yellow';
    } else if (number <= 40) {
      return 'blue';
    } else {
      return 'green';
    }
  }};
`;
export default Ball;