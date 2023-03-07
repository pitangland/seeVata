import React, { useState, useEffect } from "react";
import styled from "styled-components";

import TopCom from "./top";
import BottomCom from "./bottom";
import OnepieceCom from "./onepiece";

import { dbService } from "../../../../service/fBase";
import { collection, query, getDocs } from "firebase/firestore";

const Cloth = ({ cloth }) => {
  const topArr = {
    ...cloth.Rtop,
  };

  const bottomArr = {
    ...cloth.Rbottom,
  };

  const onepieceArr = {
    ...cloth.Ronepiece,
  };

  const [isTop, setIsTop] = useState(false);
  const [isBottom, setIsBottom] = useState(false);
  const [isOnepiece, setIsOnepiece] = useState(false);

  const topModal = () => {
    setIsTop(!isTop);
    setIsBottom(false);
    setIsOnepiece(false);
  };

  const bottomModal = () => {
    setIsBottom(!isBottom);
    setIsTop(false);
    setIsOnepiece(false);
  };

  const onepieceModal = () => {
    setIsOnepiece(!isOnepiece);
    setIsTop(false);
    setIsBottom(false);
  };

  return (
    <>
      <Category>
        <Top onClick={topModal}>상의</Top>
        <Bottom onClick={bottomModal}>하의</Bottom>
        <Onepiece onClick={onepieceModal}>원피스</Onepiece>
      </Category>

      <Closet>
        {isTop ? <TopCom setIsTop={setIsTop} top={topArr} /> : null}
        {isBottom ? (
          <BottomCom setIsBottom={setIsBottom} bottom={bottomArr} />
        ) : null}
        {isOnepiece ? (
          <OnepieceCom setIsOnepiece={setIsOnepiece} onepiece={onepieceArr} />
        ) : null}
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

let Closet = styled.div`
  height: 45vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Cloth;
