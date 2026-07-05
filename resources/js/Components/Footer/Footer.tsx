import { useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngHeader from '../../Lang/Header/translation';
import Dropdown from '../../Components/Form/Dropdown';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Footer({ type = 'relative' }) {
  const user = usePage().props.auth.user;
  const appLang = useSelector(appLangSelector);
  const lng = new Lang({
    messages: lngHeader,
    locale: appLang,
  });

  return (
    <footer className="landing-footer">
      <div className="footer-container">
        {/* TOP */}

        <div className={`footer-hero ${user ? 'footer-hero-auth' : ''}`}>
          <h2>DentalCare</h2>
          <p>The operating system for modern dental clinics.</p>
          <span>Scheduling. Patients. Finance. Growth.</span>
          {!user && <button className="footer-cta">Зареєструватися безкоштовно</button>}
        </div>

        {/* LINKS */}
        {!user && (
          <>
            <div className="footer-links-grid">
              <div>
                <h4>Product</h4>

                <a href="#">Pricing</a>
                <a href="#">API</a>
                <a href="#">Documentation</a>
              </div>

              <div>
                <h4>Company</h4>

                <a href="#">Contacts</a>
                <a href="#">Support</a>
                <a href="#">About</a>
              </div>

              <div>
                <h4>Account</h4>

                <a href="#">Login</a>
                <a href="#">Register</a>
                <a href="#">Reset Password</a>
              </div>

              <div>
                <h4>Legal</h4>

                <a href="#">Privacy Policy</a>
                <a href="#">Terms</a>
                <a href="#">Data Processing</a>
              </div>
            </div>
          </>
        )}

        {/* BOTTOM */}

        <div className="footer-bottom">
          <div className="footer-divider"></div>

          <p>Built for clinics that scale.</p>

          <span>© 2026 DentalCare</span>
        </div>
      </div>
    </footer>
  );
}
