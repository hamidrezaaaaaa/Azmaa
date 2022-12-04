import React, { useEffect, useState } from "react";
import styled from "styled-components";
import action from "../../../assets/action-rate.webp";
import act from "../../../assets/act.webp";
import success from "../../../assets/like.webp";
import faild from "../../../assets/dislike.webp";
import not from "../../../assets/not.webp";
import data from "../../../data.json";
import left from ".././../../assets/left.webp";
import { useNavigate } from "react-router-dom";
import ShareButton from "../../general/shareButton.js"

const VCContainer = styled.div`
  background-color: #ffffff;
  border-radius: 4px;
  padding: 18px 10px 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  margin-bottom: 14px;
  @media (min-width: 480px) {
    box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    margin-bottom: 34px;
    max-width: 31%;
    padding: 20px 17px;
    height: 43.229vw;
    min-height: 0;
    width: 26.042vw;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  & > .action-logo {
    background-image: url(${action});
    background-size: cover;
    background-repeat: no-repeat;
    width: 20.698vw;
    height: 17.674vw;
    @media (min-width: 480px) {
      width: 6.302vw;
      height: 5.417vw;
    }
  }

  & > .title-card {
    width: 70%;
    .title {
      margin: 0;
      color: #707070;
      font-size: 3.72vw;
      font-weight: 200;
      position: relative;
      padding-right: 20px;
      margin-bottom: 3px;
      &:before {
        content: "";
        display: flex;
        position: absolute;
        width: 7.442vw;
        height: 7.442vw;
        background-image: url(${act});
        background-size: contain;
        background-repeat: no-repeat;
        right: -1.395vw;
        top: 0.233vw;
      }
    }
    h2 {
      margin: 0;
      color: #707070;
      font-size: 4.65vw;
      font-weight: 400;
      margin-bottom: 10px;
    }
    .date {
      margin: 0;
      color: rgba(0, 0, 0, 0.2);
      font-size: 2.79vw;
      font-weight: bold;
    }
    @media (min-width: 480px) {
      width: 67%;
      .title {
        font-size: 1.25vw;
        font-weight: 300;
        padding-right: 30px;
        &:before {
          width: 2.083vw;
          height: 1.563vw;
          top: 0.26vw;
        }
      }
      h2 {
        font-size: 1.667vw;
        font-weight: 700;
      }
      .date {
        font-size: 1.25vw;
        font-weight: 500;
      }
    }
  }
`;

const Statistics = styled.div`
  display: flex;
  gap: 70px;
  padding-right: 50px;
  padding-top: 20px;
  border-top: 1px solid #d8d8d8;
  margin-top: 17px;
  justify-content: center;
  padding-bottom: 13px;
  @media (min-width: 480px) {
    gap: 4.688vw;
  }
`;

const Success = styled.div`
  color: #6cbba9;
  font-weight: 300;
  font-size: 5.58vw;
  position: relative;
  &:before {
    content: "";
    display: block;
    position: absolute;
    width: 9.535vw;
    height: 9.535vw;
    background-image: url(${success});
    background-size: contain;
    background-repeat: no-repeat;
    right: -11.628vw;
    top: -1.395vw;
  }
  &.active {
    font-weight: bold;
    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 18.605vw;
      height: 0.93vw;
      background-color: #6cbba9;
      bottom: -3.023vw;
      right: -11.628vw;
    }
  }
  @media (min-width: 480px) {
    font-size: 1.458vw;
    font-weight: 400;
    padding-bottom: 10px;
    &:before {
      width: 2.917vw;
      height: 2.917vw;
      right: -3.385vw;
      top: -0.26vw;
    }
    &:after {
      width: 5.208vw !important;
      bottom: -0.7vh !important;
      height: 0.208vw !important;
      right: -3.031vw !important;
    }
  }
`;

const Faild = styled.div`
  color: #ffa5a5;
  font-weight: 300;
  font-size: 5.58vw;
  position: relative;
  &:before {
    content: "";
    display: block;
    position: absolute;
    width: 9.535vw;
    height: 9.535vw;
    background-image: url(${faild});
    background-size: contain;
    background-repeat: no-repeat;
    right: -11.628vw;
    top: -1.395vw;
  }
  &.active {
    font-weight: bold;
    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 18.605vw;
      height: 0.93vw;
      background-color: #ffa5a5;
      bottom: -3.023vw;
      right: -11.628vw;
    }
  }
  @media (min-width: 480px) {
    font-size: 1.458vw;
    font-weight: 400;
    padding-bottom: 10px;
    &:before {
      width: 2.917vw;
      height: 2.917vw;
      right: -3.385vw;
      top: -0.26vw;
    }
    &:after {
      width: 5.208vw !important;
      bottom: -0.7vh !important;
      height: 0.208vw !important;
      right: -3.031vw !important;
    }
  }
`;

const Not = styled.div`
  color: #d8d8d8;
  font-weight: 300;
  font-size: 5.58vw;
  position: relative;

  &:before {
    content: "";
    display: block;
    position: absolute;
    width: 9.535vw;
    height: 9.535vw;
    background-image: url(${not});
    background-size: contain;
    background-repeat: no-repeat;
    bottom: -3.023vw;
    right: -11.628vw;
  }

  &.active {
    font-weight: bold;
    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 18.605vw;
      height: 0.93vw;
      background-color: #d8d8d8;
      bottom: -3.023vw;
      right: -11.628vw;
    }
  }
  @media (min-width: 480px) {
    font-size: 1.458vw;
    font-weight: 400;
    padding-bottom: 10px;
    &:before {
      width: 2.917vw;
      height: 2.917vw;
      right: -3.385vw;
      top: -0.26vw;
    }
    &:after {
      width: 5.208vw !important;
      bottom: -0.7vh !important;
      height: 0.208vw !important;
      right: -3.031vw !important;
    }
  }
`;

