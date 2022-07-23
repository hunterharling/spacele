import "./AstroFrame.css";
import astrodb from "../../astrodb"
import { useEffect, useState } from "react";
import Search from "../Search/Search";

// Create offset for fixed date
const offsetFromDate = new Date(2022, 0, 1);
const today = new Date();

const msOffset = today.getTime() - offsetFromDate.getTime();
const dayOffset = msOffset / 1000 / 60 / 60 / 24;

// Get new index from 0-221 each day
const objIndex = Math.floor(dayOffset % 222);

// Renders a sky-map iframe of dso object
const AstroFrame = () => {
  const [obj, setObj] = useState(astrodb[objIndex]);

  useEffect(() => {
    console.log(obj);
    // Necessary to initiate aladin sky chart
    eval(`var aladin = A.aladin('#aladin-lite-div', { survey: "P/DSS2/color", fov: 1, target: "${obj}" });`);
  }, []);

  return (
    <>
      <div className="wrapper">
        <div className="screen"></div>
        <div id="aladin-lite-div" ></div>
      </div>
      <Search obj={obj} />
    </>
  );
}

export default AstroFrame;