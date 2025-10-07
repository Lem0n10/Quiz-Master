import NavBar from './component/NavBar';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Root from './routes/root';
import { QuizProvider } from './context/QuizContext';

function App() {
  return (
    <div
      className="App min-h-screen w-full bg-cover bg-center bg-fixed"
    >
      <QuizProvider>
      <Router>

        <NavBar />

        <Root />
      </Router>
    </QuizProvider>
    </div>
  );
}

export default App;