import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import BottomImg from "../assets/img/BottomImg.png";

import Avata from "../components/features/Avata";

import { dbService, authService } from "../service/fBase";
import { collection, query, onSnapshot } from "firebase/firestore";

import { AiOutlineLeft } from "react-icons/ai";
import { BsBoxArrowRight } from "react-icons/bs";

import "../shared/theme.css";

const Main = () => {
  const location = useLocation();

  const { id, nickName, isLoggedIn } = location.state;

  console.log(isLoggedIn);
  const navigate = useNavigate();

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://pitangland.github.io/seeVata/Nick/${id}`
      );
      alert("클립보드에 링크가 복사되었습니다.");
    } catch (e) {
      alert("복사에 실패하였습니다. 새로고침 후 다시 시도해주시기 바랍니다.");
    }
  };

  const naviPrev = () => {
    navigate(-1);
  };

  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };

  const onLogin = () => {
    navigate("/");
  };

  const [avata, setAvata] = useState([]);
  const [myAvata, setMyAvata] = useState([]);

  const getAvata = async () => {
    const q = query(collection(dbService, "users"));

    const snap = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.id === id) {
          const data = {
            ...doc.data().myObj,
          };
          const avataArr = [...Object.values(data)];
          setAvata(avataArr);
          setMyAvata(doc.data().userObj);
        }
      });
    });

    return snap;
  };

  useEffect(() => {
    getAvata();
  }, []);

  return (
    <>
      <Head>
        <AiOutlineLeft onClick={naviPrev} />
        <Title>
          안녕하세요.
          <br /> {nickName}님의 seeVata입니다.
        </Title>
        {isLoggedIn ? <BsBoxArrowRight onClick={onLogOutClick} /> : null}
      </Head>
      <My>
        <Avata
          key={myAvata.id}
          img={myAvata.uri}
          nickName={myAvata.nickName}
          isLoggedIn={isLoggedIn}
        />
        {Object.values(avata).map((doc) => (
          <Avata
            key={doc.com}
            img={doc.uri}
            com={doc.com}
            nickName={doc.nickName}
          />
        ))}
      </My>
      <Next>
        {isLoggedIn ? (
          <See onClick={onCopy}>친구들에게 seeVata를 요청하세요!</See>
        ) : (
          <See onClick={onLogin}>나의 seeVata를 만들어보세요!</See>
        )}

        <MainAlt src={BottomImg} alt="BottomImg" />
      </Next>
    </>
  );
};

let Head = styled.div`
  width: 342.95px;

  display: flex;
  align-items: baseline;
  flex-direction: row;
`;

let Title = styled.div`
  margin: 6.5vh 0 1vh 0;
  width: max-content;
  width: 100%;
  height: 36px;

  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 130%;

  color: #272a33;
`;

let My = styled.div`
  // border: 1px solid;
  display: grid;
  grid-template-rows: repeat(3, 160px);
  grid-template-columns: repeat(3, 50px);
  // padding: 15px;
  margin-top: 5vh;
  gap: 50px;
`;

let Next = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  text-align: center;
`;

let See = styled.div`
  z-index: 1;

  width: 342.95px;
  height: 56px;
  left: 24px;
  top: 681px;

  background: #272a33;
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  text-align: center;

  color: #ffffff;

  &:hover {
    cursor: pointer;
  }
`;

let MainAlt = styled.img`
  position: fixed;
  width: 100%;
  bottom: 0;

  z-index: 0;
`;

export default Main;
