import "./AstroFrame.css";
import astrodb from "../astrodb"
import { useEffect, useState } from "react";
import Search from "./Search";

// Renders a sky-map iframe of dso object
const AstroFrame = () => {
  const objIndex = Math.floor(Math.random() * 222);
  const zoom = 7;

  const [src, setSrc] = useState("");

  const obj = astrodb[objIndex];
  const api = `https://simbad.u-strasbg.fr/simbad/sim-id?Ident=${obj.split(" ").join("+")}&NbIdent=1&Radius=2&Radius.unit=arcmin&submit=submit+id`;

  useEffect(() => {
    if (!obj.includes("NGC")) {
      const url = `https://server1.sky-map.org/skywindow?object=${obj.split(" ").join("")}&zoom=${zoom}&img_source=SDSS`;
      console.log(url)
      setSrc(url);
    }
    else {
      fetch(api)
        .then(function (response) {
          return response.text();
        }).then(function (data) {
          let coords = data.split('ID="Coord"')[1].split('"')[1];
          let ra: number;
          let dec: number;

          ra = parseInt(
            coords.split(" ")[0]
          ) + parseInt(
            coords.split(" ")[1]) / 60 + parseInt(
              coords.split(" ")[2]) / 3600;
          if (coords.includes("+")) {
            dec = parseInt(
              coords.split("+")[1].split(" ")[0]
            ) + parseInt(
              coords.split("+")[1].split(" ")[1]) / 60 + parseInt(
                coords.split("+")[1].split(" ")[2]) / 3600;
          }
          else {
            dec = parseInt(
              coords.split("-")[1].split(" ")[0]
            ) + parseInt(
              coords.split("-")[1].split(" ")[1]) / 60 + parseInt(
                coords.split("-")[1].split(" ")[2]) / 3600;;
          }

          console.log(ra + " " + dec);

          const url = `https://server1.sky-map.org/skywindow?zoom=${zoom}&img_source=SDSS&ra=${ra}&de=${dec}`;

          setSrc(url);
        });
    }
  }, []);
  return (
    <>
      <div className="wrapper">
        <div className="screen"></div>
        {src !== "" ? <iframe src={src}></iframe > : null}
        <div className="left"></div>
        <div className="right"></div>
        <div className="bottom"></div>
        <div className="top"></div>
      </div>
      <Search obj={obj} />
    </>
  );
}

export default AstroFrame;