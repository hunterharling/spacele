import "./AstroFrame.css";
import astrodb from "../../astrodb"
import { useEffect } from "react";
import Search from "../Guesses/Guesses";
import { Stat } from "../../App";

interface AstroFrameTypes {
  statistics: Stat;
  URL: string;
}

// Create offset for fixed date
const offsetFromDate = new Date(2022, 0, 3);
const today = new Date();

const msOffset = today.getTime() - offsetFromDate.getTime();
const dayOffset = msOffset / 1000 / 60 / 60 / 24;

// Get new index from 0-221 each day
const objIndex = Math.floor(dayOffset % 222);
const obj = astrodb[objIndex];

// Renders a sky-map iframe of dso object
const AstroFrame = ({ statistics, URL }: AstroFrameTypes) => {
  useEffect(() => {
    // Necessary to initiate aladin sky chart
    eval(`var aladin = A.aladin('#aladin-lite-div', { survey: "P/DSS2/color", fov: 1, target: "${obj}" });`);
  }, []);

  return (
    <>
      <div className="wrapper">
        <div className="screen"></div>
        <div id="aladin-lite-div" ></div>
      </div>
      <Search obj={obj} statistics={statistics} day={objIndex} URL={URL} />
    </>
  );
}

export default AstroFrame;