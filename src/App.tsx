import './styles/App.css';
import AstroFrame from './components/AstroFrame';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <h3>Guess which deep sky object this is!</h3>
      <div className="container">
        <AstroFrame />
      </div>
      <Footer />
    </div>
  );
}

export default App;