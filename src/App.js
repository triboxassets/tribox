import './App.css';
import { AuthProvider } from './Contexts 🔑/AuthContext.js'; // Import AuthProvider
import Home from './Components/Home/Home.tsx'; // Import your Home component
import LoginPage from './Components/Login/LoginPage.tsx'; // Import the LoginPage component
import ForgotPasswordForm from './Components/Login/ForgotPasswordForm.tsx';
import ProductListing from './Product Page/ProductListing.tsx'; // Import the ProductListing component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchResults from './Components/SearchBar 🔍/SearchResults.tsx'

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes> {/* Use Routes instead of Switch */}
            {/* Define routes for your pages */}
            <Route path="/login" element={<LoginPage />} /> {/* Login Page Route */}
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            <Route path="/product-listing/:productId" element={<ProductListing />} /> {/* Product Listing Route */}
            <Route path="/" element={<Home />} />
            <Route path="/searchresults" element={<SearchResults />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
