import './App.css';
import { AuthProvider } from './Contexts 🔑/AuthContext.js'; // Import AuthProvider
import Home from './Components/Home/Home.tsx'; // Import your Home component
import LoginPage from './Components/Login/LoginPage.tsx'; // Import the LoginPage component
import ForgotPasswordForm from './Components/Login/ForgotPasswordForm.tsx';
import ProductListing from './Product Page/ProductListing.tsx'; // Import the ProductListing component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchResults from './Components/SearchBar 🔍/SearchResults.tsx'
import Artists from './Components/Artists 🧑🏼‍🎨/Artists.tsx';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes> 
            {/* Routes n stuff */}
            <Route path="/login" element={<LoginPage />} /> 
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            <Route path="/product-listing/:productId" element={<ProductListing />} /> 
            <Route path="/" element={<Home />} />
            <Route path="/searchresults" element={<SearchResults />} />
            <Route path="/artists" element={<Artists />} /> 
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
