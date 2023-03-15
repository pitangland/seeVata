import React, { useState } from "react";
import styled from "styled-components";

import ColorCom from "./color";
import EyeCom from "./eye";
import MouthCom from "./mouth";
import CheekCom from "./cheek";

const Face = ({ face, getKey }) => {
  const colorArr = {
    ...face.color,
  };

  const eyeArr = {
    ...face.eye,
  };

  const mouthArr = {
    ...face.mouth,
  };

  const cheekArr = {
    ...face.cheek,
  };

  const [isColor, setIsColor] = useState(true);
  const [isEye, setIsEye] = useState(false);
  const [isMouth, setIsMouth] = useState(false);
  const [isCheek, setIsCheek] = useState(false);

  const colorModal = () => {
    setIsColor(!isColor);
    setIsEye(false);
    setIsMouth(false);
    setIsCheek(false);
  };

  const eyeModal = () => {
    setIsEye(!isEye);
    setIsColor(false);
    setIsMouth(false);
    setIsCheek(false);
  };

  const mouthModal = () => {
    setIsMouth(!isMouth);
    setIsColor(false);
    setIsEye(false);
    setIsCheek(false);
  };

  const cheekModal = () => {
    setIsCheek(!isCheek);
    setIsColor(false);
    setIsEye(false);
    setIsMouth(false);
  };

  return (
    <>
      <Category>
        {isColor ? (
          <Color onClick={colorModal} className="hover">
            피부색
          </Color>
        ) : (
          <Color onClick={colorModal}>피부색</Color>
        )}
        {isEye ? (
          <Eye onClick={eyeModal} className="hover">
            눈
          </Eye>
        ) : (
          <Eye onClick={eyeModal}>눈</Eye>
        )}
        {isMouth ? (
          <Mouth onClick={mouthModal} className="hover">
            코입
          </Mouth>
        ) : (
          <Mouth onClick={mouthModal}>코입</Mouth>
        )}
        {isCheek ? (
          <Cheek onClick={cheekModal} className="hover">
            볼
          </Cheek>
        ) : (
          <Cheek onClick={cheekModal}>볼</Cheek>
        )}
      </Category>

      <Closet>
        {isColor ? (
          <ColorCom setIsColor={setIsColor} color={colorArr} getKey={getKey} />
        ) : null}
        {isEye ? (
          <EyeCom setIsEye={setIsEye} eye={eyeArr} getKey={getKey} />
        ) : null}
        {isMouth ? (
          <MouthCom setIsMouth={setIsMouth} mouth={mouthArr} getKey={getKey} />
        ) : null}
        {isCheek ? (
          <CheekCom setIsCheek={setIsCheek} cheek={cheekArr} getKey={getKey} />
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

  // background-color: #f0f1f3;
`;

let Color = styled.div`
  &.hover {
    text-decoration-line: underline;
  }
`;
let Eye = styled.div`
  &.hover {
    text-decoration-line: underline;
  }
`;
let Mouth = styled.div`
  &.hover {
    text-decoration-line: underline;
  }
`;
let Cheek = styled.div`
  &.hover {
    text-decoration-line: underline;
  }
`;

let Closet = styled.div`
  height: 46.5vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  background-color: #f0f1f3;
`;

export default Face;
