import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import Logo from "../assets/img/logo.png";
import BottomImg from "../assets/img/BottomImg.png";

import Avata from "../components/features/Avata";

import { dbService, authService } from "../service/fBase";
import { collection, query, getDocs } from "firebase/firestore";

import { AiOutlineLeft } from "react-icons/ai";
import { BsBoxArrowRight } from "react-icons/bs";

import "../shared/theme.css";

const Main = () => {
  const location = useLocation();

  const { id, nickName, img } = location.state;

  const navigate = useNavigate();

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://pitangland.github.io/seeVata/Nick/${id}`
      );
      alert("클립보드에 링크가 복사되었습니다.");
    } catch (e) {
      console.log(
        "복사에 실패하였습니다. 새로고침 후 다시 시도해주시기 바랍니다."
      );
    }
  };

  const naviPrev = () => {
    navigate(-1);
  };

  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };

  const [avata, setAvata] = useState([]);

  const getAvata = async () => {
    const q = query(collection(dbService, "users"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.id === id) {
        const data = {
          ...doc.data().myObj,
        };

        Object.entries(data).map(([id, value]) => {
          console.log(id, value);
          Object.entries(value).map(([id, value]) => {
            console.log(id, value);
            setAvata(data);
          });
        });
        console.log(doc.data().myObj);
        console.log(data);
        // setAvata(...data);
        // console.log(avata);
      }
    });
  };

  useEffect(() => {
    getAvata();
    // console.log(avata);
  }, []);

  return (
    <>
      <Head>
        <AiOutlineLeft onClick={naviPrev} />
        <Title>
          안녕하세요.
          <br /> {nickName}님의 seeVata입니다.
        </Title>
        <BsBoxArrowRight onClick={onLogOutClick} />
      </Head>
      <My>
        {avata.map((doc) => (
          <Avata key={doc.com} img={doc.url} com={doc.com} />
        ))}
      </My>
      <Next>
        <See onClick={onCopy}>친구들에게 seeVata를 요청하세요!</See>
        <MainAlt src={BottomImg} alt="BottomImg" />
      </Next>
    </>
  );
};

let Head = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: row;
`;

let Title = styled.div`
  margin: 6.5vh 6.5vh 1vh 6.5vh;
  width: max-content;
  height: 36px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;

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

let Que = styled.img`
  width: 197px;
  height: 411px;

  margin-top: 7vh;
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

  font-family: "Roboto";
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
