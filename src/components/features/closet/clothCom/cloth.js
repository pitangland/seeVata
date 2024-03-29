import React, { useState, useEffect } from "react";
import styled from "styled-components";

import TopCom from "./top";
import BottomCom from "./bottom";
import OnepieceCom from "./onepiece";
import OuterCom from "./outer";

const Cloth = ({ cloth, getKey }) => {
  const topArr = {
    ...cloth.top,
  };

  const bottomArr = {
    ...cloth.bottom,
  };

  const onepieceArr = {
    ...cloth.onepiece,
  };

  const outerArr = {
    ...cloth.outer,
  };

  const [isTop, setIsTop] = useState(true);
  const [isBottom, setIsBottom] = useState(false);
  const [isOnepiece, setIsOnepiece] = useState(false);
  const [isOuter, setIsOuter] = useState(false);

  const topModal = () => {
    setIsTop(!isTop);
    setIsBottom(false);
    setIsOnepiece(false);
    setIsOuter(false);
  };

  const bottomModal = () => {
    setIsBottom(!isBottom);
    setIsTop(false);
    setIsOnepiece(false);
    setIsOuter(false);
  };

  const onepieceModal = () => {
    setIsOnepiece(!isOnepiece);
    setIsTop(false);
    setIsBottom(false);
    setIsOuter(false);
  };

  const OuterModal = () => {
    setIsOuter(!isOuter);
    setIsTop(false);
    setIsBottom(false);
    setIsOnepiece(false);
  };

  return (
    <>
      <Category>
        {isTop ? (
          <Top onClick={topModal} className="hover">
            상의
          </Top>
        ) : (
          <Top onClick={topModal}>상의</Top>
        )}
        {isBottom ? (
          <Bottom onClick={bottomModal} className="hover">
            하의
          </Bottom>
        ) : (
          <Bottom onClick={bottomModal}>하의</Bottom>
        )}
        {isOnepiece ? (
          <Onepiece onClick={onepieceModal} className="hover">
            원피스
          </Onepiece>
        ) : (
          <Onepiece onClick={onepieceModal}>원피스</Onepiece>
        )}
        {isOuter ? (
          <Outer onClick={OuterModal} className="hover">
            외투
          </Outer>
        ) : (
          <Outer onClick={OuterModal}>외투</Outer>
        )}
      </Category>

      <Closet>
        {isTop ? (
          <TopCom setIsTop={setIsTop} top={topArr} getKey={getKey} />
        ) : null}
        {isBottom ? (
          <BottomCom
            setIsBottom={setIsBottom}
            bottom={bottomArr}
            getKey={getKey}
          />
        ) : null}
        {isOnepiece ? (
          <OnepieceCom
            setIsOnepiece={setIsOnepiece}
            onepiece={onepieceArr}
            getKey={getKey}
          />
        ) : null}
        {isOuter ? (
          <OuterCom setIsOuter={setIsOuter} outer={outerArr} getKey={getKey} />
        ) : null}
      </Closet>
    </>
  );
};

let Category = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  margin: 2vh 0 0 3.5vh;
  gap: 24px;

  width: 263px;
  height: 14px;
  left: 33px;
  top: 450px;
  z-index: 41;

  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;

  color: #272a33;
`;

let Top = styled.div`
  &.hover {
    text-decoration-line: underline;
  }
`;
let Bottom = styled.div`
  &.hover {
    text-decoration-line: underline;
  }
`;
let Onepiece = styled.div`
  &.hover {
    text-decoration-line: underline;
  }
`;
let Outer = styled.div`
  &.hover {
    text-decoration-line: underline;
  }
`;

let Closet = styled.div`
  height: 45vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  background-color: #f0f1f3;
`;

export default Cloth;
