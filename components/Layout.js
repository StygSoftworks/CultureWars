// components/Layout.js

import React from 'react';
import Link from 'next/link';


const Layout = ({ children }) => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <Link href="/">Home</Link>
          </div>
          <div className="navbar-menu">
            <ul>
              <li>
                <Link href="/about">About Us</Link>
              </li>
                <li>
                <Link href="/viewcards">View Cards</Link>
                </li>
                <li>
                <Link href="/createcard">Create Card</Link>
                </li>
                <li>
                <Link href="/rules">Rules</Link>
                </li>

              {/* Add more navigation links here */}
            </ul>
          </div>
        </div>
      </nav>
      <main className='min-h-screen flex-col items-center justify-center p-8 text-center'>{children}</main>
      <footer>
        {/* Footer content */}
      </footer>

      <style jsx>{`
        .navbar {
          background-color: #333;
          color: #fff;
          padding: 10px 0;
        }

        .navbar-container {
          max-width: 960px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar-brand {
          font-size: 1.5rem;
        }

        .navbar-menu ul {
          list-style: none;
          padding: 0;
          display: flex;
        }

        .navbar-menu li {
          margin-right: 20px;
        }

        .navbar-menu a {
          color: #fff;
          text-decoration: none;
        }

        .navbar-menu a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Layout;
