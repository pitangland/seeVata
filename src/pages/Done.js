import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import QueRabbit from "../assets/img/QueRabbit.png";
import startBtn from "../assets/img/StartButton.png";

import "../shared/theme.css";

const Welcome = () => {
  const navigate = useNavigate();

  const naviMake = () => {
    navigate("/Make");
  };

  // authService === uid 이면 완성됐다고!
  // 아니라면 친구꺼 만들어준 페이지 보여주기

  return (
    <>
      <Wel>
        000님의
        <Title> seeVata</Title>가 <br />
        완성됐어요!
      </Wel>
      <Que src={QueRabbit} alt="rabbit" />
      <Next>
        <Des>시바타는 언제든지 수정 할 수 있어요!</Des>
        <StartBtn src={startBtn} alt="start" onClick={naviMake} />
      </Next>
    </>
  );
};

let Wel = styled.div`
  margin-top: 22vh;

  width: 264px;
  height: 58px;
  left: 62px;
  top: 180px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 135%;
  /* or 27px */

  text-align: center;

  color: #000000;
`;

let Title = styled.span`
  width: 264px;
  height: 58px;
  left: 62px;
  top: 180px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 135%;

  text-align: center;

  color: #ff6953;
`;

let Que = styled.img`
  margin-top: 7vh;
`;

let Next = styled.div`
  margin-top: 16vh;
  text-align: center;
`;

let Des = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
  /* identical to box height, or 12px */

  text-align: center;

  color: rgba(0, 0, 0, 0.6);
`;

let StartBtn = styled.img`
  margin-top: 1vh;

  &:hover {
    cursor: pointer;
  }
`;

export default Welcome;
