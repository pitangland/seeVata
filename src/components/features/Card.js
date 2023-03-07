import React, { useEffect } from "react";
import styled from "styled-components";

const Card = ({ img, id, getKey }) => {
  const onClick = (key) => {
    getKey(key.target.id);
  };

  useEffect(() => {}, []);

  return (
    <>
      <div onClick={onClick}>
        <ImgCard src={img} alt={id} id={id} />
      </div>
    </>
  );
};

export default Card;

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
