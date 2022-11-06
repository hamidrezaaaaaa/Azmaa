import React from "react";
import styled from "styled-components";
import leftArrow from "../../../assets/leftArrow.png";
import mag from "../../../assets/blog.png"
import user from "../../../assets/profile.png";
import data from "../../../data.json";

const MagazineContainer = styled.section`
  background-color: #ffaa00;
  padding: 13px 0;
  margin-top: 15px;
  margin-right: -10px;
  margin-left: -10px;
  display: flex;
  margin-bottom:15px;
  @media (min-width: 480px) {
    padding: 36px 0 50px;
    // margin-top:70px;
    margin-top: 0;
  }
`;

const Ttitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100px;
  margin-right: 40px;
  position: relative;
  span {
    background-image: url(${mag});
    background-size: contain;
    background-repeat: no-repeat;
    width: 51px;
    height: 50px;
  }
  h1 {
    color: #095644;
    font-size: 4.65vw;
    font-weight: 300;
    text-align: center;
  }
  &:after {
    content: "";
    display: flex;
    position: absolute;
    background-image: url(${leftArrow});
    background-size: cover;
    background-repeat: no-repeat;
    width: 5px;
    height: 10px;
    left: -8px;
  }

  @media (min-width: 480px) {
    margin-right: 12%;
    max-width: 200px;
    span {
      width: 97px;
      height: 97px;
    }
    h1 {
      font-size: 1.875vw;
      white-space: nowrap;
    }
    &:after {
      width: 15px;
      height: 30px;
      left: -45px;
      bottom: 37.4%;
    }
  }
`;

const Wraper = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 10px;
  padding-right: 50px;
  @media (min-width: 480px) {
    padding-right: 90px;
    gap: 28px;
  }
`;

const Paper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 10px 14px 10px;
  background: #ffffff;
  box-shadow: 0px 0px 25px -5px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  .cover {
    width: 160px;
    height: 120px;
    border-radius: 2px;
    margin-bottom: 5px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .user {
    margin: 0;
    color: #707070;
    font-weight: 300;
    font-size: 3.72vw;
    padding-right: 20px;
    position: relative;
    margin-bottom: 10px;
    &:before {
      content: "";
      display: flex;
      position: absolute;
      background-image: url(${user});
      background-size: cover;
      background-repeat: no-repeat;
      width: 15px;
      height: 15px;
      right: 2px;
      top: 5px;
    }
  }
  .content {
    color: #707070;
    font-size: 3.72vw;
    font-weight: 400;
    margin: 0;
    margin-bottom: 10px;
  }

  .date {
    color: rgba(0, 0, 0, 0.2);
    font-size: 3.25vw;
    font-weight: bold;
    margin: 0;
  }

  @media (min-width: 480px) {
    padding: 20px 19px 25px 19px;
    box-shadow: 0px 0px 30px -5px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    .cover {
      width: 330px;
      height: 253px;
      border-radius: 4px;
      margin-bottom: 18px;
    }
    .user {
      font-size: 1.042vw;
      margin-bottom: 36px;
      padding-right: 30px;
      &:before {
        width: 20px;
        height: 20px;
      }
    }
    .content {
      font-size: 1.25vw;
      margin-bottom: 36px;
    }
    .date {
      font-size: 1.042vw;
      font-weight: 500;
    }
  }
`;

export default function Magazine() {
    const magPaper = data.magazine.map((x, i) => {
        return (
          <Paper>
            <div className="cover">
              <img src={x.img} alt={x.date} />
            </div>
    
            <p className="user">{x.name}</p>
    
            <p className="content">{x.content}</p>
    
            <p className="date">{x.date}</p>
          </Paper>
        );
      });
  return (
    <MagazineContainer>
      <Ttitle>
        <span></span>
        <h1>جدیدترین مطالب</h1>
      </Ttitle>
      <Wraper>{magPaper}</Wraper>
      
    </MagazineContainer>
  );
}