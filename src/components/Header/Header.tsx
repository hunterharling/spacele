import "./Header.css";
import { useState } from "react";
import { Stat } from "../../App";

const Header = ({ statistics }: { statistics: Stat }) => {
  const [info, showInfo] = useState(false);
  const [stats, showStats] = useState(false);

  return (
    <div className="header">
      <h1>SPACE<span>LE</span></h1>
      <div className="btns">
        <button className="info" onClick={() => showInfo(!info)}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clipRule="evenodd"></path><path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"></path></svg>
        </button>
        <button className="stats" onClick={() => showStats(!stats)}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0 13h16v2h-16zM2 9h2v3h-2zM5 5h2v7h-2zM8 8h2v4h-2zM11 2h2v10h-2z"></path></svg>
        </button>
      </div>
      {info &&
        <div className="information">
          <div className="h3">
            HOW TO PLAY
            <div className="x" onClick={() => showInfo(!info)}>
              &times;
            </div>
          </div>
          <div className="content">
            <p>
              This is an app like {" "}
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.nytimes.com/games/wordle/index.html">
                Wordle
              </a>,
              but for identifying galaxies and nebulae in the night sky.
              <br /><br />
              To play, enter your guess in the text box,
              and choose from the dropdown that appears.
              You have six guesses before the deep sky object is revealed.
            </p>
            <div className="divider">A new deep sky object is selected each day.</div>
            <div className="divider">
              This app was made by {" "}
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://github.com/hunterharling">
                @hunterharling
              </a>
              <br /><br />
              GitHub repository: {" "}
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://github.com/hunterharling/astro-guesser">
                Astro Guesser
              </a>
            </div>
          </div>
        </div>}
      {stats &&
        <div className="statistics">
          <div className="h3">
            STATISTICS
            <div className="x" onClick={() => showStats(!stats)}>&times;</div>
          </div>
          <div className="wrap">
            <div className="stat">
              <span>
                {statistics.triesToday === 0 ? 0 :
                  (statistics.guessesToday*100 / statistics.triesToday).toFixed(1)}%
              </span>
              <p>Correct Today</p>
            </div>
            <div className="stat">
              <span>
                {statistics.triesToday === 0 ? 0 :
                  (statistics.attemptsToday / statistics.triesToday).toFixed(1)}
              </span>
              <p>Avg. Guesses Today</p>
            </div>
            <div className="stat">
              <span>{statistics.attemptsToday}</span>
              <p>Guesses Today</p>
            </div>
            <div className="stat">
              <span>{statistics.triesToday}</span>
              <p>Tries Today</p>
            </div>
            <div className="stat">
              <span>{statistics.totalAttempts}</span>
              <p>Total Guesses</p>
            </div>
            <div className="stat">
              <span>{statistics.totalTries}</span>
              <p>Total Tries</p>
            </div>
          </div>
        </div>}
    </div>
  );
}

export default Header;