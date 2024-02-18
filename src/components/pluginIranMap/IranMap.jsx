import React, { useState, useEffect } from "react";
import iranProvinces from "../data/iranProvinces";
import iranBorder, { caspianD, persianGulfD } from "../data/IranMapData";
import styles from "./IranMap.module.css";
import styled from "styled-components";
import arrow from "../../assets/ggArrow.svg";
import { useSelector } from "react-redux";
import {
  filterDataByCity,
  setFilteredCities,
  setFilteredCitiesData,
} from "../../dataFunctions/publicDataFunctions";
import ClearFilterButton from "../general/clearFilterButton";

const useMouse = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isFilterActive } = useSelector((state) => state.filter);
  useEffect(() => {
    function handle(e) {
      setMousePosition({
        x: e.pageX,
        y: e.pageY,
      });
    }
    const mapEffect = document.querySelector("svg");
    mapEffect.addEventListener("mousemove", handle);
    return () => document.removeEventListener("mousemove", handle);
  }, [setMousePosition]);

  return mousePosition;
};

const IranMap = ({ position, empty, style }) => {
  const { isFilterActive, filteredCities, filteredProvince } = useSelector(
    (state) => state.filter
  );

  // const { x, y } = useMouse();
  //
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [hoveredProvince, setHoveredProvince] = useState("");
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const onSubmit = () => {
    setFilteredCitiesData(selectedProvince, selectedCities);
    filterDataByCity(selectedCities);
  };

  const { cityList } = useSelector((state) => state.city);

  useEffect(() => {
    const newList = [];
    if (selectedProvince.length > 0) {
      for (const item of cityList) {
        if (
          item.province_name === selectedProvince[selectedProvince.length - 1]
        ) {
          newList.push(item.name);
        }
        setAvailableCities([...newList]);
      }
    } else {
      setAvailableCities([]);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (!isFilterActive) {
      setSelectedProvince([]);
      setSelectedCities([]);
    } else if (selectedProvince.length === 0 && selectedCities.length === 0) {
      setSelectedCities([...filteredCities]);
      setSelectedProvince([...filteredProvince]);
    }
  }, [isFilterActive]);

  // console.log("selected province", selectedProvince);
  const handleSelectAll = () => {
    if (!selectAll) {
    const list = [...selectedCities];
    for (const city of availableCities) {
      if (!list.includes(city)) {
        list.push(city);
      }
    }
      setSelectedCities([...availableCities]);
      setSelectAll(true);
      setSelectedCities([...list]);
    } else {
      setSelectedCities([]);
      setSelectAll(false);
    }
  };



  return (
    <Container style={style}>
      {/* {(selectedProvince === null || selectedProvince.length === 0) && (
        <p className="input">استان خود را انتخاب کنید</p>
      )} */}

      <p className="select">
        ایران{" "}
        {selectedProvince.length > 0 && <span className="mapArrow">{">"}</span>}
        <span>
          {selectedProvince.length > 1 ? "چند استان" : selectedProvince[0]}
        </span>
        {selectedCities.length > 0 && <span className="mapArrow">{">"}</span>}
        <span>{selectedCities.length > 1 ? "چند شهر" : selectedCities[0]}</span>
      </p>

      <span
        className={styles.show_title}
        // style={{ left: `${x - 70}px`, top: `${y - 120}px`, zIndex: 999 }}
      >
        {hoveredProvince}
      </span>
      {showSelectModal && (
        <div>
          <div
            className={styles.backdrop}
            onClick={() => {
              selectedProvince.splice(selectedProvince.length - 1, 1);
              setShowSelectModal(false);
              setSelectAll(false);
            }}
          ></div>
          <div className={styles.cities}>
            <p>
              <span className={styles.selected_province}>
                انتخاب شهرستان در{" "}
              </span>
              <span>{selectedProvince}</span>
            </p>
            <form>
              {/* For select all */}
              <div>
                <input
                  type="checkbox"
                  name="all"
                  id="all"
                  onChange={handleSelectAll}
                />
                <label htmlFor="all" className={styles.city_label}>
                  انتخاب همه
                </label>
                <br />
              </div>

              {availableCities.map((city, i) => {
                return (
                  <div key={i}>
                    <input
                      type="checkbox"
                      key={city.name}
                      value={city}
                      name={city.name}
                      onChange={() => {
                        if (selectedCities.includes(city)) {
                          const newList = [...selectedCities];
                          newList.splice(newList.indexOf(city), 1);
                          setSelectedCities([...newList]);
                        } else {
                          setSelectedCities([...selectedCities, city]);
                        }
                      }}
                      checked={selectedCities.includes(city)}
                      // defaultChecked={values.city.includes(city)}
                    />
                    <label htmlFor={city} className={styles.city_label}>
                      {city}
                    </label>
                    <br />
                  </div>
                );
              })}

              <div className={styles.select_cities_btns}>
                <button
                  type="button"
                  onClick={() => {
                    setShowSelectModal(false);
                    setSelectedProvince([]);
                    setSelectedCities([]);
                    setSelectAll(false);
                  }}
                >
                  بازگشت و حذف فیلتر
                </button>
                <input
                  type="submit"
                  onClick={() => {
                    setShowSelectModal(false);
                    onSubmit();
                    setAvailableCities([]);
                    setSelectAll(false);
                  }}
                  value="تایید"
                />
              </div>
            </form>
          </div>
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.map}>
          {/* <button
            className={
              mapZoom
                ? styles.zoom_btn + " " + styles.zoom_out
                : styles.zoom_btn + " " + styles.zoom_in
            }
            onClick={() => {
              setMapZoom(!mapZoom);
            }}
          /> */}
          <svg
            className={styles.svg}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="20 0 970 960"
            enableBackground="new 20 0 970 960"
            xmlSpace="preserve"
          >
            <g className={styles.border}>
              <path className={styles.iran} d={iranBorder} />
            </g>
            <g className={styles.province}>
              {iranProvinces.map((province) => (
                <path
                  key={province.id}
                  id={province.id}
                  className={province.className}
                  fill={
                    selectedProvince.includes(province.name) ? "#FFAA00" : ""
                  }
                  d={province.d}
                  onMouseOver={() => setHoveredProvince(province.name)}
                  onMouseLeave={() => setHoveredProvince("")}
                  onClick={() => {
                    if (selectedProvince.includes(province.name)) {
                      const updatedSelectedProvince = [...selectedProvince]; // Create a copy
                      updatedSelectedProvince.splice(
                          updatedSelectedProvince.indexOf(province.name),
                          1
                      );
                      setSelectedProvince(updatedSelectedProvince); // Update the state
                  }
                    setSelectedProvince([...selectedProvince, province.name]);
                    setShowSelectModal(true);
                  }}
                />
              ))}
            </g>

            <g className={styles.sea}>
              <path className={styles.caspian} d={caspianD} />
              <path
                className={styles.persian_gulf}
                onMouseOver={() => setHoveredProvince("جزایر خلیج فارس")}
                onMouseLeave={() => setHoveredProvince("")}
                d={persianGulfD}
              />
            </g>
            <g className={styles.lake}>
              <path
                className={styles.jazmourian}
                d=" M 735.39 728.39 C 739.32 725.48 744.50 726.12 749.09 726.06 C 748.87 730.23 748.85 734.76 746.25 738.27 C 744.31 740.90 742.24 743.89 739.07 745.09 C 735.82 743.00 735.87 738.59 734.78 735.26 C 734.53 733.01 733.02 729.97 735.39 728.39 Z"
              />
              <path
                className={styles.qom}
                d=" M 392.53 316.41 C 396.15 319.51 400.05 322.33 403.25 325.88 C 405.56 328.37 405.60 331.94 406.17 335.09 C 399.76 335.20 393.56 333.51 387.51 331.56 C 390.12 326.86 392.05 321.79 392.53 316.41 Z"
              />
              <path
                className={styles.urmia}
                d=" M 70.94 100.38 C 76.66 94.04 88.01 97.27 90.48 105.14 C 89.12 111.83 86.35 118.54 87.47 125.50 C 88.30 127.83 90.56 129.30 92.62 130.47 C 95.27 131.90 98.30 130.53 101.12 130.96 C 104.02 131.89 105.83 134.55 107.85 136.66 C 105.87 138.36 103.19 140.92 105.12 143.69 C 109.33 148.80 115.47 152.40 118.27 158.65 C 118.78 159.50 118.71 160.29 118.05 161.03 C 115.60 163.09 112.39 164.01 109.96 166.10 C 109.61 169.05 109.90 172.04 109.99 175.00 C 107.00 174.40 103.25 174.51 101.33 171.69 C 96.74 164.74 92.82 157.11 86.45 151.56 C 83.31 148.97 83.19 144.67 81.91 141.10 C 80.21 136.23 78.11 131.51 76.67 126.55 C 75.23 125.31 73.66 124.19 72.49 122.68 C 71.82 120.64 71.96 118.40 72.41 116.33 C 73.48 112.43 78.57 111.08 79.29 107.06 C 79.94 102.30 74.03 101.97 70.94 100.38 Z"
              />
            </g>
          </svg>
        </div>
      </div>
      <ButtonContainer >
        {isFilterActive && <ClearFilterButton setSelectAll={setSelectAll}/> }
      </ButtonContainer>
    </Container>
  );
};

export default IranMap;

const Container = styled.div`
  border: 1px solid #cbcbcb;
  border-radius: 8px;
  padding: 0 0 15px 15px;
  
  .input {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    padding-top: 3.488vw;
    color: #095644;
    font-weight: 500;
    font-size: 3.721vw;
    &:after {
      content: "";
      display: inline-flex;
      background-image: url(${arrow});
      background-repeat: no-repeat;
      background-size: contain;
      width: 2.326vw;
      height: 1.163vw;
    }
  }

  .select {
    margin: 0;
    padding-top: 2.093vw;
    padding-right: 11.395vw;
    color: #095644;
    font-weight: 500;
    font-size: 5.581vw;
    display: flex;
    gap: 5px;
    align-items: center;
    span {
      font-weight: 500;
      display: flex;
      align-items: center;
    }
    @media (max-width: 768px){
      font-size: 4vw;
    }
  }


  .mapArrow {
    display: inline-flex;
    color: #fab732;
    font-size: 1.5vw;
    font-weight: 300;
    padding-left: 5px;
  }
  @media (min-width: 481px) {
    position: ${(props) => props.position};
    top: 14%;
    left: 8%;
    width: 40%;
    background-color: rgba(255, 255, 255, 0.5);
    .input {
      font-size: 1.458vw;
      padding-top: 2.24vw;
      &:after {
        width: 0.938vw;
        height: 0.521vw;
      }
    }
    .select {
      padding-top: 2.24vw;
      padding-right: 6.563vw;
      font-size: 1.458vw;
      span {
        &:before {
          font-size: 1.563vw;
        }
      }
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex ; 
  justify-content: end;
  align-items: center;
`
