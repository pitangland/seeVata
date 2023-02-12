import React from "react";
import styled from "styled-components";

import "../shared/theme.css";

// import { ReactComponent as KakaoLogin } from "../assets/img/kakaoLogin.svg";
import kakaoLogin from "../assets/img/kakaoLogin.png";
import naverLogin from "../assets/img/naverLogin.png";
import googleLogin from "../assets/img/googleLogin.png";
import logo from "../assets/img/logo.png";

const Login = () => {
  // naver

  // kakao
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code&scope=profile_nickname,account_email`;
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  // google

  return (
    <>
      <Title>seeVata</Title>
      <TitleDes>너가 본 나의 이미지를 알려줘</TitleDes>
      <LogoImg src={logo} alt="임시로고" />
      <LoginDes>SNS계정으로 계속하기</LoginDes>
      <LoginBtn>
        <NaverLoginImg src={naverLogin} alt="naverLogin" />
        <KakaoLoginImg
          onClick={handleLogin}
          src={kakaoLogin}
          alt="kakaoLogin"
        />
        <GoogleLoginImg src={googleLogin} alt="googleLogin" />
      </LoginBtn>
    </>
  );
};

let Title = styled.div`
  margin-top: 20vh;
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

let NaverLoginImg = styled.img``;
let KakaoLoginImg = styled.img``;
let GoogleLoginImg = styled.img``;

export default Login;
