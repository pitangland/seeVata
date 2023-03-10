import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import QueRabbit from "../assets/img/QueRabbit.png";

import "../shared/theme.css";

import { authService, dbService } from "../service/fBase";
import { collection, doc, query, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Welcome = () => {
  // const [id, setId] = useState("");
  const [nickName, setNickName] = useState("");

  const location = useLocation();
  const { id } = location.state;

  const navigate = useNavigate();

  const naviMake = () => {
    navigate("/Make", {
      state: {
        id,
        nickName,
      },
    });
  };

  // onAuthStateChanged(authService, async (user) => {
  //   // Do something with user
  //   // console.log(user.uid);
  //   setId(user.uid);
  // });

  const getNickName = async () => {
    const ref = collection(dbService, "users");
    const q = query(ref, id);

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.id === id) {
        setNickName(doc.data().userObj.nickName);
      }
    });
  };

  useEffect(() => {
    getNickName();
  }, []);

  return (
    <>
      <Wel>
        안녕하세요. {nickName}님
        <br />
        <Title>seeVata</Title>에 오신걸 환영합니다.
      </Wel>
      <Que src={QueRabbit} alt="rabbit" />
      <Next>
        <Des>시바타는 언제든지 수정 할 수 있어요!</Des>
        <StartBtn onClick={naviMake}>
          내 <LittleTitle>&nbsp;seeVata&nbsp;</LittleTitle> 꾸미러 가기
        </StartBtn>
      </Next>
    </>
  );
};

let Wel = styled.div`
  margin-top: 22vh;

  width: 264px;
  height: 58px;
  left: 62px;
  top: 180px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 135%;
  /* or 27px */

  text-align: center;

  color: #000000;
`;

let Title = styled.span`
  width: 264px;
  height: 58px;
  left: 62px;
  top: 180px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 135%;

  text-align: center;

  color: #ff6953;
`;

let Que = styled.img`
  margin-top: 7vh;
`;

let Next = styled.div`
  margin-top: 16vh;
  text-align: center;
`;

let Des = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
  /* identical to box height, or 12px */

  text-align: center;

  color: rgba(0, 0, 0, 0.6);
`;

let StartBtn = styled.div`
  margin-top: 1vh;

  width: 342.95px;
  height: 56px;
  left: 24px;
  top: 681px;

  background: #000000;
  border-radius: 6px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  text-align: center;

  color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`;

let LittleTitle = styled.div`
  color: #ff6953;
`;

export default Welcome;
