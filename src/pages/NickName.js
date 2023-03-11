import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import "../shared/theme.css";

import { dbService } from "../service/fBase";
import { doc, collection, updateDoc, arrayUnion } from "@firebase/firestore";

const NickName = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [nickName, setNickName] = useState("");

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNickName(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const Obj = {
      nickName: nickName,
      uri: "",
      com: "",
    };

    const ref = collection(dbService, "users");

    await updateDoc(
      doc(ref, `${params.id}`),
      { allObj: arrayUnion(Obj) },
      {
        merge: true,
      }
    );
    setNickName("");

    navigate("/Make", {
      state: {
        Newid: params.id,
        NewnickName: nickName,
      },
    });
  };

  return (
    <>
      <Top></Top>
      <TitleDes>
        내 <Title>seeVata</Title> 이름을
        <br />
        만들어주세요
      </TitleDes>
      <Nick>
        <LoginDes>닉네임</LoginDes>
        <LoginInput
          onChange={onChange}
          placeholder="닉네임을 입력해주세요!"
          col="25"
          row="1"
          maxLength={10}
        ></LoginInput>
      </Nick>
      <NextButton onClick={onSubmit}>다음</NextButton>
    </>
  );
};

let Top = styled.div`
  margin-top: 6.5vh;
  margin-right: 33vh;
`;

let TitleDes = styled.div`
  margin-top: 5vh;
  margin-right: 15vh;

  height: 67px;
  left: 23px;
  top: 140px;

  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 135%;

  text-align: left;

  color: #000000;
`;

let Title = styled.span`
  color: #ff6953;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 135%;

  text-align: left;
`;

let Nick = styled.div`
  text-align: left;
  // margin-right: 15vh;
`;

let LoginDes = styled.div`
  margin-top: 4vh;
  margin-bottom: 0.5vh;
  // margin-left: 10vh;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 135%;

  color: #000000;

  text-align: left;
`;

let LoginInput = styled.textarea`
  margin-bottom: 2vh;

  box-sizing: border-box;

  width: 342px;
  height: 50px;
  left: 25px;
  top: 267px;

  border: 1px solid #b1b1b1;
  border-radius: 6px;

  font-family: "Noto Sans KR";
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

  color: #b7b7b7;
`;

let NextButton = styled.div`
  margin-top: 1vh;
  width: 342.95px;
  height: 56px;
  left: 24px;
  top: 681px;

  background: #272a33;
  border-radius: 6px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 135%;
  /* or 20px */

  text-align: center;

  color: #ff6953;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`;

export default NickName;
