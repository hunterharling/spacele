import astrodb from "../astrodb";
import Fuse from "fuse.js"
import { useState } from "react";
import "./Search.css";

interface SearchProps {
  obj: string;
}

// Searches DSOs for input
const Search = ({ obj }: SearchProps) => {
  const [results, setResults] = useState<string[]>([]);
  const [selections, setSelections] = useState<string[]>([]);

  const [isCorrect, setIsCorrect] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const [tries, setTries] = useState(0);

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
      // export tries
    }
    else if (choice === obj) {
      setIsCorrect(true);
      // TODO: export tries to db for stats
    }
    else {
      setTries(tries + 1);
    }
    setSelections([...selections, choice]);
  }

  return (
    <div className="search">
      <div className="selections">
        {selections.map(s =>
          <div className="selection" key={s}>
            {s}
          </div>)}
      </div>
      <input
        type="text"
        placeholder="Pick a deep sky object..."
        onKeyUp={(e) => showOptions(e.target.value)} />
      {(isOpen && tries < 6) &&
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
      {isCorrect && <h3>Correct! This deep sky object is {obj}.</h3>}
    </div>
  );
}

export default Search;