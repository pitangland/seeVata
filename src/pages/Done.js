import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import { AiOutlineLeft, AiOutlineClose } from "react-icons/ai";

import { dbService } from "../service/fBase";
import { collection, query, getDocs, onSnapshot } from "firebase/firestore";

import "../shared/theme.css";

const Done = () => {
  const location = useLocation();

  const { id, nickName } = location.state;

  const [img, setImg] = useState("");

  const navigate = useNavigate();

  const naviMain = () => {
    // navigate(`/Main/${id}`, {
    navigate("/Main", {
      state: {
        id,
        nickName,
      },
    });
  };

  const naviPrev = () => {
    navigate(-1);
  };

  const getImg = async () => {
    const q = query(collection(dbService, "users"));

    const snap = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.id === id) {
          setImg(doc.data().userObj.uri);
        }
      });
    });
    return snap;
  };

  useEffect(() => {
    getImg();
  }, []);

  return (
    <>
      <Top>
        <AiOutlineLeft onClick={naviPrev} />
        <AiOutlineClose onClick={naviMain} />
      </Top>
      <Wel>
        {nickName}님의 seeVata가 <br />
        완성됐어요!
      </Wel>
      <Que src={img} alt="rabbit" />
      <Next>
        <See onClick={naviMain}>{nickName}님의 방보기</See>
      </Next>
    </>
  );
};

let See = styled.div`
  margin-top: 1vh;
  width: 342.95px;
  height: 56px;
  left: 24px;
  top: 681px;

  background: #272a33;
  border-radius: 6px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #ffffff;

  &:hover {
    cursor: pointer;
  }
`;

let Top = styled.div`
  width: 300px;
  margin: 6.5vh 6.5vh 1vh 6.5vh;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

let Wel = styled.div`
  margin-top: 5vh;

  width: 181px;
  height: 52px;
  left: 105px;
  top: 129px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 130%;
  /* or 26px */

  text-align: center;

  color: #272a33;
`;

let Que = styled.img`
  width: 197px;
  height: 411px;

  margin-top: 7vh;
`;

let Next = styled.div`
  margin-top: 8vh;
  text-align: center;
`;

export default Done;
