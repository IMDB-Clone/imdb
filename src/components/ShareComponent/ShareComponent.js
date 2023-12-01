// ShareComponent.js
import React, { useState } from 'react';
import './ShareComponent.css'; // Make sure to import your stylesheet

// Icons
import shareIcon from '../../assets/share-icon.png';
import facebookIcon from '../../assets/facebook-icon.png';
import twitterIcon from '../../assets/twitter-icon.png';
import linkIcon from '../../assets/copy-icon.png';

const ShareComponent = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const currentUrl = window.location.href;

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      alert('Link copied to clipboard!');
      setDropdownOpen(false); // Close the dropdown after copying
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="share-component">
      <div className="dropdown">
        <img
          src={shareIcon}
          alt="Share"
          className="share-icon"
          onClick={toggleDropdown}
        />

        {dropdownOpen && (
          <div className="dropdown-menu show">
            <a
              className="dropdown-item"
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebookIcon} alt="Facebook" className="icon" />
              Facebook
            </a>
            <a
              className="dropdown-item"
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitterIcon} alt="Twitter" className="icon" />
              Twitter
            </a>
            <button className="dropdown-item" onClick={handleCopyUrl}>
              <img src={linkIcon} alt="Copy link" className="icon" />
              Copy Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareComponent;
