// components/Layout.js

import React from 'react';
import Link from 'next/link';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@nextui-org/react";

const Layout = ({ children }) => {

  //get all the avatars from the public/json/avatars.json file
  const avatars = require('../public/json/avatars.json');

  //get a list of all the distinct names and ids
  const avatarList = avatars.map((avatar) => {
    return {
      id: avatar.id,
      name: avatar.name,
    };
  });


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

                {/* <li className="relative group">
  <a href="#" className="text-gray-600 group-hover:text-gray-900">
    Avatars
  </a>
  <ul className="absolute hidden mt-2 space-y-2 bg-white border border-gray-300 rounded-lg group-hover:block">
    {avatarList.map((avatar) => (
      <li key={avatar.id}>
        <Link href={`/avatars/${avatar.id}`} className="block px-4 py-2 hover:bg-gray-100">
          {avatar.name}
        </Link>
      </li>
    ))}
  </ul>
</li> */}

                <Dropdown>

  <DropdownTrigger>
    <a href="#" className="text-gray-600 group-hover:text-gray-900">
      Avatars
    </a>
  </DropdownTrigger>

  <DropdownMenu>
    <DropdownSection>
      {avatarList.map((avatar) => (
        <DropdownItem key={avatar.id}>
          <Link href={`/avatars/${avatar.id}`} className="block px-4 py-2 hover:bg-gray-100">
            {avatar.name}
          </Link>
        </DropdownItem>
      ))}
    </DropdownSection>
  </DropdownMenu>
  
                </Dropdown>




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
