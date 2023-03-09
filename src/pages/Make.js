import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import { v4 as uuid4 } from "uuid";

import "../shared/theme.css";

import FaceFeat from "../components/features/closet/faceCom/face";
import ClothFeat from "../components/features/closet/clothCom/cloth";
import AccessoryFeat from "../components/features/closet/accessoryCom/accessory";
// import Avata from "../components/features/Avata";

import { dbService, storageService } from "../service/fBase";
import {
  collection,
  query,
  getDocs,
  doc,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";

import { AiOutlineLeft } from "react-icons/ai";
import avata from "../assets/img/logo.png";

const Make = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { id, nickName } = location.state;

  const naviPrev = () => {
    navigate(-1);
  };

  const naviDone = () => {
    onCapture();
    navigate("/Done", {
      state: {
        id,
        nickName,
      },
    });
  };

  const [face, setFace] = useState([]);
  const [cloth, setCloth] = useState([]);
  const [accessory, setAccessory] = useState([]);

  const [rcolor, setRcolor] = useState("");
  const [reye, setReye] = useState("");
  const [rmouth, setRmouth] = useState("");
  const [rcheek, setRcheek] = useState("");

  const [rtop, setRtop] = useState("");
  const [rbottom, setRbottom] = useState("");
  const [ronepiece, setRonepiece] = useState("");

  const [rhair, setRhair] = useState("");
  const [rneck, setRneck] = useState("");
  const [rear, setRear] = useState("");

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
        // console.log(faceArr);
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

  const getFace = (text) => {
    text = `R${text}`;
    if (text.includes("color")) {
      setRcolor(text);
    } else if (text.includes("eye")) {
      setReye(text);
    } else if (text.includes("mouth")) {
      setRmouth(text);
    } else if (text.includes("cheek")) {
      setRcheek(text);
    } else {
      setRcolor("");
      setReye("");
      setRmouth("");
      setRcheek("");
    }
  };

  const getCloth = (text) => {
    text = `R${text}`;
    if (text.includes("top")) {
      setRtop(text);
    } else if (text.includes("bottom")) {
      setRbottom(text);
    } else if (text.includes("onepiece")) {
      setRonepiece(text);
    } else {
      setRtop("");
      setRbottom("");
      setRonepiece("");
    }
  };

  const getAccess = (text) => {
    text = `R${text}`;
    if (text.includes("hair")) {
      setRhair(text);
    } else if (text.includes("neck")) {
      setRneck(text);
    } else if (text.includes("ear")) {
      setRear(text);
    } else {
      setRhair("");
      setRneck("");
      setRear("");
    }
  };

  const onCapture = () => {
    html2canvas(document.getElementById("Div"), {
      useCORS: true,
    }).then(function (canvas) {
      // 바로 저장가능..
      // console.log(
      //   canvas
      //     .toDataURL("image/jpeg")
      //     .replace("image/jpeg", "image/octet-stream")
      // );
      // console.log(canvas.toDataURL("img/png"));
      onSave(canvas.toDataURL("img/png"));
    });
  };

  // 저장하고 user => 저장까지
  // authService.CurrentUser.uid = id와 같으면 userObj.uri에도 userObj.all에도 저장하고
  // 아니면 userObj.all에 저장
  const onSave = async (uri) => {
    let url = "";

    const uriRef = ref(storageService, `${id}/${uuid4()}`);
    const response = await uploadString(uriRef, uri, "data_url");

    url = await getDownloadURL(response.ref);

    await updateDoc(doc(dbService, "users", id), {
      "userObj.uri": url,
    });
  };

  useEffect(() => {
    getCloset();
  }, []);

  return (
    <>
      <Head>
        <AiOutlineLeft onClick={naviPrev} />
        <Title>{nickName}님의 seeVata</Title>
        <Success onClick={naviDone}>완성</Success>
      </Head>
      {isFace ? (
        <>
          <Avata className="aniBig">
            {rcolor === "" ? null : (
              <Color src={face.Rcolor[rcolor]} alt={rcolor}></Color>
            )}
            {reye === "" ? null : <Eye src={face.Reye[reye]} alt={reye}></Eye>}
            {rmouth === "" ? null : (
              <Mouth src={face.Rmouth[rmouth]} alt={rmouth}></Mouth>
            )}
            {rcheek === "" ? null : (
              <Cheek src={face.Rcheek[rcheek]} alt={rcheek}></Cheek>
            )}

            {rtop === "" ? null : <Top src={cloth.Rtop[rtop]} alt={rtop}></Top>}
            {rbottom === "" ? null : (
              <Bottom src={cloth.Rbottom[rbottom]} alt={rbottom}></Bottom>
            )}
            {ronepiece === "" ? null : (
              <Onepiece
                src={cloth.Ronepiece[ronepiece]}
                alt={ronepiece}
                id="onepiece"
              ></Onepiece>
            )}

            {rhair === "" ? null : (
              <Hair src={accessory.Rhair[rhair]} alt={ronepiece}></Hair>
            )}
            {rneck === "" ? null : (
              <Neck src={accessory.Rneck[rneck]} alt={rneck}></Neck>
            )}
            {rear === "" ? null : (
              <Ear src={accessory.Rear[rear]} alt={rear}></Ear>
            )}
            <Base src={avata} alt="avata" />
          </Avata>
        </>
      ) : (
        <Avata id="Div">
          {rcolor === "" ? null : (
            <Color src={face.Rcolor[rcolor]} alt={rcolor}></Color>
          )}
          {reye === "" ? null : <Eye src={face.Reye[reye]} alt={reye}></Eye>}
          {rmouth === "" ? null : (
            <Mouth src={face.Rmouth[rmouth]} alt={rmouth}></Mouth>
          )}
          {rcheek === "" ? null : (
            <Cheek src={face.Rcheek[rcheek]} alt={rcheek}></Cheek>
          )}

          {rtop === "" ? null : <Top src={cloth.Rtop[rtop]} alt={rtop}></Top>}
          {rbottom === "" ? null : (
            <Bottom src={cloth.Rbottom[rbottom]} alt={rbottom}></Bottom>
          )}
          {ronepiece === "" ? null : (
            <Onepiece
              src={cloth.Ronepiece[ronepiece]}
              alt={ronepiece}
            ></Onepiece>
          )}

          {rhair === "" ? null : (
            <Hair src={accessory.Rhair[rhair]} alt={ronepiece}></Hair>
          )}
          {rneck === "" ? null : (
            <Neck src={accessory.Rneck[rneck]} alt={rneck}></Neck>
          )}
          {rear === "" ? null : (
            <Ear src={accessory.Rear[rear]} alt={rear}></Ear>
          )}
          <Base src={avata} alt="avata" />
        </Avata>
      )}

      <Category>
        <Face onClick={faceModal}>얼굴</Face>
        <Cloth onClick={clothModal}>옷</Cloth>
        <Access onClick={accessoryModal}>악세사리</Access>
      </Category>

      <Closet>
        {isFace ? (
          <FaceFeat setIsFace={setIsFace} face={face} getKey={getFace} />
        ) : null}
        {isCloth ? (
          <ClothFeat setIsCloth={setIsCloth} cloth={cloth} getKey={getCloth} />
        ) : null}
        {isAccessory ? (
          <AccessoryFeat
            setIsAccessory={setIsAccessory}
            accessory={accessory}
            getKey={getAccess}
          />
        ) : null}
      </Closet>
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

let Avata = styled.div`
  position: relative;
  &.aniBig {
    animation: ${animationBig} 1s forwards;
  }

  width: 120px;
  height: 250px;
`;

let Base = styled.img`
  positioin: relative;

  width: 117px;
  height: 245px;

  // z-index: 1;
`;

let Color = styled.div`
  color: ${({ color }) => (color === "white" ? "white" : color)}; ;
`;

let Eye = styled.img`
  position: absolute;

  z-index: 3;

  width: 117px;
  height: 245px;
`;

let Mouth = styled.img`
  position: absolute;

  z-index: 3;

  width: 117px;
  height: 245px;
`;
let Cheek = styled.img`
  position: absolute;

  z-index: 2;

  width: 117px;
  height: 245px;
`;

let Top = styled.img`
  position: absolute;

  width: 117px;
  height: 245px;
`;
let Bottom = styled.img`
  position: absolute;

  width: 117px;
  height: 245px;
`;
let Onepiece = styled.img`
  position: absolute;

  width: 117px;
  height: 245px;
`;

let Hair = styled.img`
  position: absolute;

  z-index: 2;

  width: 117px;
  height: 245px;
`;
let Neck = styled.img`
  position: absolute;

  z-index: 2;

  width: 117px;
  height: 245px;
`;
let Ear = styled.img`
  position: absolute;

  z-index: 2;

  width: 117px;
  height: 245px;
`;

export default Make;
