import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Controler from "../components/vote/components/controler";
import Filtering from "../components/vote/components/filtering";
import Calendar from "../components/actions/components/calendar";
import { BaseBackURL } from "../constant/api";
import ActionCard from "../components/home/components/actionCard";
import { useNavigate } from "react-router-dom";
import upArrow from "../assets/arrow.webp";
import { useSelector } from "react-redux";
import { useIsVisible } from "../hook/useIsVisible";
import { useTrail, animated } from "react-spring";

export default function Actions() {
  const { activityListToShow } = useSelector((state) => state.activity);

  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [selectedTag, setSelectedTag] = useState("همه");
  const [showLimit, setShowLimit] = useState(3);
  const [finalActivityList, setFinalActivityList] = useState([]);

  const showRef = useRef(null);
  const ActionContainerRef = useRef(null);

  const isVisible = useIsVisible(ActionContainerRef);

  const [isseen , setIsseen] = useState(false);
    useEffect( 
    () => {
      if(isVisible) {
        setIsseen(true);
      }
    }
    , [isVisible])

  const trails = useTrail(8, {
    from: { opacity: 0 },
    to: { opacity: isseen ? 1 : 0 },
    config: { duration: 300 },
    delay: 100,
  });

  useEffect(() => {
    if (selectedTag === "همه") {
      setFinalActivityList([...activityListToShow]);
    } else {
      const newList = [];
      for (const item of activityListToShow) {
        for (const tag of item.tag) {
          if (tag.name === selectedTag) {
            newList.push(item);
          }
        }
      }
      console.log(newList);
      setFinalActivityList([...newList]);
    }
  }, [selectedTag]);

  return (
    <Container ref={ActionContainerRef}>
      <DivTitle>
        <p
          className="home"
          onClick={() => {
            navigate("/");
          }}
        >
          خانه /{" "}
        </p>
        <p className="component"> عملکردها </p>
      </DivTitle>

      <Content>
        <Controler selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
        <Filtering
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
        <>
          <LastActions>
              <animated.div style={trails[3]}>
              <Title> عملکردها</Title>
              <ActionContainer ref={showRef}>
              {finalActivityList
                .sort((a, b) => {
                  if (selectedFilter === 1) {
                    return new Date(b.date) - new Date(a.date);
                  } else if (selectedFilter === 2) {
                    return new Date(a.date) - new Date(b.date);
                  } else if (selectedFilter === 3) {
                    return b.transparency - a.transparency;
                  } else {
                    return 0;
                  }
                })
                .slice(0, showLimit)
                .map((item, i) => {
                  return <ActionCard activity={item} key={i} />;
                })}
            </ActionContainer>
            </animated.div>

            <ShowMore
              arrow={showLimit >= finalActivityList.length}
              onClick={() => {
                if (showLimit < finalActivityList.length) {
                  setShowLimit(showLimit + 10);
                } else {
                  setShowLimit(3);
                  showRef.current.scrollIntoView();
                }
              }}
              style={{ marginTop: "20px" }}
            >
              <p>
                {showLimit >= finalActivityList.length
                  ? "نمایش کمتر"
                  : "نمایش بیشتر "}
              </p>{" "}
            </ShowMore>
          </LastActions>
        </>

        {/* <Calendar activities={filteredActivities} /> */}
      </Content>
    </Container>
  );
}

const Container = styled.section`
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  padding: 21vw 20px;
  overflow: hidden;
  @media (min-width: 480px) {
    background-color: #ffffff;
    padding: 7vw 0 6vw;
  }
`;
const Title = styled.h1`
  color: #9f9f9f;
  font-size: 4.65vw;
  font-weight: 300;
  overflow: hidden;
  text-align: center;
  margin-bottom: 10px;
  &:after {
    background-color: #9f9f9f;
    content: "";
    display: inline-block;
    height: 1px;
    position: relative;
    // vertical-align: middle;
    width: 78%;
  }
  @media (min-width: 481px) {
    margin-top: 47px;
    font-size: 1.87vw;
    margin-bottom: 24px;
    &:after {
      width: 75%;
    }
    &:before {
      content: "";
      display: inline-block;

      background-size: cover;
      background-repeat: no-repeat;
      width: 3.073vw;
      height: 3.073vw;
      margin-bottom: -1%;
    }
  }
  // @media(max-width:1400px){
  //   &:after{
  //     width:79%;
  //   }
  // }
  // @media(max-width:1000px){
  //   &:after{
  //     width:70%;
  //   }
  // }
`;
const DivTitle = styled.div`
  display: flex;
  margin-bottom: 12px;
  white-space: nowrap;
  .home {
    font-size: 3.721vw;
    font-weight: 700;
    margin: 0;
    color: rgba(0, 0, 0, 0.2);
  }
  .component {
    font-size: 3.721vw;
    font-weight: 700;
    margin: 0;
    padding-right: 5px;
    color: rgba(112, 112, 112, 1);
  }
  @media (min-width: 480px) {
    margin-bottom: 25px;
    padding-right: 10%;
    .home,
    .component {
      font-size: 1.25vw;
    }
  }
`;

const Content = styled.div`
  background-color: #ffffff;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (min-width: 480px) {
    margin-top: 25vw;
    padding-bottom: 0;
    gap: 0;
  }
`;
const ActionContainer = styled.div`
  @media (min-width: 481px) {
    display: grid;
    grid-template-columns: repeat(3, 25%);
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
  }
  @media (min-width: 769px) {
    justify-content: center;
  }
`;
const LastActions = styled.div``;
const ShowMore = styled.div`
  border: 1px solid #9f9f9f;
  border-radius: 4px;
  display: flex;
  padding: 8px;
  cursor: pointer;
  p {
    margin: auto;
    color: #9f9f9f;
    font-size: 4.65vw;
    display: flex;
    align-items: center;
    gap: 20px;
    font-weight: 300;
    &:after {
      content: "";
      display: inline-flex;
      background-image: url(${upArrow});
      transform: ${(props) => (props.arrow ? `rotate(180deg)` : "")};
      background-size: cover;
      background-repeat: no-repeat;
      width: 9px;
      height: 5px;
    }
  }

  @media (min-width: 481px) {
    border: 2px solid #9f9f9f;
    border-radius: 8px;
    width: 31%;
    justify-content: center;
    align-items: center;
    margin: auto;
    margin-bottom: 2%;
    padding: 13px;
    p {
      font-size: 1.25vw;
      font-weight: 400;
      &:after {
        width: 15px;
        height: 8px;
        left: -37px;
      }
    }
  }
`;
