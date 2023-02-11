import React, { useState, useEffect } from "react";
import styled from "styled-components";
import profile from "../../../assets/g-profile.webp";
import location from "../../../assets/g-location.webp";
import BestEnvoy from "./bestEnvoy";
import HonestEnvoy from "../../envoy/components/honestEnvoy";
import upArrow from "../../../assets/arrow.webp";
import SelectArea from "./selectArea";
import axios from "axios";
import { BaseBackURL } from "../../../constant/api";

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
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &.active,
  &:hover {
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
    display: inline-flex;
    width: 2.604vw;
    height: 2.604vw;
    background-image: url(${(props) => props.icon});
    background-size: contain;
    background-repeat: no-repeat;
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 13px;
  margin-top: 43px;
  p {
    font-size: 1.25vw;
    font-weight: 400;
    color: #9f9f9f;
    position: relative;
    margin: 0;
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
`;

const AreaContainer = styled.div`
  @media (min-width: 480px) {
    display: flex;
    flex-wrap: wrap;
    gap: 1.042vw;
  }
`;

export default function ControlCore() {
  const [select, setSelect] = useState("transparent");
  const [envoys, setEnvoys] = useState([]);
  const [areas, setAreas] = useState([]);

  const getEnvoys = () => {
    let config = {
      method: "get",
      url: `${BaseBackURL}api/v1/accounts/parliament_member/`,
    };

    axios(config).then((res) => {
      console.log(res.data);
      if (res.data.length > 0) {
        setEnvoys([...res.data]);
      }
    });
  };


  const getElectoralDistrict = () => {
    let config = {
      method: "get",
      url: `${BaseBackURL}api/v1/electoral_district/?city__id&city__province__id`,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setAreas([...response.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  useEffect(() => {
    getEnvoys();
    getElectoralDistrict();
  }, []);

  const newList = envoys.sort((a, b) => a.transparency > b.transparency);

  

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
              {newList.map((item, i) => {
                return <BestEnvoy envoy={item} key={i} />;
              })}
            </EnvoyContainer>
            <ShowMore>
              <p>نمایش بیشتر</p>{" "}
            </ShowMore>
          </>
        )}
        {select === "area" && (
          <AreaContainer>
        
            {areas.map((item,i)=>{
              return(
                <SelectArea area={item.name} envoys={item.agent} key={i} />
              )
            })}
          </AreaContainer>
        )}
      </Content>
    </Container>
  );
}
