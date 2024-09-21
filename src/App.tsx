import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { MainRouter } from './routes/routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Router>
        <MainRouter/>
        <Toaster/>
      </Router>
    </>
  );
}

export default App;
