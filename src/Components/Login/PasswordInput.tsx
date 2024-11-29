import React, { useState } from 'react';
import eyeIcon from '../../Assets/eye-icon.svg';
import eyeIconOpen from '../../Assets/eye-icon-open.svg';
import './LoginPage.css';

interface PasswordInputProps {
  placeholder: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  placeholder,
  value,
  name,
  onChange,
  required = false,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="password-input">
      <input
        type={passwordVisible ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        required={required}
      />
      <img
        src={passwordVisible ? eyeIconOpen : eyeIcon}
        alt="Toggle password visibility"
        className="eye-icon"
        onClick={() => setPasswordVisible(!passwordVisible)}
      />
    </div>
  );
};

export default PasswordInput;
