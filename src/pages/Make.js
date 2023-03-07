import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import "../shared/theme.css";

import avata from "../assets/img/logo.png";
import FaceFeat from "../components/features/closet/faceCom/face";
import ClothFeat from "../components/features/closet/clothCom/cloth";
import AccessoryFeat from "../components/features/closet/accessoryCom/accessory";

import { dbService } from "../service/fBase";
import { collection, query, getDocs } from "firebase/firestore";

import { AiOutlineLeft } from "react-icons/ai";

const Make = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { nickName } = location.state;

  const naviPrev = () => {
    navigate(-1);
  };

  const naviDone = () => {
    navigate("/Done");
  };

  const [face, setFace] = useState([]);
  const [cloth, setCloth] = useState([]);
  const [accessory, setAccessory] = useState([]);

  const [isFace, setIsFace] = useState(false);
  const [isCloth, setIsCloth] = useState(false);
  const [isAccessory, setIsAccessory] = useState(false);

  const faceModal = () => {
    setIsFace(!isFace);
    setIsCloth(false);
    setIsAccessory(false);
  };

  const clothModal = () => {
    setIsCloth(!isCloth);
    setIsFace(false);
    setIsAccessory(false);
  };

  const accessoryModal = () => {
    setIsAccessory(!isAccessory);
    setIsFace(false);
    setIsCloth(false);
  };

  const getCloset = async () => {
    const q = query(collection(dbService, "closet"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      if (doc.id === "face") {
        const faceArr = {
          ...doc.data(),
        };
        setFace(faceArr);
      } else if (doc.id === "cloth") {
        const clothArr = {
          ...doc.data(),
        };
        setCloth(clothArr);
      } else {
        const accessArr = {
          ...doc.data(),
        };
        setAccessory(accessArr);
      }
    });
  };
  useEffect(() => {
    getCloset();
  }, []);

  return (
    <>
      <Top>
        <AiOutlineLeft onClick={naviPrev} />
        <Title>{nickName}님의 seeVata</Title>
        <Success onClick={naviDone}>완성</Success>
      </Top>
      {isFace ? (
        <AvataImg src={avata} alt="avata" className="aniBig" />
      ) : (
        <AvataImg src={avata} alt="avata" />
      )}

      <Category>
        <Face onClick={faceModal}>얼굴</Face>
        <Cloth onClick={clothModal}>옷</Cloth>
        <Access onClick={accessoryModal}>악세사리</Access>
      </Category>

      <Closet>
        {isFace ? <FaceFeat setIsFace={setIsFace} face={face} /> : null}
        {isCloth ? <ClothFeat setIsCloth={setIsCloth} cloth={cloth} /> : null}
        {isAccessory ? (
          <AccessoryFeat
            setIsAccessory={setIsAccessory}
            accessory={accessory}
          />
        ) : null}
      </Closet>
    </>
  );
};

let animationBig = keyframes`
0% {
  transform: scale(1,1);
}
50%{
  transform: scale(1.25,1.25) translate(0, 20px);
}
100%{
  transform: scale(1.8,1.8) translate(0, 50px);
}
`;

let animationSmall = keyframes`
0% {
  transform: scale(1,1);
}
50%{
  transform: scale(1.25,1.25) translate(0, 20px);
}
100%{
  transform: scale(1.8,1.8) translate(0, 50px);
}
`;

let Top = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: row;
`;

let Title = styled.div`
  margin: 6.5vh 6.5vh 1vh 6.5vh;
  width: 141px;
  height: 36px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;

  color: #272a33;
`;

let Success = styled.div`
  width: 56px;
  height: 28px;

  border: 2px solid #000000;
  border-radius: 40px;
`;

let Category = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  margin-top: 3vh;
  margin-left: -130px;
  margin-bottom: 8px;

  z-index: 40;
`;

let Face = styled.div`
  // border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-right: 1vw;

  width: 64px;
  height: 28px;

  background: #d9d9d9;
  border-radius: 40px;
  opacity: 0.3;

  font-size: 12px;
  font-weight: 700;

  &: hover {
    opacity: 1;
  }
`;

let Cloth = styled.div`
  // border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-right: 1vw;

  width: 64px;
  height: 28px;

  background: #d9d9d9;
  border-radius: 40px;
  opacity: 0.3;

  font-size: 12px;
  font-weight: 700;

  &: hover {
    opacity: 1;
  }
`;

let Access = styled.div`
  // border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: space-around;

  width: 64px;
  height: 28px;

  background: #d9d9d9;
  border-radius: 40px;
  opacity: 0.3;

  font-size: 12px;
  font-weight: 700;

  &: hover {
    opacity: 1;
  }
`;

let Closet = styled.div`

  border: 1px;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  left 1px;
  top: 431px;

  background: #ffffff;
  z-index: 40;
`;

let AvataImg = styled.img`
  &.aniBig {
    animation: ${animationBig} 1s forwards;
  }
`;

export default Make;