const EnvoyGallery = styled.div`
  background-color: ${(props) => props.color};
  border-radius: 4px;
  padding: 18px 0 12px;
  display: flex;
  overflow-x: scroll;
  @media (min-width: 480px) {
    border-radius: 8px;
    flex-direction: column;
    padding-inline: 15px;

    margin-bottom: 10px;
    flex: 1;
    overflow-y: auto;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px;
  min-width: 20.930vw;
  border-left: 1px solid white;
  .picture {
    width: 10.930vw;
    height: 10.930vw;
    border-radius: 10.930vw;
    margin-bottom: 10px;
    border: 3px solid ${(props) => props.color};
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .name {
    color: #707070;
    font-size: 2.79vw;
    font-weight: 400;
    margin: 0;
    margin-bottom: 5px;
  }

  .state {
    color: #707070;
    font-size: 2.32vw;
    font-weight: bold;
    margin: 0;
  }
  @media (min-width: 480px) {
    flex-wrap: wrap;
    max-height: 7.500vw;
    padding: 19px 30px 10px;
    border-left: none;
    border-bottom: 1px solid #ffffff;
    .picture {
      width: 5vw;
      height: 5vw;
      border-radius: 5vw;
      border-width: 0.469vw;
    }
    .name {
      font-size: 1.458vw;
      text-align: start;
      width: 60%;
      margin-bottom: 10px;
      margin-top: -4%;
    }
    .state {
      font-size: 1.042vw;
      font-weight: 300;
      text-align: start;
      width: 60%;
    }
  }
`;

const ButtonWraper = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
  @media (min-width: 480px) {
    border-top: 1px solid #d8d8d8;
    padding-top: 14px;
    flex-direction: row-reverse;
  }
`;

const LargButton = styled.div`
  width: 70%;
  background-color: #095644;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  display: flex;
  padding: 5px;
  .content {
    margin: 0 auto;
    font-size: 4.65vw;
    font-weight: bold;
    color: #ffffff;
  }
  @media (min-width: 480px) {
    border-radius: 8px;
    padding: 10px;
    position: relative;
    .content {
      font-size: 1.25vw;
      margin: auto;
      &:after {
        content: "";
        display: block;
        position: absolute;
        width: 0.521vw;
        height: 0.781vw;
        background-image: url(${left});
        background-size: contain;
        background-repeat: no-repeat;
        top: 1.042vw;
        left: 1.719vw;
      }
    }
  }
`;

const SmallButton = styled.div`
  width: 20%;
  background-color: #ffffff;
  border: 1px solid #095644;
  border-radius: 4px;
  display: flex;
  padding: 5px;
  .content {
    margin: 0 auto;
    font-size: 4.65vw;
    font-weight: 300;
    color: #095644;
  }
  @media (min-width: 480px) {
    border-radius: 8px;
    padding: 10px;
    .content {
      font-size: 1.25vw;
      margin: auto;
    }
  }
`;

export default function ActionCard() {
  const [active, setActive] = useState(0);
  const [color, SetColor] = useState("#DFF5F0");
  const [bColor, setBColor] = useState("#6cbba9");
  const envoyData = data.envoy;
  const navigate = useNavigate();

  const envoyList = envoyData.map((x, i) => {
    return (
      <Card key={i} color={bColor}>
        <div className="picture">
          <img src={x.picture} alt={x.name} />
        </div>

        <p className="name">{x.name}</p>
        <p className="state">{x.state}</p>
      </Card>
    );
  });

  useEffect(() => {
    if (active === 1) {
      SetColor("#FFD5D5");
      setBColor("#ffa5a5");
    } else if (active === 2) {
      SetColor("#EAEAEA");
      setBColor("#d8d8d8");
    } else if (active === 0) {
      SetColor("#DFF5F0");
      setBColor("#6cbba9");
    }
  }, [active]);

  return (
    <VCContainer>
      <CardHeader>
        <div className="action-logo"></div>
        <div className="title-card">
          <p className="title">عملکرد</p>
          <h2> دریافت خودرو دناپلاس </h2>
          <p className="date">۲۹ اسفند ۱۴۰۰ </p>
        </div>
      </CardHeader>
      <Statistics>
        <Success
          onClick={() => setActive(0)}
          className={active === 0 ? "active" : ""}
        >
          ۱۲۴
        </Success>
        <Faild
          onClick={() => setActive(1)}
          className={active === 1 ? "active" : ""}
        >
          ۶۵
        </Faild>
        <Not
          onClick={() => setActive(2)}
          className={active === 2 ? "active" : ""}
        >
          ۲۳
        </Not>
      </Statistics>

      <EnvoyGallery color={color}>{envoyList}</EnvoyGallery>

      <ButtonWraper>
        <LargButton>
          <p
            className="content"
            onClick={() => {
              navigate(`presentation/ دریافت خودرو دناپلاس `);
            }}
          >
            جزئیات
          </p>
        </LargButton>
        {/* <SmallButton>
          <p className="content">بازنشر</p>
        </SmallButton> */}
        <ShareButton text="دریافت خودرو دناپلاس " title="اطلاع رسانی نماینده"/>
      </ButtonWraper>
    </VCContainer>
  );
}
