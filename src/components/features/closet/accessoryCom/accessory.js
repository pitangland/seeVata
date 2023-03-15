import React, { useState, useEffect } from "react";
import styled from "styled-components";

import HairCom from "./hair";
import NeckCom from "./neck";
import GlassCom from "./glass";

const Accessory = ({ accessory, getKey }) => {
  const hairArr = {
    ...accessory.hair,
  };

  const neckArr = {
    ...accessory.neck,
  };

  const glassArr = {
    ...accessory.glass,
  };

  const [isHair, setIsHair] = useState(true);
  const [isNeck, setIsNeck] = useState(false);
  const [isGlass, setIsGlass] = useState(false);

  const hairModal = () => {
    setIsHair(!isHair);
    setIsNeck(false);
    setIsGlass(false);
  };

  const neckModal = () => {
    setIsNeck(!isNeck);
    setIsHair(false);
    setIsGlass(false);
  };

  const glassModal = () => {
    setIsGlass(!isGlass);
    setIsHair(false);
    setIsNeck(false);
  };

  useEffect(() => {}, []);

  return (
    <>
      <Category>
        {isHair ? (
          <Hair onClick={hairModal} className="hover">
            머리
          </Hair>
        ) : (
          <Hair onClick={hairModal}>머리</Hair>
        )}
        {isNeck ? (
          <Neck onClick={neckModal} className="hover">
            목걸이
          </Neck>
        ) : (
          <Neck onClick={neckModal}>목걸이</Neck>
        )}
        {isGlass ? (
          <Glass onClick={glassModal} className="hover">
            안경
          </Glass>
        ) : (
          <Glass onClick={glassModal}>안경</Glass>
        )}
      </Category>
      <Closet>
        {isHair ? (
          <HairCom setIsHair={setIsHair} hair={hairArr} getKey={getKey} />
        ) : null}
        {isNeck ? (
          <NeckCom setIsNeck={setIsNeck} neck={neckArr} getKey={getKey} />
        ) : null}
        {isGlass ? (
          <GlassCom setIsGlass={setIsGlass} glass={glassArr} getKey={getKey} />
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
let Hair = styled.div`
  &.hover {
    text-decoration-line: underline;
  }
`;
let Neck = styled.div`
  &.hover {
    text-decoration-line: underline;
  }
`;
let Glass = styled.div`
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

export default Accessory;
