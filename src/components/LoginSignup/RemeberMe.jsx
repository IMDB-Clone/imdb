// RememberMe.jsx
import React, { useState, useEffect } from 'react';

const RememberMe = ({ email, setEmail }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('username');
    const savedCheckbox = localStorage.getItem('checkbox');
    if (savedCheckbox === 'checked') {
      setIsChecked(true);
      setEmail(savedEmail);
    }
  }, [setEmail]);

  useEffect(() => {
    if (isChecked && email !== "") {
      localStorage.setItem('username', email);
      localStorage.setItem('checkbox', 'checked');
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('checkbox');
    }
  }, [isChecked, email]);

  return (
    <label className="remember-me">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => {
          setIsChecked(e.target.checked);
          if (!e.target.checked) {
            setEmail('');
          }
        }}
      /> Remember me
    </label>
  );
};

export default RememberMe;
