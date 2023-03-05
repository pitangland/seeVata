import React, { useState } from "react";
import styled from "styled-components";

import ColorCom from "./color";
import EyeCom from "./eye";
import MouthCom from "./mouth";
import CheekCom from "./cheek";

const Face = () => {
  const [isColor, setIsColor] = useState(false);
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
        <Color onClick={colorModal}>피부색</Color>
        <Eye onClick={eyeModal}>눈</Eye>
        <Mouth onClick={mouthModal}>코입</Mouth>
        <Cheek onClick={cheekModal}>볼</Cheek>
      </Category>

      <Closet>
        {isColor ? <ColorCom setIsColor={setIsColor} /> : null}
        {isEye ? <EyeCom setIsEye={setIsEye} /> : null}
        {isMouth ? <MouthCom setIsMouth={setIsMouth} /> : null}
        {isCheek ? <CheekCom setIsCheek={setIsCheek} /> : null}
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

let Color = styled.div``;
let Eye = styled.div``;
let Mouth = styled.div``;
let Cheek = styled.div``;

let Closet = styled.div``;

export default Face;
