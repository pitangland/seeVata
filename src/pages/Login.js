import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import "../shared/theme.css";

import { AiOutlineLeft } from "react-icons/ai";

import { dbService } from "../service/fBase";
import { doc, setDoc, collection } from "@firebase/firestore";

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

  const onSubmit = async (e) => {
    e.preventDefault();

    const userObj = {
      id: authService.currentUser.uid,
      nickName: nickName,
      uri: "",
    };

    const allObj = {};

    const ref = collection(dbService, "users");

    await setDoc(doc(ref, authService.currentUser.uid), {
      userObj,
      allObj,
    });
    setNickName("");

    navigate("/Wel", {
      state: {
        id: authService.currentUser.uid,
      },
    });
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
      <NextButton onClick={onSubmit}>다음</NextButton>
    </>
  );
};

let Top = styled.div`
  width: 100%;
  margin-top: 6.5vh;
  margin-right: 326px;
`;

let TitleDes = styled.div`
  margin-top: 5vh;
  margin-right: 140px;

  height: 67px;
  left: 23px;
  top: 140px;

  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 135%;

  text-align: left;

  color: #000000;
`;

let Title = styled.span`
  color: #ff6953;
  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 135%;

  text-align: left;
`;

let Nick = styled.div`
  text-align: left;
`;

let LoginDes = styled.div`
  margin-top: 4vh;
  margin-bottom: 0.5vh;

  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 135%;

  color: #000000;

  text-align: left;
`;

let LoginInput = styled.textarea`
  margin-bottom: 2vh;

  padding: 12px 12px;

  box-sizing: border-box;

  width: 342px;
  height: 50px;

  border: 1px solid #b1b1b1;
  border-radius: 6px;

  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 135%;

  align-item: center;

  &::-webkit-scrollbar {
    display: none;
  }

  &:focus {
    border: none;
  }

  color: #b7b7b7;
`;

let NextButton = styled.div`
  margin-top: 1vh;
  width: 342.95px;
  height: 56px;
  left: 24px;
  top: 681px;

  background: #272a33;
  border-radius: 6px;

  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 135%;

  text-align: center;

  color: #ff6953;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`;

export default Login;
