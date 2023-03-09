import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import Logo from "../assets/img/logo.png";

import { AiOutlineLeft } from "react-icons/ai";

import "../shared/theme.css";

const Comment = () => {
  const [myTypingNum, setMyTypingNum] = useState("");

  const location = useLocation();

  // const { nickName } = location.state;

  const navigate = useNavigate();

  const naviPrev = () => {
    navigate(-1);
  };

  const handleText = (e) => {
    setMyTypingNum(e.target.value);
  };

  // authService === uid 이면 완성됐다고!
  // 아니라면 친구꺼 만들어준 페이지 보여주기

  return (
    <>
      <Head>
        <AiOutlineLeft onClick={naviPrev} />
        <Title>000님의 seeVata</Title>
        <Success>완성</Success>
      </Head>
      <Que src={Logo} alt="rabbit" />
      <TextBox>
        <Text>000님에게 한마디!</Text>
        <TextSend
          col="25"
          row="3"
          maxLength={100}
          onChange={(e) => handleText(e)}
        ></TextSend>
        <TextLength>{myTypingNum.length}/100</TextLength>
      </TextBox>

      <Next>
        <See>000님에게 공유하기</See>
      </Next>
    </>
  );
};

let See = styled.div`
  margin-top: 1vh;
  width: 342.95px;
  height: 56px;
  left: 24px;
  top: 681px;

  background: #272a33;
  border-radius: 6px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #ffffff;

  &:hover {
    cursor: pointer;
  }
`;

let Head = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: row;
`;

let Title = styled.div`
  margin: 6.5vh 6.5vh 1vh 6.5vh;
  width: 141px;
  height: 36px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;

  color: #272a33;
`;

let TextBox = styled.div`
  margin-top: 5vh;

  width: 342px;
  height: 170px;
  left: 24px;
  top: 499px;

  background: #000000;
  border-radius: 14px;
`;

let Text = styled.div`
  position: position;
  display: inline;

  width: 109px;
  height: 16px;
  left: 140px;
  top: 512px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  text-align: center;

  color: #ffffff;
`;

let TextSend = styled.textarea`
  display: -webkit-inline-box;

  width: 326px;
  height: 120px;
  left: 32px;
  top: 541px;

  background: #ffffff;
  border-radius: 8px;

  &::-webkit-scrollbar {
    display: none;
  }

  &:focus {
    border: none;
  }
`;

let TextLength = styled.div`
  display: none;

  margin-bottom: 10vh;

  // display: flex;
  justify-content: flex-end;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  text-align: right;

  // color: #272a33;
  color: red;
  border: 1px solid red;

  opacity: 0.4;
`;

let Success = styled.div`
  width: 56px;
  height: 28px;

  border: 2px solid #000000;
  border-radius: 40px;
`;

let Que = styled.img`
  width: 143px;
  height: 299px;

  margin-top: 7vh;
`;

let Next = styled.div`
  margin-top: 2vh;
  text-align: center;
`;

export default Comment;
