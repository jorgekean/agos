import React, { useEffect, useState } from "react";
// UPDATED: Added FaChevronLeft and FaChevronRight
import { FaCog, FaFileAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Logo from "../../assets/agos-logo.png";

import { FaChartSimple, FaClock } from "react-icons/fa6";
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
                 p-2 rounded flex items-center
                 ${activePath === to ? "bg-primary5 bg-opacity-50" : ""
        }`}
    >
      {/* UPDATED THIS LINE 👇 */}
      <NavLink to={to} className={`flex items-center text-sm w-full ${isCollapsed ? 'justify-center' : ''}`}>
        {icon}
        {!isCollapsed ? <span className="ml-2 whitespace-nowrap">{text}</span> : null}
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`relative bg-navigation dark:bg-gray-800 text-gray-800 dark:text-gray-50 ${isCollapsed ? "w-16" : "w-64"
        } h-full ${isCollapsed ? "p-2" : "p-4"} shadow-lg transition-all border-r-4 border-gray-100 dark:border-gray-700 duration-300`}
    >
      <div className={`flex items-center justify-center ${isCollapsed ? "mt-40" : ""}`}>
        {!isCollapsed && <img src={Logo} alt="Logo" className="max-h-full" />}
      </div>

      <ul className={`space-y-4 text-navigationtext`}>
        <NavigationItem
          icon={<FaClock size={20} />}
          text="TIME TRACK"
          to="/agos"
          activePath={location.pathname}
          isCollapsed={isCollapsed}
        />
        <NavigationItem
          icon={<FaFileAlt size={20} />}
          text="PROJECT SETUP"
          to="/agos/billingmanager"
          activePath={location.pathname}
          isCollapsed={isCollapsed}
        />
        <NavigationItem
          icon={<FaChartSimple size={20} />}
          text="REPORTS"
          to="/agos/oracleupload"
          activePath={location.pathname}
          isCollapsed={isCollapsed}
        />
        <NavigationItem
          icon={<FaCog size={20} />}
          text="SETTINGS"
          to="/agos/settings"
          activePath={location.pathname}
          isCollapsed={isCollapsed}
        />
      </ul>

      <button
        onClick={toggleNavigation}
        className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 w-8 h-8 rounded-full shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none transition-all duration-300"
        aria-label={isCollapsed ? "Expand navigation" : "Collapse navigation"}
      >
        {isCollapsed ? (
          <FaChevronRight className="text-gray-600 dark:text-gray-300" />
        ) : (
          <FaChevronLeft className="text-gray-600 dark:text-gray-300" />
        )}
      </button>

    </nav>
  );
};

export default Navigation;