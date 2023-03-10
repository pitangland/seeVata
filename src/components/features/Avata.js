import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";

const Card = ({ img, id }) => {
  const navigate = Navigate();

  const naviInfo = () => {
    navigate("/info", {
      state: {
        id,
      },
    });
  };

  useEffect(() => {}, []);

  return (
    <>
      <div onClick={naviInfo}>
        <Img bgc={img} id={id}></Img>
        <ImgCard src={img} alt={id} id={id} />
      </div>
    </>
  );
};

export default Card;

let Img = styled.div`
  width: 100px;
  height: 100px;

  background: ${({ bgc }) => (bgc === "black" ? "black" : bgc)};
  border-radius: 18px;

  &: hover {
    width: 93px;
    height: 93px;
    border: 3px solid #000000;
  }
`;

let ImgCard = styled.img`
  width: 100px;
  height: 100px;

  background: #f0f1f3;
  border-radius: 18px;

  &: hover {
    width: 93px;
    height: 93px;
    border: 3px solid #000000;
  }
`;
