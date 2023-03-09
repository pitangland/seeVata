import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import avata from "../../assets/img/logo.png";

const Avata = () => {
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

  const getKey = (key) => {
    setReye(key);
  };

  useEffect(() => {
    getKey();
  }, []);

  return (
    <>
      <Avata id="avata">
        {/* src={imgUrl} */}
        {/* <Color></Color>
        <Eye></Eye>
        <Mouth></Mouth>
        <Cheek></Cheek>

        <Top></Top>
        <Bottom></Bottom>
        <Onepiece></Onepiece>

        <Hair></Hair>
        <Neck></Neck>
        <Ear></Ear> */}

        <Base src={avata} alt="avata" className="aniBig" />
      </Avata>
    </>
  );
};

let Color = styled.img``;
let Eye = styled.img``;
let Mouth = styled.img``;
let Cheek = styled.img``;
let Top = styled.img``;
let Bottom = styled.img``;
let Onepiece = styled.img``;
let Hair = styled.img``;
let Neck = styled.img``;
let Ear = styled.img``;

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

let Base = styled.img`
  &.aniBig {
    animation: ${animationBig} 1s forwards;
  }
`;

export default Avata;

/*
        {isFace ? (
          <>
            <Base src={avata} alt="avata" className="aniBig" />
          </>
        ) : (
          <Base src={avata} alt="avata" />
        )}

        */
