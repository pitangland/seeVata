import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import { AiOutlineLeft } from "react-icons/ai";

import { dbService } from "../service/fBase";
import {
  doc,
  collection,
  query,
  getDocs,
  updateDoc,
  onSnapshot,
} from "@firebase/firestore";

import "../shared/theme.css";

const Comment = () => {
  const [myTypingNum, setMyTypingNum] = useState("");
  const [userUrl, setUserUrl] = useState("");

  const location = useLocation();

  const comment = useRef();
  const { id, nickName, newNickName } = location.state;

  const navigate = useNavigate();

  const naviPrev = () => {
    navigate(-1);
  };

  const naviDone = () => {
    navigate("/Done", {
      state: {
        id,
        newNickName: newNickName,
        nickName: nickName,
      },
    });
  };

  const handleText = (e) => {
    setMyTypingNum(e.target.value);
  };

  const getImg = () => {
    const q = query(collection(dbService, "users"));

    const snap = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((docs) => {
        const data = docs.data().myObj;
        for (const key in data) {
          if (key === newNickName) {
            setUserUrl(data[key].uri);
          }
        }
      });
    });
    return snap;
  };

  const onSave = async () => {
    const co = collection(dbService, "users");
    const q = query(co);

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((docs) => {
      const data = docs.data().myObj;
      for (const key in data) {
        if (key === newNickName) {
          updateDoc(doc(dbService, "users", id), {
            [`myObj.${newNickName}.com`]: comment.current.value,
          });
        }
      }
    });
    naviDone();
  };

  useEffect(() => {
    getImg();
  }, []);

  return (
    <>
      <Head>
        <AiOutlineLeft onClick={naviPrev} />
        <Title>{nickName}님의 seeVata</Title>
      </Head>
      <Que src={userUrl} alt="rabbit" />
      <TextBox>
        <Text>{nickName}님에게 한마디!</Text>
        <TextSend
          col="25"
          row="3"
          maxLength={100}
          ref={comment}
          placeholder="100글자만 쓸 수 있따"
          onChange={(e) => handleText(e)}
        ></TextSend>
        <TextLength>{myTypingNum.length}/100</TextLength>
      </TextBox>

      <Next>
        <See onClick={onSave}>{nickName}님에게 공유하기</See>
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

  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
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

let Head = styled.div`
  width: 342.95px;

  display: flex;
  align-items: baseline;
  flex-direction: row;
`;

let Title = styled.div`
  margin: 6.5vh 1vh 1vh 9vh;
  width: max-content;
  height: 36px;

  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;

  color: #272a33;
`;

let TextBox = styled.div`
  margin-top: 5vh;
  padding-top: 1.5vh;

  width: 342px;
  height: 180px;

  background: #000000;
  border-radius: 14px;
`;

let Text = styled.div`
  position: position;
  display: inline;

  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 16px;
  text-align: center;

  color: #ffffff;
`;

let TextSend = styled.textarea`
  display: -webkit-inline-box;

  padding: 15px 12px;

  box-sizing: border-box;

  margin-top: 2vh;

  width: 320px;
  height: 122px;

  background: #ffffff;
  border-radius: 8px;

  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 135%;

  &::-webkit-scrollbar {
    display: none;
  }

  &:focus {
    border: none;
  }
`;

let TextLength = styled.div`
  display: none;

  margin-bottom: 10vh;

  // display: flex;
  justify-content: flex-end;

  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  text-align: right;

  // color: #272a33;
  color: red;
  border: 1px solid red;

  opacity: 0.4;
`;

let Que = styled.img`
  width: 143px;
  height: 299px;

  margin-top: 7vh;
`;

let Next = styled.div`
  margin-top: 2vh;
  text-align: center;
`;

export default Comment;
