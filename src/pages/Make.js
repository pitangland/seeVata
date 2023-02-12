import React from "react";
import styled, { keyframes } from "styled-components";

import "../shared/theme.css";

import avata from "../assets/img/logo.png";

const Make = () => {
  return (
    <>
      <Title>000님의 seeVata</Title>
      <AvataImg src={avata} alt="avata"></AvataImg>

      <Category>
        <Face>얼굴</Face>
        <Cloth>옷</Cloth>
        <Access>악세사리</Access>
      </Category>

      <Closet></Closet>
    </>
  );
};

let Title = styled.div`
  margin-top: 6.5vh;
  width: 141px;
  height: 36px;

  display: flex;
  align-item: center;
  text-align: center;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;

  color: #272a33;
`;

let Category = styled.div`
  display: flex;
  margin-left: -40vw;
  // margin-top: 3vh;
  // margin-top: 431px;
  margin-bottom: 0px;
`;

let Face = styled.div`
  // border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-right: 1vw;

  width: 64px;
  height: 28px;

  background: #d9d9d9;
  border-radius: 40px;
  opacity: 0.3;

  font-size: 12px;
  font-weight: 700;

  &: hover {
    opacity: 1;
  }
`;

let Cloth = styled.div`
  // border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-right: 1vw;

  width: 64px;
  height: 28px;

  background: #d9d9d9;
  border-radius: 40px;
  opacity: 0.3;

  font-size: 12px;
  font-weight: 700;

  &: hover {
    opacity: 1;
  }
`;

let Access = styled.div`
  // border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: space-around;

  width: 64px;
  height: 28px;

  background: #d9d9d9;
  border-radius: 40px;
  opacity: 0.3;

  font-size: 12px;
  font-weight: 700;

  &: hover {
    opacity: 1;
  }
`;

let Closet = styled.div`
  border: 1px solid;
  width: 100%;
  height: 100%;
  left 1px;
  top: 431px;

  background-color: #efefef;
`;

let animation = keyframes`
0% {
  transform: scale(1,1);
}
50%{
  transform: scale(1.25,1.25) translate(0, 30px);
}
100%{
  transform: scale(1.5,1.5) translate(0, 75px);
}

`;

let AvataImg = styled.img`
  ${Face}: hover {
    animation: ${animation} 1s forwards;
  }
`;

export default Make;
