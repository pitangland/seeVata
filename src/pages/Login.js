import React from "react";
import styled from "styled-components";

import "../shared/theme.css";

const Login = () => {
  return (
    <>
      <Title>seeVata</Title>
      <TitleDes>내 seeVata 이름을 만들어주세요</TitleDes>
      <LoginDes>닉네임</LoginDes>
      <LoginBtn></LoginBtn>
    </>
  );
};

let Title = styled.div`
  margin-top: 6.5vh;
  width: 134px;
  height: 36px;

  text-align: center;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 100%;

  color: #272a33;
`;

let TitleDes = styled.div`
  margin-bottom: 10vh;
`;

let LogoImg = styled.img``;

let LoginDes = styled.div`
  margin-top: 4vh;
`;

let LoginBtn = styled.div`
  width: 208px;
  display: flex;
  justify-content: space-between;
  margin-top: 2vh;
  &:hover {
    cursor: pointer;
  }
`;

export default Login;
