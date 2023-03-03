import React, { useState } from "react";
import styled from "styled-components";

import TopCom from "./top";
import BottomCom from "./bottom";
import OnepieceCom from "./onepiece";
import ShoesCom from "./shoes";

const Cloth = () => {
  const [isTop, setIsTop] = useState(false);
  const [isBottom, setIsBottom] = useState(false);
  const [isOnepiece, setIsOnepiece] = useState(false);
  const [isShoes, setIsShoes] = useState(false);

  const topModal = () => {
    setIsTop(!isTop);
  };

  const bottomModal = () => {
    setIsBottom(!isBottom);
  };

  const onepieceModal = () => {
    setIsOnepiece(!isOnepiece);
  };

  const shoesModal = () => {
    setIsShoes(!isShoes);
  };

  return (
    <>
      <Category>
        <Top onClick={topModal}>상의</Top>
        <Bottom onClick={bottomModal}>하의</Bottom>
        <Onepiece onClick={onepieceModal}>원피스</Onepiece>
        <Shoes onClick={shoesModal}>신발(보류)</Shoes>
      </Category>

      <Closet>
        {isTop ? <TopCom setIsTop={setIsTop} /> : null}
        {isBottom ? <BottomCom setIsBottom={setIsBottom} /> : null}
        {isOnepiece ? <OnepieceCom setIsOnepiece={setIsOnepiece} /> : null}
        {isShoes ? <ShoesCom setIsShoes={setIsShoes} /> : null}
      </Closet>
    </>
  );
};

let Category = styled.div`
  //   border: 1px solid;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  margin: 2vh;
  gap: 24px;

  width: 263px;
  height: 14px;
  left: 33px;
  top: 450px;
  z-index: 41;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;

  color: #272a33;
`;

let Top = styled.div``;
let Bottom = styled.div``;
let Onepiece = styled.div``;
let Shoes = styled.div``;

let Closet = styled.div``;

export default Cloth;
