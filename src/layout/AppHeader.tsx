import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useSidebar } from "../context/SidebarContext";
import UserDropdown from "../components/header/UserDropdown";
import { useSelector } from "react-redux";
import AppConfig from "../utils/appConfig";

const AppHeader: React.FC = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);

  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const { user } = useSelector((state) => state.auth);

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200 z-999 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">

        {/* 🔹 LEFT SECTION */}
        <div className="flex items-center justify-between w-full gap-2 px-3 py-1 border-b border-gray-200 dark:border-gray-800 sm:gap-3 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-2">

          {/* Sidebar Toggle */}
          <button
            className="items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-99999 dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-11 lg:w-11 lg:border"
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? (
              <span>✖</span>
            ) : (
              <span>☰</span>
            )}
          </button>

          {/* Mobile Logo */}
          <Link to="/home" className="lg:hidden py-1">
            <div className="flex items-center justify-start gap-3 w-full px-2">
              <img
                src="/images/logo/logo.jpeg"
                alt={AppConfig.companyName}
                className="object-contain flex-shrink-0 w-14 h-14 rounded-full"
              />


              <div>
                <h2 className="text-sm font-bold tracking-wide text-gray-900 dark:text-white uppercase">
                  {AppConfig.companyName}
                </h2>

                <p className="text-[11px] text-gray-500 uppercase tracking-wider">
                  {AppConfig.companySubName}
                </p>
              </div>

            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleApplicationMenu}
            className="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg z-99999 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
          >
            ⋮
          </button>
        </div>

        {/* 🔥 CENTER SECTION (NEW - HARD CODED NAME) */}
        {/* CENTER SECTION */}
        <div className="hidden lg:flex flex-1 justify-center items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white whitespace-nowrap">
          
            {AppConfig.appName}
          </h2>
        </div>

        {/* 🔹 RIGHT SECTION */}
        <div
          className={`${isApplicationMenuOpen ? "flex" : "hidden"
            } items-center justify-between w-full gap-4 px-5 py-4 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`}
        >

          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;