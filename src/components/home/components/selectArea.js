import React, { useState } from "react";
import styled from "styled-components";
import useWidth from "../../../hook/useWidth";
import arrow from "../../../assets/arrow.webp";
import EnvoyCard from "../../general/envoyCard";
import box from "../../../assets/state.svg"

export default function SelectArea(props) {
  const [open, setOpen] = useState(false);
  const width = useWidth();
  const envoys = props.envoys;

  const envoyGallery = envoys.map((x, i) => {
    return (
      <EnvoyCard
        name={x.name}
        key={i}
        state={x.state}
        img={x.img}
        commission={x.commission}
        persantage={x.persantage}
        id={i}
      />
    );
  });

  const handdleClick = () => {
    if (width < 480) {
      setOpen(!open);
    }
  };

  return (
    <Wraper>
      <Container onClick={handdleClick} className={open ? "active" : ""}>
        <h2>{props.area}</h2>
      </Container>
      {open && 
      <Details>
        {envoyGallery}
        </Details>}
    </Wraper>
  );
}

const Wraper = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 30px -5px rgba(0, 0, 0, 0.25);
  background-color: #ffffff;
  border-radius: 4px;
  margin-top:2.326vw;
  @media (min-width: 480px) {
    border-radius: 8px;
    width: 49%;
    height: fit-content;
    box-shadow: 0px 0px 30px -5px rgba(0, 0, 0, 0.15);
  }
`;

const Container = styled.div`
  padding: 4.651vw 6.512vw ;
  position: relative;
  &:after {
    content: "";
    diplay: block;
    position: absolute;
    background-image: url(${arrow});
    background-size: contain;
    background-repeat: no-repeat;
    width: 3.488vw;
    height: 2.326vw;
    left: 5.581vw;
    top: 50%;
  }
  &.active {
    &:after {
      animation-name: rotating;
      animation-duration: 2s;
      animation-fill-mode: forwards;
    }
  }

  h2 {
    margin: 0;
    display: flex;
    align-items: center;
    color: #707070;
    font-weight: 400;
    font-size: 4.651vw;
    gap:3.953vw;
    &:before {
      content: "";
      display: flex;
      width: 16.279vw;
      height: 18.372vw;
      background-image: url(${box});
      background-size: contain;
      background-repeat: no-repeat;
    }
  }

  @keyframes rotating {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(180deg);
    }
  }
  @media (min-width: 480px) {
    padding: 0;
    &:after {
      display: none;
    }
  }
`;

const Details = styled.div`
  background-color: #ffffff;
  
  border-top: 1px solid #f5f5f5;
  &>*{
    box-shadow:none;
  }
`;
