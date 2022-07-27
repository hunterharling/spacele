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
}

// Searches DSOs for input
const Search = ({ obj, statistics, day }: SearchProps) => {
  const [results, setResults] = useState<string[]>([]);
  const [selections, setSelections] = useState<string[]>([]);

  const [isCorrect, setIsCorrect] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const [tries, setTries] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Reset value each day
    if (statistics.day !== 0 && day !== statistics.day) {
      resetDailyStats();
      console.log("prev day:"+statistics.day+" new day"+day)
      localStorage.setItem("completed", "false");
    }
    else {
      if(localStorage.getItem("completed") === obj){
        setIsCorrect(true);
      }
    }
  }, []);

  const updateStats = (correctGuess: number) => {
    axios.put(window.location.origin+"/api/stats/update/" + statistics._id, {
      'attemptsToday': tries + 1,
      'totalAttempts': tries + 1,
      'guessesToday': correctGuess,
      'triesToday': 1,
      'totalTries': 1,
      'day': day
    }).then(res => {
      console.log(res);
    });
  }

  const resetDailyStats = () => {
    axios.put(window.location.origin+"/api/stats/reset/" + statistics._id, {
      'attemptsToday': 0,
      'guessesToday': 0,
      'triesToday': 0,
    })
  }

  const showOptions = (choice: string) => {
    setOpen(true);

    const fuse = new Fuse(astrodb);
    const searchResults = fuse.search(choice);

    let newRes: Array<string> = [];
    searchResults.map(r => {
      newRes.push(r.item);
    })

    setResults(newRes);
  }

  const checkSelection = (choice: string) => {
    setOpen(false);

    if (tries === 5) {
      setTries(6);
      updateStats(0);
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
          <div className={"selection"+ (s === obj ? " correct" : "")} key={s}>
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
      {tries > 5 && <h3>This deep sky object is {obj}.</h3>}
      {isCorrect && <h3 className="correct">Correct! This deep sky object is {obj}.</h3>}
    </div>
  );
}

export default Search;