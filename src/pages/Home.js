import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import "../shared/theme.css";

import main from "../assets/img/Main.png";
import googleLogin from "../assets/img/googleLogin.png";
import { authService } from "../service/fBase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Home = () => {
  const navigate = useNavigate();

  // google
  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const data = await signInWithPopup(authService, provider);
    // console.log(data.user.uid);
    // console.log(data.user.displayName);

    navigate("/Login");
  };

  return (
    <>
      <LogoImg src={main} alt="임시로고" />
      <LoginBtn>
        <LoginDes>구글 계정으로 간편 로그인</LoginDes>
        <GoogleLoginImg
          onClick={handleGoogle}
          src={googleLogin}
          alt="googleLogin"
        />
      </LoginBtn>
    </>
  );
};

let LogoImg = styled.img`
  margin-top: 30vh;
  width: 320px;
`;

let LoginDes = styled.div`
  width: 131px;
  height: 14px;
  left: 129px;
  top: 642px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;

  text-align: center;
  margin-top: 20vh;

  color: rgba(0, 0, 0, 0.6);
`;

let LoginBtn = styled.div`
  width: 310px;
  height: 56px;
  left: 40px;
  top: 668px;

  display: contents;
  margin-top: 18vh;
  &:hover {
    cursor: pointer;
  }
`;

let GoogleLoginImg = styled.img`
  margin-top: 1vh;
`;

export default Home;
