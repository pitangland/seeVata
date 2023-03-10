import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Card = ({ img, id, getKey, isColor }) => {
  const [isKey, setIsKey] = useState(true);

  const onClick = (key) => {
    setIsKey(!isKey);

    console.log(isKey);

    if (isKey) getKey(key.target.id);
    else getKey(key.target.id.toUpperCase());
  };

  useEffect(() => {}, []);

  return (
    <>
      <div onClick={onClick}>
        {isColor ? (
          <Img bgc={img} id={id}></Img>
        ) : (
          <ImgCard src={img} alt={id} id={id} />
        )}
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
