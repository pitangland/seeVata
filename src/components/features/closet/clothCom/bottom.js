import React from "react";
import styled from "styled-components";

import Card from "../../Card";

const bottom = ({ bottom, getKey }) => {
  return (
    <>
      <Category>
        {Object.entries(bottom).map(([id, value]) => (
          <Card img={value} id={id} getKey={getKey} />
        ))}
      </Category>
    </>
  );
};

let Category = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 3fr);
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  margin: 2vh;
  gap: 24px;

  z-index: 41;

  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;

  color: #272a33;
`;

export default bottom;
