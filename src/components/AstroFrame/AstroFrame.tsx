import "./AstroFrame.css";
import astrodb from "../../astrodb"
import { useEffect, useState } from "react";
import Search from "../Search/Search";

// Renders a sky-map iframe of dso object
const AstroFrame = () => {
  const objIndex = Math.floor(Math.random() * 222);

  const [obj, setObj] = useState(astrodb[objIndex]);

  useEffect(() => {
    console.log(obj);
    // Necessary to initiate aladin 
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