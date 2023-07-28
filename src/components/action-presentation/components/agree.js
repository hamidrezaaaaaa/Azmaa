import React, { useState } from "react";
import styled from "styled-components";
import BestEnvoy from "../../home/components/bestEnvoy";
import upArrow from "../../../assets/arrow.webp";
import ok from "../../../assets/ok.webp";
import { useNavigate } from "react-router-dom";

export default function Agree({ envoys }) {
  const navigate = useNavigate();
  const [showMore,setShowMore]=useState(false);

  const envoysList =envoys !== undefined && envoys.length>0 && envoys.map((item, i) => {
    return (
      <BestEnvoy
        key={i}
        envoy={item.voter}
        click={() => {
          navigate(`/envoy/${item.voter.id}`);
        }}
      />
    );
  });



  return (
    <Container>
      <Title>{envoys !== undefined && envoys.length>0 && envoys[0]?(envoys[0].vote ? envoys[0].vote :'نمایندگان موافق'):""}   </Title>
      <Gallery>{envoysList}</Gallery>
      <ShowMore onClick={()=>{setShowMore(!showMore)}}>
        <p>نمایش بیشتر </p>
      </ShowMore>
    </Container>
  );
}

const Container = styled.div`
  background-color: #dff5f0;
  padding: 18px 12px 9px 8px;
  border-radius: 0 0 4px 4px;
  @media (min-width: 480px) {
    padding: 40px 50px;
    border-radius: 0px 8px 8px 0px;
    margin-bottom: 50px;
  }
`;

const ShowMore = styled.div`
  border: 1px solid #9f9f9f;
  border-radius: 4px;
  display: flex;
  padding: 8px;
  margin-top: 32px;
  cursor: pointer;
  p {
    margin: auto;
    color: #9f9f9f;
    font-size: 4.65vw;
    position: relative;
    font-weight: 300;
    &:after {
      content: "";
      display: flex;
      position: absolute;
      left: -5.814vw;
      bottom: 1.86vw;
      background-image: url(${upArrow});
      background-size: cover;
      background-repeat: no-repeat;
      width: 2.093vw;
      height: 1.163vw;
    }
  }
  @media (min-width: 480px) {
    display: none;
  }
`;

const Title = styled.h2`
  display: none;
  @media (min-width: 480px) {
    display: block;
    padding-right: 70px;
    font-size: 1.875vw;
    font-weight: 300;
    color: #095644;
    position: relative;
    margin-bottom: 30px;
    &:before {
      content: "";
      display: flex;
      position: absolute;
      background-image: url(${ok});
      background-size: cover;
      background-repeat: no-repeat;
      width: 2.604vw;
      height: 2.604vw;
      right: 0;
    }
  }
`;

const Gallery = styled.div`
  @media (min-width: 481px) {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    & > div {
      width: 45%;
    }
  }
  @media (min-width: 769px) {
    gap: 15px;
  }
`;
