import React, { useState, useEffect } from "react";
import styled from "styled-components";

import HairCom from "./hair";
import NeckCom from "./neck";
import EarCom from "./ear";

const Accessory = ({ accessory }) => {
  // console.log(accessory);

  const hairArr = {
    ...accessory.Rhair,
  };

  const neckArr = {
    ...accessory.Rneck,
  };

  const earArr = {
    ...accessory.Rear,
  };

  const [isHair, setIsHair] = useState(false);
  const [isNeck, setIsNeck] = useState(false);
  const [isEar, setIsEar] = useState(false);

  const hairModal = () => {
    setIsHair(!isHair);
    setIsNeck(false);
    setIsEar(false);
  };

  const neckModal = () => {
    setIsNeck(!isNeck);
    setIsHair(false);
    setIsEar(false);
  };

  const earModal = () => {
    setIsEar(!isEar);
    setIsHair(false);
    setIsNeck(false);
  };

  useEffect(() => {}, []);

  return (
    <>
      <Category>
        <Hair onClick={hairModal}>머리</Hair>
        <Neck onClick={neckModal}>목걸이</Neck>
        <Ear onClick={earModal}>귀걸이</Ear>
      </Category>
      <Closet>
        {isHair ? <HairCom setIsHair={setIsHair} hair={hairArr} /> : null}
        {isNeck ? <NeckCom setIsNeck={setIsNeck} neck={neckArr} /> : null}
        {isEar ? <EarCom setIsEar={setIsEar} ear={earArr} /> : null}
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
let Hair = styled.div``;
let Neck = styled.div``;
let Ear = styled.div``;

let Closet = styled.div`
  height: 45vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Accessory;
