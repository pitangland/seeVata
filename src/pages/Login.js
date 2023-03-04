import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import "../shared/theme.css";

import { AiOutlineLeft } from "react-icons/ai";

import { dbService, storageService } from "../service/fBase";
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
} from "@firebase/firestore";

// import { ReactComponent as NextButton } from "../assets/img/nextButton.png";
import nextButton from "../assets/img/nextButton.png";
import { authService } from "../service/fBase";

const Login = () => {
  const navigate = useNavigate();
  const naviHome = () => {
    navigate("/");
  };
  const [nickName, setNickName] = useState("");

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNickName(value);
  };

  // 닉네임 저장하는 것까지 성공 만약에 그 uid로 있으면 패스할 수 있게끔 해야함
  const onSubmit = async (e) => {
    e.preventDefault();

    const userObj = {
      nickName: nickName,
    };

    await addDoc(collection(dbService, authService.currentUser.uid), {
      userObj,
    });
    setNickName("");
    navigate("/Wel");
  };

  return (
    <>
      <Top>
        <AiOutlineLeft onClick={naviHome} />
      </Top>
      <TitleDes>
        내 <Title>seeVata</Title> 이름을
        <br />
        만들어주세요
      </TitleDes>
      <Nick>
        <LoginDes>닉네임</LoginDes>
        <LoginInput
          onChange={onChange}
          placeholder="닉네임을 입력해주세요!"
          col="25"
          row="1"
          maxLength={10}
        ></LoginInput>
      </Nick>
      <NextButton src={nextButton} alt={nextButton} onClick={onSubmit} />
    </>
  );
};

let Top = styled.div`
  margin-top: 6.5vh;
  margin-right: 33vh;
`;

let TitleDes = styled.div`
  margin-top: 5vh;
  margin-right: 15vh;

  width: 197px;
  height: 67px;
  left: 23px;
  top: 140px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 135%;

  text-align: left;

  color: #000000;
`;

let Title = styled.span`
  color: #ff6953;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 135%;

  text-align: left;
`;

let Nick = styled.div`
  text-align: left;
  // margin-right: 15vh;
`;

let LoginDes = styled.div`
  margin-top: 4vh;
  margin-bottom: 0.5vh;
  // margin-left: 10vh;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 135%;

  color: #000000;

  text-align: left;
`;

let LoginInput = styled.textarea`
  margin-bottom: 2vh;

  box-sizing: border-box;

  width: 342px;
  height: 50px;
  left: 25px;
  top: 267px;

  border: 1px solid #b1b1b1;
  border-radius: 6px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 135%;

  &::-webkit-scrollbar {
    display: none;
  }

  &:focus {
    border: none;
  }

  color: #b7b7b7;
`;

let NextButton = styled.img`
  &:hover {
    cursor: pointer;
  }
`;

export default Login;
