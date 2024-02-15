import React, { useEffect, useState } from "react";
import styled from "styled-components";
import profile from "../../../assets/profile.webp";
import upArrow from "../../../assets/arrow.webp";
import BestEnvoy from "../../home/components/bestEnvoyCard";
import { useNavigate, useSearchParams } from "react-router-dom";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 2% 6%;
  margin-top: 70px;
`;

const Title = styled.h1`
  color: #707070;
  font-size: 1.875vw;
  font-weight: 300;
  overflow: hidden;
  text-align: center;
  margin: 0;
  &:after {
    background-color: #707070;
    content: "";
    display: inline-block;
    height: 2px;
    position: relative;
    vertical-align: middle;
    width: 79%;
  }

  &:before {
    content: "";
    display: inline-block;
    background-image: url(${profile});
    background-size: cover;
    background-repeat: no-repeat;
    width: 3.073vw;
    height: 3.073vw;
    margin-bottom: -1%;
  }
  @media (max-width: 1600px) {
    &:after {
      width: 75%;
    }
  }
`;

const EnvoyContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 29%);
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  & > :nth-of-type(1n + 7) {
    display: ${(props) => (!props.hide ? "none" : "")};
  }
`;

const ShowMore = styled.div`
  border: 2px solid #9f9f9f;
  border-radius: 8px;
  width: 31%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 13px;
  margin-top: 43px;
  cursor: pointer;
  p {
    font-size: 1.25vw;
    font-weight: 400;
    color: #9f9f9f;
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 0;
    &:after {
      content: "";
      display: inline-flex;
      background-image: url(${upArrow});
      transform: ${(props) => (props.arrow ? `rotate(180deg)` : "")};
      background-size: cover;
      background-repeat: no-repeat;
      width: 15px;
      height: 8px;
    }
  }
`;

export default function NewEnvoy({ envoys }) {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [searchparams, setsearchparams] = useSearchParams();

  useEffect(() => {}, [envoys]);

  return (
    <Container>
      <Title> جدیدترین نامزد ها</Title>
      <EnvoyContainer hide={showMore}>
        {envoys
          .filter((item) => {
            let filter = searchparams.get("filter");
            if (!filter) return true;
            // let name= item.writer + item.description ;
            let name =
              item.first_name + item.last_name + item.electoral_district_name;
            // console.log(item);
            return name.includes(filter);
          })
          .map((item, i) => (
            <BestEnvoy
              key={i}
              envoy={item}
              click={() => {
                navigate(`/envoy/${item.id}`);
              }}
            />
          ))}
      </EnvoyContainer>
      <ShowMore
        arrow={showMore}
        onClick={() => {
          setShowMore(!showMore);
        }}
      >
        <p>{showMore ? "نمایش کمتر" : "نمایش بیشتر "}</p>{" "}
      </ShowMore>
    </Container>
  );
}
