import React from 'react';
import './Footer.css'; // Import the external CSS file
import TriboxLogo from '../../Assets/Triboxred.svg'; // Import the new SVG logo

const Footer: React.FC = () => {
    return (
        <div className="footer-container">
            <div className="footer-header">
                <div className="logo-container">
                    <img src={TriboxLogo} alt="Tribox Logo" className="footer-logo" />
                </div>
            </div>

            {/* Container that holds both footer links and newsletter side by side */}
            <div className="footer-links-newsletter-container">
                <div className="footer-links-container">
                    <div className="footer-links-group">
                        <div className="footer-link-title">Products</div>
                        <div className="footer-link">Join</div>
                        <div className="footer-link">Security</div>
                        <div className="footer-link">Updates</div>
                    </div>
                    <div className="footer-links-group">
                        <div className="footer-link-title">Company</div>
                        <div className="footer-link">FAQ</div>
                        <div className="footer-link">About</div>
                        <div className="footer-link">Forum</div>
                    </div>
                    <div className="footer-links-group">
                        <div className="footer-link-title">Industries</div>
                        <div className="footer-link">Ventures</div>
                        <div className="footer-link">Business Model</div>
                        <div className="footer-link">Taxation Information</div>
                    </div>
                    <div className="footer-links-group">
                        <div className="footer-link-title">Help</div>
                        <div className="footer-link">Complaints</div>
                        <div className="footer-link">Support Docs</div>
                        <div className="footer-link">Support Email</div>
                        <div className="footer-link">System Status</div>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="newsletter-container">
                    <div className="newsletter-title">Subscribe to our newsletter!</div>
                    <div className="newsletter-form">
                        <input type="email" placeholder="Enter your email" className="newsletter-input" />
                        <button className="newsletter-btn">Subscribe</button>
                    </div>
                </div>
            </div>

            {/* Footer Bottom Section */}
            <div className="footer-bottom">
                <div className="footer-bottom-left">
                    Designed by the talented team at Tri-Box using tools they love ✨ 🍭
                </div>
                <div className="footer-bottom-right">
                    Terms & Conditions | Privacy Policy
                </div>
            </div>
        </div>
    );
};

export default Footer;
