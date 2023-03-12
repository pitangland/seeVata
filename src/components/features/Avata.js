import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Avata = ({ key, img, com, nickName, isLoggedIn }) => {
  const navigate = useNavigate();

  const naviInfo = () => {
    navigate("/info", {
      state: {
        img,
        key,
        nickName,
        com,
        isLoggedIn,
      },
    });
  };

  return (
    <>
      <ImgCard
        onClick={naviInfo}
        src={img}
        alt={"avata"}
        key={key}
        com={com}
        className="item"
      />
      {/* <div>{nickName}</div> */}
    </>
  );
};

export default Avata;

let ImgCard = styled.img`
  width: 56px;
  height: 117px;

  background: #f0f1f3;
  border-radius: 18px;

  // &: hover {
  //   width: 93px;
  //   height: 93px;
  //   border: 3px solid #000000;
  // }

  &:nth-child(1),
  &:nth-child(3),
  &:nth-child(4),
  &:nth-child(6),
  &:nth-child(7),
  &:nth-child(9) {
    align-self: end;
  }
`;
