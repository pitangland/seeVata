import React from "react";
import styled from "styled-components";

import "../shared/theme.css";

import main from "../assets/img/Main.png";
import googleLogin from "../assets/img/googleLogin.png";
import logo from "../assets/img/logo.png";
import { authService } from "../service/fBase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Home = () => {
  // google
  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };

  return (
    <>
      <LogoImg src={main} alt="임시로고" />
      <LoginDes>구글 계정으로 간편 로그인</LoginDes>
      <LoginBtn>
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

let GoogleLoginImg = styled.img`
  margin: auto;
`;

export default Home;
