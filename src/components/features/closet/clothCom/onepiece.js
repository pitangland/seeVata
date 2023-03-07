import React from "react";
import styled from "styled-components";

import Card from "../../Card";

const onepiece = ({ onepiece }) => {
  return (
    <>
      <Category>
        {Object.entries(onepiece).map(([id, value]) => (
          <Card img={value} id={id} />
        ))}
      </Category>
    </>
  );
};

let Category = styled.div`
  //   border: 1px solid;
  display: grid;
  grid-template-columns: repeat(3, 3fr);
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  margin: 2vh;
  gap: 24px;

  z-index: 41;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;

  color: #272a33;
`;

export default onepiece;
