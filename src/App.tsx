import './styles/App.css';
import AstroFrame from './components/AstroFrame/AstroFrame';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';

export interface Stat {
  attemptsToday: number;
  guessesToday: number;
  totalAttempts: number;
  __v: number;
  _id: string;
}

function App() {
  const [statistics, setStatistics] = useState<Stat>({
    attemptsToday: 0,
    guessesToday: 0,
    totalAttempts: 0,
    __v: 0,
    _id: ""
  });

  useEffect(() => {
    axios.get("http://localhost:3080/api/stats/").then(res => {
      console.log(res);
      console.log("data^^^")
      setStatistics(res.data)
    });
  }, [])

  return (
    <div className="App">
      <Header statistics={statistics} />
      <h3>Guess which deep sky object this is!</h3>
      <div className="container">
        <AstroFrame statistics={statistics} />
      </div>
      <Footer />
    </div>
  );
}

export default App;