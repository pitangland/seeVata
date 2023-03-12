import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import "../shared/theme.css";

import main from "../assets/img/Main.png";
import googleLogin from "../assets/img/googleLogin.png";
import { authService, dbService } from "../service/fBase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { collection, query, getDocs } from "firebase/firestore";

const Home = () => {
  const navigate = useNavigate();

  // google
  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const data = await signInWithPopup(authService, provider);
  };

  const [id, setId] = useState("");
  const [nickName, setNickName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setId(uid);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

  const getNickName = async () => {
    const qu = query(collection(dbService, "users"));

    const quSnapshot = await getDocs(qu);
    quSnapshot.forEach((doc) => {
      if (doc.id === id) {
        setNickName(doc.data().userObj.nickName);
      }
    });
  };

  const onNext = () => {
    if (isLoggedIn) {
      navigate("/Main", {
        state: {
          id,
          nickName,
          isLoggedIn,
        },
      });
    } else {
      handleGoogle();
      navigate("/Login");
    }
  };

  useEffect(() => {
    getNickName();
  });

  return (
    <>
      <LogoImg src={main} alt="임시로고" />
      <LoginBtn>
        <LoginDes>구글 계정으로 간편 로그인</LoginDes>
        <GoogleLoginImg onClick={onNext} src={googleLogin} alt="googleLogin" />
      </LoginBtn>
    </>
  );
};

let LogoImg = styled.img`
  margin-top: 30vh;
  width: 320px;
`;

let LoginDes = styled.div`
  width: 100%;
  height: 14px;
  left: 129px;
  top: 642px;

  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;

  text-align: center;
  margin-top: 20vh;

  color: rgba(0, 0, 0, 0.6);
`;

let LoginBtn = styled.div`
  width: 100%;
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

  width: 310px;
  height: 70px;
`;

export default Home;
