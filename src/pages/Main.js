import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import Logo from "../assets/img/logo.png";
import BottomImg from "../assets/img/BottomImg.png";

import { AiOutlineLeft, AiOutlineClose } from "react-icons/ai";
import { BsBoxArrowRight } from "react-icons/bs";

import "../shared/theme.css";

const Main = () => {
  const location = useLocation();

  const { id, nickName, img } = location.state;

  const navigate = useNavigate();

  const navi = () => {
    navigate("/Make");
  };

  const naviPrev = () => {
    navigate(-1);
  };

  // authService === uid 이면 완성됐다고!
  // 아니라면 친구꺼 만들어준 페이지 보여주기

  return (
    <>
      <Head>
        <AiOutlineLeft onClick={naviPrev} />
        <Title>
          안녕하세요.
          <br /> 000님의 seeVata입니다.
        </Title>
        <BsBoxArrowRight />
      </Head>
      <Que src={img} alt="rabbit" />
      <Next>
        <See>친구들에게 seeVata를 요청하세요!</See>
        <MainAlt src={BottomImg} alt="BottomImg" />
      </Next>
    </>
  );
};

let Head = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: row;
`;

let Title = styled.div`
  margin: 6.5vh 6.5vh 1vh 6.5vh;
  width: max-content;
  height: 36px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;

  color: #272a33;
`;

let Que = styled.img`
  width: 197px;
  height: 411px;

  margin-top: 7vh;
`;

let Next = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  margin-top: 8vh;
  text-align: center;
`;

let See = styled.div`
  z-index: 1;

  margin-top: 7vh;
  width: 342.95px;
  height: 56px;
  left: 24px;
  top: 681px;

  background: #272a33;
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  text-align: center;

  color: #ffffff;

  &:hover {
    cursor: pointer;
  }
`;

let MainAlt = styled.img`
  position: fixed;
  width: 100%;
  bottom: 0;

  z-index: 0;
`;

export default Main;
