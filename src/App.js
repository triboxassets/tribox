import './App.css';
import { AuthProvider } from './Contexts 🔑/AuthContext.js'; // Import AuthProvider
import Home from './Components/Home/Home.tsx'; // Import your Home component
import LoginPage from './Components/Login/LoginPage.tsx'; // Import the LoginPage component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForgotPasswordForm from './Components/Login/ForgotPasswordForm.tsx';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes> {/* Use Routes instead of Switch */}
            {/* Define routes for your pages */}
            <Route path="/login" element={<LoginPage />} /> {/* Login Page Route */}
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            <Route path="/" element={<Home />} /> {/* Home Page Route */}
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
