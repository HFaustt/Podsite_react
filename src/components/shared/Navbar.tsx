import { Link, NavLink, useLocation } from "react-router-dom";
import React from "react";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  currentPath: string;
}

export default function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="flex items-center justify-between mx-10 z-20 w-[92%] absolute bg-transparent mt-8">
      <div className="justify-start">
        <Link to="/about" className="flex items-center ml-5">
          <img
            src="/logo.jpeg"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
        </Link>
      </div>
      <div>
        <ul className="flex items-center gap-6">
          <NavItem href="/" currentPath={currentPath}>
            Home
          </NavItem>
          <NavItem href="/podcast" currentPath={currentPath}>
            Podcast
          </NavItem>
          <NavItem href="/about" currentPath={currentPath}>
            About
          </NavItem>
        </ul>
      </div>
    </nav>
  );
}

function NavItem({ href, children, currentPath }: NavItemProps) {
  const isActive = currentPath === href;

  return (
    <NavLink to={href}>
      <li
        className={
          isActive
            ? "text-lg transition-all ease-in-out duration-200 relative"
            : ""
        }
        style={{
          boxShadow: isActive ? "0 1px 0 0 white" : "none",
          paddingBottom: isActive ? "1px" : "0",
        }}
      >
        {children}
      </li>
    </NavLink>
  );
}
