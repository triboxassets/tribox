import React, { useState } from 'react';
import googleIcon from '../../Assets/google-icon.svg';
import metaIcon from '../../Assets/meta-icon.svg';
import appleIcon from '../../Assets/apple-icon.svg';
import './LoginPage.css';

const CreateAccountForm: React.FC = () => {
  const [step, setStep] = useState(1); // Tracks the current step of the form
  const [email, setEmail] = useState(''); // Stores the email entered by the user
  const [formData, setFormData] = useState({
    fullName: '',
    password: '',
    confirmPassword: '',
    occupation: '',
    referralSource: '',
    agreeToTerms: false,
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && email.trim()) {
      setStep(2); // Move to step 2 if email is valid
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.agreeToTerms) {
      console.log('User Registered:', { email, ...formData });
      // Handle registration logic here (e.g., API call)
    } else {
      alert('You must agree to the terms and conditions to register.');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <>
      <h1>Welcome to Tribox.</h1>
      {step === 1 ? (
        <>
          <p>Just need a little bit of your information and I’ll give you your very own account!</p>
          <form className="login-form" onSubmit={handleNext}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="sign-in-button">
              Next
            </button>
          </form>
          <div className="social-login">
            <button className="social-button google">
              <img src={googleIcon} alt="Google" />
              Sign in with Google
            </button>
            <button className="social-button meta">
              <img src={metaIcon} alt="Meta" />
              Sign in with Meta
            </button>
            <button className="social-button apple">
              <img src={appleIcon} alt="Apple" />
              Sign in with Apple
            </button>
          </div>
        </>
      ) : (
        <>
          <p>Complete your account setup.</p>
          <form className="login-form" onSubmit={handleRegister}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Create New Password</label>
              <input
                type="password"
                placeholder="Create a password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>What do you do?</label>
              <select
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select your occupation
                </option>
                <option value="Student">Student</option>
                <option value="Professional">Professional</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>How did you hear about us?</label>
              <select
                name="referralSource"
                value={formData.referralSource}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="Social Media">Social Media</option>
                <option value="Friend">Friend</option>
                <option value="Advertisement">Advertisement</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                />
                uhhh, yeah I agree with the terms and conditions and the privacy policy.
              </label>
            </div>
            <button type="submit" className="sign-in-button">
              Register
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default CreateAccountForm;
