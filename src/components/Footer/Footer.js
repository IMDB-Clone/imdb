import React from 'react';
import './Footer.css';
import twitterIcon from '../../assets/twitter-icon.png'; 
import facebookIcon from '../../assets/facebook-icon.png'; 
import instagramIcon from '../../assets/instagram-icon.png';
import youtubeIcon from '../../assets/youtube-icon.png'; 
import linkedinIcon from '../../assets/linkedin-icon.png'; 

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Social Icons */}
                <div className="social-icons">
                    <a href="https://twitter.com/imdb" target="_blank" rel="noopener noreferrer">
                        <img src={twitterIcon} alt="Twitter" />
                    </a>
                    <a href="https://www.facebook.com/imdb" target="_blank" rel="noopener noreferrer">
                        <img src={facebookIcon} alt="Facebook" />
                    </a>
                    <a href="https://www.instagram.com/imdb/" target="_blank" rel="noopener noreferrer">
                        <img src={instagramIcon} alt="Instagram" />
                    </a>
                    <a href="https://www.youtube.com/user/IMDbChannel" target="_blank" rel="noopener noreferrer">
                        <img src={youtubeIcon} alt="YouTube" />
                    </a>
                    <a href="https://www.linkedin.com/company/imdb-com/" target="_blank" rel="noopener noreferrer">
                        <img src={linkedinIcon} alt="LinkedIn" />
                    </a>
                </div>

                {/* Footer Links */}
                <div className="footer-links">
                    <a href="https://www.imdb.com/pressroom/?ref_=ft_pr" target="_blank" rel="noopener noreferrer">Press Room</a>
                    <a href="https://www.imdb.com/help/show_article?conditions" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
                    <a href="https://www.imdb.com/help/show_article?privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                </div>
            </div>

            {/* Copyright */}
            <div className="footer-bottom-text">
                &copy; {new Date().getFullYear()} CMPS278 Peeps. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
