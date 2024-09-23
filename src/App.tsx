import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { MainRouter } from './routes/routes';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <>
    <AuthProvider>
      <Router>
        <Navbar/>
        <MainRouter/>
        <Toaster/>
      </Router>
    </AuthProvider>
    </>
  );
}

export default App;
