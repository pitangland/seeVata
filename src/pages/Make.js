import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import { v4 as uuid4 } from "uuid";

import "../shared/theme.css";

import FaceFeat from "../components/features/closet/faceCom/face";
import ClothFeat from "../components/features/closet/clothCom/cloth";
import AccessoryFeat from "../components/features/closet/accessoryCom/accessory";

import { dbService, storageService } from "../service/fBase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";

import { AiOutlineLeft } from "react-icons/ai";
import { ReactComponent as AvataImg } from "../assets/img/avata.svg";

const Make = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const [id, setId] = useState("");
  const [nickName, setNickName] = useState("");
  const [url, setUrl] = useState("");

  const { Newid, NewnickName } = location.state;

  const naviPrev = () => {
    navigate(-1);
  };

  const naviDone = () => {
    onCapture();
    if (isLoggedIn) {
      navigate("/Done", {
        state: {
          id: id,
          nickName: nickName,
          isLoggedIn,
        },
      });
    } else {
      navigate("/Com", {
        state: {
          id: Newid,
          nickName,
          newNickName: NewnickName,
        },
      });
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const auth = getAuth();
  const isLog = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setId(uid);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
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
  const [router, setRouter] = useState("");

  const [rhair, setRhair] = useState("");
  const [rneck, setRneck] = useState("");
  const [rglass, setRglass] = useState("");

  const [isFace, setIsFace] = useState(true);
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

    const qu = query(collection(dbService, "users"));

    const quSnapshot = await getDocs(qu);
    quSnapshot.forEach((doc) => {
      if (doc.id === id || doc.id === Newid) {
        setNickName(doc.data().userObj.nickName);
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
    } else if (text.includes("COLOR")) {
      setRcolor("");
    } else if (text.includes("EYE")) {
      setReye("");
    } else if (text.includes("MOUTH")) {
      setRmouth("");
    } else if (text.includes("CHEEK")) {
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
    } else if (text.includes("outer")) {
      setRouter(text);
    } else if (text.includes("TOP")) {
      setRtop("");
    } else if (text.includes("BOTTOM")) {
      setRbottom("");
    } else if (text.includes("ONEPIECE")) {
      setRonepiece("");
    } else if (text.includes("OUTER")) {
      setRouter("");
    }
  };

  const getAccess = (text) => {
    text = `R${text}`;
    if (text.includes("hair")) {
      setRhair(text);
    } else if (text.includes("neck")) {
      setRneck(text);
    } else if (text.includes("glass")) {
      setRglass(text);
    } else if (text.includes("HAIR")) {
      setRhair("");
    } else if (text.includes("NECK")) {
      setRneck("");
    } else if (text.includes("GLASS")) {
      setRglass("");
    }
  };

  const onCapture = () => {
    html2canvas(document.getElementById("Div"), {
      useCORS: true,
    }).then(function (canvas) {
      onSave(canvas.toDataURL("image/png"));
    });
  };

  const onSave = async (uri) => {
    let url = "";
    if (isLoggedIn) {
      const uriRef = ref(storageService, `${id}/${uuid4()}`);
      const response = await uploadString(uriRef, uri, "data_url");

      url = await getDownloadURL(response.ref);

      await updateDoc(doc(dbService, "users", id), {
        "userObj.uri": url,
      });
    } else {
      const uriRef = ref(storageService, `${params.id}/${uuid4()}`);
      const response = await uploadString(uriRef, uri, "data_url");

      url = await getDownloadURL(response.ref);

      const docRef = doc(dbService, "users", Newid);

      const docData = (await getDoc(docRef)).data();

      const idx = docData.allObj.findIndex(
        (item) => item.nickName === NewnickName
      );

      const obj = {
        nickName: NewnickName,
        com: "",
        uri: url,
      };

      await updateDoc(docRef, { [`myObj.${NewnickName}`]: obj });
    }
  };

  useEffect(() => {
    isLog();
    getCloset();
  }, [id, nickName, isLoggedIn, url]);

  return (
    <>
      <Head>
        {isFace ? (
          <>
            <AiOutlineLeft onClick={naviPrev} />
            <Title>{nickName}님의 seeVata</Title>
            <Success onClick={naviDone} className="face">
              &nbsp;&nbsp;
            </Success>
          </>
        ) : (
          <>
            <AiOutlineLeft onClick={naviPrev} />
            <Title>{nickName}님의 seeVata</Title>
            <Success onClick={naviDone}>완성</Success>
          </>
        )}
      </Head>
      {isFace ? (
        <>
          <Avata className="aniBig">
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
            {router === "" ? null : (
              <Outer src={cloth.Router[router]} alt={router} id="outer"></Outer>
            )}

            {rhair === "" ? null : (
              <Hair src={accessory.Rhair[rhair]} alt={ronepiece}></Hair>
            )}
            {rneck === "" ? null : (
              <Neck src={accessory.Rneck[rneck]} alt={rneck}></Neck>
            )}
            {rglass === "" ? null : (
              <Glass src={accessory.Rglass[rglass]} alt={rglass}></Glass>
            )}
            {rcolor === "" ? (
              <AvataImg fill="#ffffff" />
            ) : (
              <AvataImg fill={face.Rcolor[rcolor]} />
            )}
          </Avata>
        </>
      ) : (
        <Avata id="Div">
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
          {router === "" ? null : (
            <Outer src={cloth.Router[router]} alt={router} id="outer"></Outer>
          )}

          {rhair === "" ? null : (
            <Hair src={accessory.Rhair[rhair]} alt={ronepiece}></Hair>
          )}
          {rneck === "" ? null : (
            <Neck src={accessory.Rneck[rneck]} alt={rneck}></Neck>
          )}
          {rglass === "" ? null : (
            <Glass src={accessory.Rglass[rglass]} alt={rglass}></Glass>
          )}
          {rcolor === "" ? (
            <AvataImg fill="#ffffff" />
          ) : (
            <AvataImg fill={face.Rcolor[rcolor]} />
          )}
        </Avata>
      )}

      <Category>
        {isFace ? (
          <Face onClick={faceModal} className="hover">
            얼굴
          </Face>
        ) : (
          <Face onClick={faceModal}>얼굴</Face>
        )}
        {isCloth ? (
          <Cloth onClick={clothModal} className="hover">
            옷
          </Cloth>
        ) : (
          <Cloth onClick={clothModal}>옷</Cloth>
        )}
        {isAccessory ? (
          <Access onClick={accessoryModal} className="hover">
            악세사리
          </Access>
        ) : (
          <Access onClick={accessoryModal}>악세사리</Access>
        )}
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
  margin: 6.5vh 2vh 1vh 7vh;
  height: 36px;

  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;

  text-align: center;

  color: #272a33;
`;

let Success = styled.div`
  width: 56px;
  height: 28px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 170%;

  border: 2px solid #000000;
  border-radius: 40px;

  box-sizing: border-box;

  &.face {
    border: 2px white;
    border-radius: 40px;
  }
`;

let Category = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  margin-top: 3vh;
  margin-right: 147px;
  margin-bottom: 8px;

  z-index: 40;
`;

let Face = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-right: 1vw;

  width: 64px;
  height: 28px;

  background: #f4f4f4;
  border-radius: 40px;

  font-size: 12px;
  font-weight: 700;
  color: #bebfc2;

  &.hover {
    color: #ffffff;
    background: #272a33;
  }
`;

let Cloth = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-right: 1vw;

  width: 64px;
  height: 28px;

  background: #f4f4f4;
  border-radius: 40px;

  font-size: 12px;
  font-weight: 700;
  color: #bebfc2;

  &.hover {
    color: #ffffff;
    background: #272a33;
  }
`;

let Access = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  width: 64px;
  height: 28px;

  background: #f4f4f4;
  border-radius: 40px;

  font-size: 12px;
  font-weight: 700;
  color: #bebfc2;

  &.hover {
    color: #ffffff;
    background: #272a33;
  }
`;

let Closet = styled.div`

  border: 1px;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  left 1px;
  top: 431px;

  background-color: #f0f1f3;
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

let Avata = styled.div`
  position: relative;
  &.aniBig {
    animation: ${animationBig} 1s forwards;
  }

  width: 120px;
  height: 250px;
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

  z-index: 3;
`;
let Bottom = styled.img`
  position: absolute;

  width: 117px;
  height: 245px;

  z-index: 2;
`;
let Onepiece = styled.img`
  position: absolute;

  width: 117px;
  height: 245px;

  z-index: 4;
`;
let Outer = styled.img`
  position: absolute;

  width: 117px;
  height: 245px;

  z-index: 5;
`;

let Hair = styled.img`
  position: absolute;

  z-index: 2;

  width: 117px;
  height: 245px;
`;
let Neck = styled.img`
  position: absolute;

  z-index: 5;

  width: 117px;
  height: 245px;
`;

let Glass = styled.img`
  position: absolute;

  z-index: 2;

  width: 117px;
  height: 245px;
`;

export default Make;
