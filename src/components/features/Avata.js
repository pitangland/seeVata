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
      <Con>
        <ImgCard
          onClick={naviInfo}
          src={img}
          alt={"avata"}
          key={key}
          com={com}
          className="item"
        />
        <Des>{nickName}</Des>
      </Con>
    </>
  );
};

export default Avata;

let Con = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

let ImgCard = styled.img`
  width: 62px;
  height: 129px;
`;

let Des = styled.div`
  background: #f4f4f4;
  border-radius: 40px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px 8px;

  width: max-content;
  height: 18px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 8px;
  line-height: 130%;

  text-align: center;

  color: #505050;
`;
