import React, { useState } from "react";
import styled from "styled-components";
import profile from "../../../assets/g-profile.png";
import location from "../../../assets/g-location.png";
import BestEnvoy from "./bestEnvoy";
import upArrow from "../../../assets/arrow.png";

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const Selector = styled.div`
  display: flex;
  gap: 100px;
`;

const Title = styled.div`
  color: #095644;
  font-size: 1.875vw;
  font-weight: 300;
  position: relative;
  padding-right: 60px;
  padding-bottom: 20px;
  &.active {
    font-weight: 500;
    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 5px;
      background-color: #095644;
      right: 0;
      bottom: -5px;
    }
  }
  &:before {
    content: "";
    display: block;
    position: absolute;
    width: 53px;
    height: 53px;
    background-image: url(${(props) => props.icon});
    background-size: contain;
    background-repeat: no-repeat;
    right: 0;
  }
`;

const Content = styled.div`
  background-color: #f3f3f3;
  margin-inline: -13%;
  padding: 6% 12% 4%;
`;

const EnvoyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const ShowMore = styled.div`
border: 2px solid #9f9f9f;
border-radius: 8px;
max-width: 500px;
display:flex;
justify-content: center;
align-items: center;
margin: auto;
padding: 13px;
margin-top:43px;
p {
  font-size: 1.25vw;
  font-weight: 400;
  color: #9f9f9f;
  position: relative;
  margin:0;
  &:after {
    content: "";
    display: flex;
    position: absolute;
    background-image: url(${upArrow});
    background-size: cover;
    background-repeat: no-repeat;
    width: 15px;
    height: 8px;
    left: -37px;
    bottom: 8px;
  }
}
}
`;

export default function ControlCore() {
  const [select, setSelect] = useState("");
  return (
    <Container>
      <Selector>
        <Title
          icon={profile}
          className={select === "transparent" ? "active" : ""}
          onClick={() => {
            setSelect("transparent");
          }}
        >
          شفاف‌ترین نمایندگان
        </Title>
        <Title
          icon={location}
          className={select === "area" ? "active" : ""}
          onClick={() => {
            setSelect("area");
          }}
        >
          حوزه‌های انتخابیه
        </Title>
      </Selector>
      <Content>
        {select === "transparent" && (
          <>
            <EnvoyContainer>
              <BestEnvoy />
              <BestEnvoy />
              <BestEnvoy />
              <BestEnvoy />
              <BestEnvoy />
              <BestEnvoy />
            </EnvoyContainer>
            <ShowMore>
              <p>نمایش بیشتر</p>{" "}
            </ShowMore>
          </>
        )}
        {select === "area" && <h1>area</h1>}
      </Content>
    </Container>
  );
}