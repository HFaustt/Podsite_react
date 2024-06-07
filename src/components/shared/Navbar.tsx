import { Link, NavLink, useLocation } from "react-router-dom";
import MobileNav from "./MobileNav";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  currentPath: string;
}

export default function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="flex items-center justify-between mx-10 z-20 w-[92%] absolute mt-8 ">
      <div className="justify-start">
        <Link to="/" className="flex items-center lg:ml-5 sm:ml-1">
          <img
            src="/logo.webp"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
        </Link>
      </div>
      <div className="hidden lg:flex items-center md:text-[1rem] gap-6">
        <NavItem href="/" currentPath={currentPath}>
          Home
        </NavItem>
        <NavItem href="/podcast" currentPath={currentPath}>
          Podcast
        </NavItem>
        <NavItem href="/about" currentPath={currentPath}>
          About
        </NavItem>
      </div>
      <div className="lg:hidden flex items-center">
        <MobileNav />
      </div>
    </nav>
  );
}

function NavItem({ href, children, currentPath }: NavItemProps) {
  const isActive = currentPath === href;

  return (
    <NavLink to={href} style={{ listStyleType: "none" }}>
      <li
        className={`lg:text-lg xl:text-xl md:text-[1.25rem] transition-all ease-in-out duration-200 relative ${
          isActive ? "text-white font-bold" : "text-gray-400"
        }`}
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
