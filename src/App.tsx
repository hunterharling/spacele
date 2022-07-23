import './styles/App.css';
import AstroFrame from './components/AstroFrame/AstroFrame';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

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