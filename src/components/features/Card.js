import React, { useState } from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";

const Card = ({ img, id }) => {
  const onClick = (key) => {
    console.log(key.target.id);
  };

  return (
    <>
      <div onClick={onClick}>
        <ImgCard src={img} alt={id} id={id} />
      </div>
    </>
  );
};

export default Card;

let Img = styled.div``;

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
