import React from "react";
import styled from "styled-components";

import "../shared/theme.css";

import logo from "../assets/img/logo.png";

const Make = () => {
  return (
    <>
      <Title>000님의 seeVata</Title>
    </>
  );
};

let Title = styled.div`
  margin-top: 16vh;
  width: 141px;
  height: 36px;

  text-align: center;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;

  color: #272a33;
`;

export default Make;
