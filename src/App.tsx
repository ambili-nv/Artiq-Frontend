import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { MainRouter } from './routes/routes';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <MainRouter/>
        <Toaster/>
      </Router>
    </>
  );
}

export default App;
