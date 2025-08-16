import React, { useEffect, useState } from "react";
import { FaCog, FaBars, FaCoins, FaFileAlt, FaRegClock } from "react-icons/fa";
import Logo from "../../assets/agos-logo.png";

import { FaChartSimple, FaClock, FaClockRotateLeft, FaCloudArrowUp } from "react-icons/fa6";
import { NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

// Reusable NavigationItem Component
interface NavigationItemProps {
  icon: React.ReactNode;
  text: string;
  to: string;
  activePath: string;
  isCollapsed?: boolean;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  icon,
  text,
  to,
  activePath,
  isCollapsed,
}) => {
  return (
    <li
      className={`hover:bg-primary5 hover:bg-opacity-50 
                    p-2 rounded flex items-center space-x-3                     
                    ${activePath === to ? "bg-primary5 bg-opacity-50" : ""
        }`}
    >
      <NavLink to={to} className="flex items-center text-sm">
        {icon}
        {!isCollapsed ? <span className="ml-2">{text}</span> : null}
      </NavLink>
    </li>
  );
};

const Navigation: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();


  const toggleNavigation = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Automatically update navigation collapse state based on screen width
  useEffect(() => {
    const handleResize = () => {
      // Define your breakpoint (e.g., 768px)
      if (window.innerWidth < 1200) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    // Check initial window size
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`bg-navigation dark:bg--800 text-gray-800 dark:text-gray-50 ${isCollapsed ? "w-16" : "w-64"
        } h-full ${isCollapsed ? "p-2" : "p-4"} shadow-lg transition-width border-r-4 border-gray-100 dark:border-gray-700 duration-300`}
    >
      {/* Toggle Button (Hamburger Icon) */}
      <div className={`flex ${isCollapsed ? "justify-center" : "justify-end"} items-center`}>
        <button onClick={toggleNavigation} className="text-navigationtext dark:text-gray-50 focus:outline-none">
          <FaBars size={isCollapsed ? 20 : 24} />
        </button>
      </div>

      {/* Logo */}
      {isCollapsed ? null : (<div className="flex items-center justify-center">
        <img src={Logo} alt="Logo" />
      </div>)}

      {/* Navigation Items */}
      <ul className={`space-y-4 text-navigationtext ${isCollapsed ? "mt-4" : ""}`}>
        <NavigationItem
          icon={<FaClock size={isCollapsed ? 20 : 20} />}
          text="TIME TRACK"
          to="/agos"
          activePath={location.pathname}
          isCollapsed={isCollapsed}
        />
        <NavigationItem
          icon={<FaFileAlt size={isCollapsed ? 20 : 20} />}
          text="PROJECT SETUP"
          to="/agos/billingmanager"
          activePath={location.pathname}
          isCollapsed={isCollapsed}
        />
        <NavigationItem
          icon={<FaChartSimple size={isCollapsed ? 20 : 20} />}
          text="REPORTS"
          to="/agos/oracleupload"
          activePath={location.pathname}
          isCollapsed={isCollapsed}
        />
        <NavigationItem
          icon={<FaCog size={isCollapsed ? 20 : 20} />}
          text="SETTINGS"
          to="/agos/settings"
          activePath={location.pathname}
          isCollapsed={isCollapsed}
        />
      </ul>
    </nav>
  );
};

export default Navigation;
