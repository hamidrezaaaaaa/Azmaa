import React from "react";
import styled from "styled-components";
import eye from "../../../assets/eye.png";
import BestEnvoy from "../../home/components/bestEnvoy";

const Container = styled.div`
  background-color: #f3f3f3;
  border: 1px solid #cbcbcb;
  border-radius: 0px 8px 8px 0px;
  padding: 2.292vw;
  padding-left:9.792vw;
  max-height:43.125vw;
  overflow:hidden;
  display: flex;
  flex-direction: column;
`;

const Title =styled.h1`
  color:#707070;
  font-weight:300;
  font-size:1.875vw;
  position:relative;
  padding-right:100px;
  margin-bottom:50px;
  margin-top:0;
  &:before{
    content:"";
    display:block;
    width:47px;
    height:32px;
    right:36px;
    bottom: 1px;
    position: absolute;
    background-image: url(${eye});
    background-size: cover;
    background-repeat: no-repeat;
  }
`

const Gallery =styled.div`
  display:flex;
  flex-direction:column;
  gap:15px;
  padding-right:60px;
  overflow:auto;
  direction: ltr;
`

export default function HonestEnvoy() {
  return <Container>
    <Title>
    شفاف‌ترین نمایندگان
    </Title>
    <Gallery>
      <BestEnvoy/>
      <BestEnvoy/>
      <BestEnvoy/>
      <BestEnvoy/>
      <BestEnvoy/>
    </Gallery>
  </Container>;
}