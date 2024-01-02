import React from 'react';
import Link from 'next/link';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@nextui-org/react";
import { Button } from '@nextui-org/react';

const Layout = ({ children }) => {
  const avatars = require('../public/json/avatars.json');
  const avatarList = avatars.map((avatar) => ({
    id: avatar.id,
    name: avatar.name,
  }));

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <Link href="/">Home</Link>
          </div>
          <ul className="navbar-menu">
            <li>
              <Link href="/about" >About Us</Link>
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
            <li>
              <Dropdown>
                <DropdownTrigger>
                  <Button color="primary" variant="solid" className="capitalize">
                    Avatars
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownSection>
                    {avatarList.map((avatar) => (
                      <DropdownItem key={avatar.id}>
                        <Link href={`/avatars/${avatar.id}`}>{avatar.name}</Link>
                      </DropdownItem>
                    ))}
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </nav>
      <main className="min-h-screen flex-col items-center justify-center p-8 text-center">
        {children}
      </main>
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

        .navbar-menu {
          list-style: none;
          padding: 0;
          display: flex;
          align-items: center;
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
