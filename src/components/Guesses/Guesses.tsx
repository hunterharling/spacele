import astrodb from "../../astrodb";
import Fuse from "fuse.js"
import { useEffect, useRef, useState } from "react";
import "./Guesses.css";
import axios from "axios";
import { Stat } from "../../App";

interface SearchProps {
  obj: string;
  statistics: Stat;
  day: number;
  URL: string;
}

// Searches DSOs for input
const Search = ({ obj, statistics, day, URL }: SearchProps) => {
  const [results, setResults] = useState<string[]>([]);
  const [selections, setSelections] = useState<string[]>([]);

  const [isCorrect, setIsCorrect] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const [tries, setTries] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Reset value each day
    console.log("day: " + day);
    if (statistics.day !== 0 && day !== statistics.day) {
      resetDailyStats();
      localStorage.setItem("completed", "false");
    }
    else {
      if (localStorage.getItem("completed") === obj) {
        setIsCorrect(true);
      }
    }
  }, [statistics.day]);

  const updateStats = (correctGuess: number) => {
    axios.put(URL + "/api/stats/update/" + statistics._id, {
      'attemptsToday': tries + 1,
      'totalAttempts': tries + 1,
      'guessesToday': correctGuess,
      'triesToday': 1,
      'totalTries': 1,
    });
  }

  const resetDailyStats = () => {
    axios.put(URL + "/api/stats/reset", {
      'attemptsToday': 0,
      'guessesToday': 0,
      'triesToday': 0,
      'day': day
    });
  }

  const showOptions = (choice: string) => {
    setOpen(true);

    const fuse = new Fuse(astrodb);
    const searchResults = fuse.search(choice);

    let newRes: Array<string> = [];
    searchResults.map(r => {
      newRes.push(r.item);
    });

    setResults(newRes);
  }

  const checkSelection = (choice: string) => {
    setOpen(false);

    if (tries === 5) {
      setTries(6);
      updateStats(0);
      localStorage.setItem("completed", "no");
    }
    else if (choice === obj) {
      setIsCorrect(true);
      updateStats(1);
      localStorage.setItem("completed", obj);
    }
    else {
      setTries(tries + 1);
    }
    setSelections([...selections, choice]);
    inputRef.current!.value = "";
  }

  return (
    <div className="search">
      <div className="selections">
        {selections.map(s =>
          <div className={"selection" + (s === obj ? " correct" : "")} key={s}>
            {s}
          </div>)}
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Pick a deep sky object..."
        onKeyUp={(e) => showOptions(e.target.value)} />
      {(isOpen && !isCorrect && tries < 6 && results.length > 0) &&
        <div className="results">
          {results.map(r =>
            <div
              key={r}
              className="result"
              onClick={() => checkSelection(r)}>
              {r}
            </div>)}
        </div>}
      {(tries > 5) && <h3>This deep sky object is {obj}.</h3>}
      {(tries > 0 && tries < 6 && !isCorrect) && <h3>{6 - tries} tries left</h3>}
      {isCorrect && <h3 className="correct">Correct! This deep sky object is {obj}.</h3>}
    </div>
  );
}

export default Search;