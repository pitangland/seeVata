import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import Logo from "../assets/img/logo.png";

import { AiOutlineLeft, AiOutlineClose } from "react-icons/ai";
import { MdMoveToInbox, MdModeEdit } from "react-icons/md";

import "../shared/theme.css";

const Info = () => {
  const location = useLocation();

  const { img, key, com } = location.state;

  console.log(com);
  const navigate = useNavigate();

  const naviPrev = () => {
    navigate(-1);
  };

  // authService === uid 이면 완성됐다고!
  // 아니라면 친구꺼 만들어준 페이지 보여주기

  return (
    <>
      <Head>
        <AiOutlineLeft onClick={naviPrev} />
        <Title>000님의 seeVata</Title>
      </Head>
      <Box>
        <Que src={img} alt="rabbit" />
      </Box>
      <Wrap>
        <IconWrapper>
          <MdModeEdit className="iconSize" />
        </IconWrapper>
        <IconWrapper>
          <MdMoveToInbox className="iconSize" />
        </IconWrapper>
      </Wrap>
      <Content>{com}</Content>
    </>
  );
};

let Head = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: row;
`;

let Title = styled.div`
  margin: 6.5vh 6.5vh 1vh 8vh;
  width: 141px;
  height: 36px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;

  color: #272a33;
`;

let Box = styled.div`
  margin-top: 1vh;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 278px;
  height: 60vh;

  background: #d9d9d9;
`;

let Que = styled.img`
  width: 197px;
  height: 411px;
`;

let Wrap = styled.div`
  margin-top: 2vh;
  display: flex;
`;

const IconWrapper = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 18px;

  background: #272a33;
  border-radius: 50%;

  .iconSize {
    width: 30px;
    height: 30px;

    color: white;
  }
`;

let Content = styled.div`
  margin-top: 4vh;
  width: 308px;
  height: 48px;
  left: 41px;
  top: 666px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 160%;
  /* or 24px */

  letter-spacing: -0.03em;

  color: rgba(102, 102, 102, 0.5);
`;

export default Info;
