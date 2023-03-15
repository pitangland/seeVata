import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import BottomImg from "../assets/img/BottomImg.png";

import Pagination from "../components/features/Pagination";

import { dbService } from "../service/fBase";
import { collection, query, getDocs } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

import { AiOutlineLeft } from "react-icons/ai";
import { BsBoxArrowRight } from "react-icons/bs";

import "../shared/theme.css";

const Main = () => {
  const location = useLocation();

  const { id, nickName, isLoggedIn } = location.state;

  const navigate = useNavigate();

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://seevata.swygbro.com/Nick/${id}`
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
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onLogin = () => {
    navigate("/");
  };

  const [avata, setAvata] = useState([]);
  const [myAvata, setMyAvata] = useState([]);

  const getAvata = async () => {
    const q = query(collection(dbService, "users"));
    const querySnapshot = await getDocs(q);
    const avataArr = [];

    querySnapshot.forEach((doc) => {
      if (doc.id === id) {
        const data = {
          ...doc.data().myObj,
        };
        const newAvataArr = [...Object.values(data)];
        avataArr.push(...newAvataArr);
        setMyAvata(doc.data().userObj);
      }
    });
    setAvata(avataArr);
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

      <Pagination avata={avata} myAvata={myAvata} isLoggedIn={isLoggedIn} />

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

let Next = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 2.5vh;

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
  font-size: 15px;
  line-height: 16px;
  text-align: center;

  color: #ffffff;

  &:hover {
    cursor: pointer;
  }
`;

let MainAlt = styled.img`
  position: fixed;
  width: 390px;
  bottom: 0;

  z-index: 0;
`;

export default Main;
