import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  ChevronDown,
  ClipboardList,
  Ellipsis,
  FileBarChart,
  LayoutDashboard,
  LogOut,
  PackagePlus,
} from "lucide-react";

import { useSidebar } from "../context/SidebarContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";
import AppConfig from "../utils/appConfig";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;

  // Roles allowed to see this menu.
  // If roles is not provided, the menu is visible to everyone.
  roles?: string[];

  subItems?: {
    name: string;
    path: string;
    pro?: boolean;
    new?: boolean;
    roles?: string[];
  }[];
};

/* =========================================================
   DASHBOARD MENU
   ========================================================= */

const noSubHeaderItems: NavItem[] = [
  {
    icon: <LayoutDashboard />,
    name: "Dashboard",
    path: "/home",
  },
];

/* =========================================================
   OPERATIONS MENU
   ========================================================= */

const othersItems: NavItem[] = [
  {
    icon: <PackagePlus />,
    name: "Upload Shipment",
    path: "/uploadshipment",

    // Only these roles can see Upload Shipment
    roles: ["WEB_ADMIN", "WEB_USER"],
  },
  {
    icon: <ClipboardList />,
    name: "Orders",
    path: "/orders",
  },
];

/* =========================================================
   SIDEBAR
   ========================================================= */

const AppSidebar: React.FC = () => {
  const {
    isExpanded,
    isMobileOpen,
    isHovered,
    setIsHovered,
    toggleSidebar,
    toggleMobileSidebar,
  } = useSidebar();

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state: any) => state.auth);

  /* =========================================================
     USER ROLES
     ========================================================= */

  const userRoles: string[] = user?.roles || [];

  /* =========================================================
     REPORTS MENU
     ========================================================= */

  

  const navItems: NavItem[] = [
    {
      icon: <FileBarChart />,
      name: "MIS Reports",
      path: "/misreports",
    },

    // Example for future role-based menu
    //
    // {
    //   icon: <SomeIcon />,
    //   name: "Admin Report",
    //   path: "/adminreport",
    //   roles: ["WEB_ADMIN"],
    // },
  ];

  /* =========================================================
     SUBMENU STATE
     ========================================================= */

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);

  const [subMenuHeight, setSubMenuHeight] = useState<
    Record<string, number>
  >({});

  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  /* =========================================================
     ACTIVE MENU
     ========================================================= */

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  /* =========================================================
     ROLE ACCESS
     ========================================================= */

  const hasMenuAccess = useCallback(
    (nav: NavItem) => {
      // If no roles are specified,
      // everyone can access the menu.
      if (!nav.roles || nav.roles.length === 0) {
        return true;
      }

      // User must have at least one matching role.
      return nav.roles.some((role) => userRoles.includes(role));
    },
    [userRoles]
  );

  /* =========================================================
     MOBILE SIDEBAR TOGGLE
     ========================================================= */

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      // toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  /* =========================================================
     LOGOUT
     ========================================================= */

  const handleLogout = async () => {
    await dispatch(logout() as any);
    navigate("/");
  };

  /* =========================================================
     OPEN SUBMENU BASED ON CURRENT LOCATION
     ========================================================= */

  useEffect(() => {
    let submenuMatched = false;

    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;

      items.forEach((nav, index) => {
        // Don't process menus the current user cannot access
        if (!hasMenuAccess(nav)) {
          return;
        }

        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            // Check submenu role access
            if (
              subItem.roles &&
              subItem.roles.length > 0 &&
              !subItem.roles.some((role) => userRoles.includes(role))
            ) {
              return;
            }

            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });

              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [
    location,
    isActive,
    hasMenuAccess,
    userRoles,
  ]);

  /* =========================================================
     SUBMENU HEIGHT
     ========================================================= */

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;

      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  /* =========================================================
     SUBMENU TOGGLE
     ========================================================= */

  const handleSubmenuToggle = (
    index: number,
    menuType: "main" | "others"
  ) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }

      return {
        type: menuType,
        index,
      };
    });
  };

  /* =========================================================
     RENDER MENU ITEMS
     ========================================================= */

  const renderMenuItems = (
    items: NavItem[],
    menuType: "main" | "others"
  ) => (
    <ul className="flex flex-col gap-4">
      {items
        // Filter menus based on role
        .filter((nav) => hasMenuAccess(nav))
        .map((nav, index) => (
          <li key={nav.name} onClick={handleToggle}>
            {/* =================================================
                MENU WITH SUB ITEMS
               ================================================= */}

            {nav.subItems ? (
              <button
                onClick={() =>
                  handleSubmenuToggle(index, menuType)
                }
                className={`menu-item group ${
                  openSubmenu?.type === menuType &&
                  openSubmenu?.index === index
                    ? "menu-item-active"
                    : "menu-item-inactive"
                } cursor-pointer ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "lg:justify-start"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>

                {(isExpanded ||
                  isHovered ||
                  isMobileOpen) && (
                  <span className="menu-item-text">
                    {nav.name}
                  </span>
                )}

                {(isExpanded ||
                  isHovered ||
                  isMobileOpen) && (
                  <ChevronDown
                    className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                      openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                        ? "rotate-180 text-brand-500"
                        : ""
                    }`}
                  />
                )}
              </button>
            ) : (
              /* =================================================
                 NORMAL MENU ITEM
                 ================================================= */

              nav.path && (
                <Link
                  to={nav.path}
                  className={`menu-item group ${
                    isActive(nav.path)
                      ? "menu-item-active"
                      : "menu-item-inactive"
                  }`}
                >
                  <span
                    className={`menu-item-icon-size ${
                      isActive(nav.path)
                        ? "menu-item-icon-active"
                        : "menu-item-icon-inactive"
                    }`}
                  >
                    {nav.icon}
                  </span>

                  {(isExpanded ||
                    isHovered ||
                    isMobileOpen) && (
                    <span className="menu-item-text">
                      {nav.name}
                    </span>
                  )}
                </Link>
              )
            )}

            {/* =================================================
                SUBMENU
               ================================================= */}

            {nav.subItems &&
              (isExpanded ||
                isHovered ||
                isMobileOpen) && (
                <div
                  ref={(el) => {
                    subMenuRefs.current[
                      `${menuType}-${index}`
                    ] = el;
                  }}
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    height:
                      openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                        ? `${
                            subMenuHeight[
                              `${menuType}-${index}`
                            ]
                          }px`
                        : "0px",
                  }}
                >
                  <ul className="mt-2 space-y-1 ml-9">
                    {nav.subItems
                      // Filter submenu based on role
                      .filter((subItem) => {
                        if (
                          !subItem.roles ||
                          subItem.roles.length === 0
                        ) {
                          return true;
                        }

                        return subItem.roles.some(
                          (role) =>
                            userRoles.includes(role)
                        );
                      })
                      .map((subItem) => (
                        <li key={subItem.name}>
                          <Link
                            to={subItem.path}
                            className={`menu-dropdown-item ${
                              isActive(subItem.path)
                                ? "menu-dropdown-item-active"
                                : "menu-dropdown-item-inactive"
                            }`}
                          >
                            {subItem.name}

                            <span className="flex items-center gap-1 ml-auto">
                              {subItem.new && (
                                <span
                                  className={`ml-auto ${
                                    isActive(
                                      subItem.path
                                    )
                                      ? "menu-dropdown-badge-active"
                                      : "menu-dropdown-badge-inactive"
                                  } menu-dropdown-badge`}
                                >
                                  new
                                </span>
                              )}

                              {subItem.pro && (
                                <span
                                  className={`ml-auto ${
                                    isActive(
                                      subItem.path
                                    )
                                      ? "menu-dropdown-badge-active"
                                      : "menu-dropdown-badge-inactive"
                                  } menu-dropdown-badge`}
                                >
                                  pro
                                </span>
                              )}
                            </span>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
          </li>
        ))}
    </ul>
  );

  /* =========================================================
     SIDEBAR UI
     ========================================================= */

  return (
    <aside
      className={`fixed mt-16 lg:pb-0 pb-20 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200

        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }

        ${
          isMobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }

        lg:translate-x-0`}
      onMouseEnter={() =>
        !isExpanded && setIsHovered(true)
      }
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* =====================================================
          LOGO / HEADER
         ===================================================== */}

      <div
        className={`${
          isMobileOpen
            ? "pt-6 pb-4 px-2 justify-start"
            : "py-5 justify-center"
        } flex`}
      >
        <Link to="/home">
          {
          // isMobileOpen ? (
          //   <span className="text-xl font-bold text-gray-800 dark:text-white mt-5">
          //     {user?.InstituteName ||
          //       "Tuition Center"}
          //   </span>
          // ) :
            isExpanded || isHovered ? (
            <>
              <div className="flex items-center justify-start gap-3 w-full px-2">
                <img
                  src="/images/logo/logo.jpeg"
                  alt={AppConfig.companyName}
                  className="object-contain flex-shrink-0 w-15 h-15 rounded-full"
                />

                {(isExpanded ||
                  isHovered ||
                  isMobileOpen) && (
                  <div>
                    <h2 className="text-sm font-bold tracking-wide text-gray-900 dark:text-white uppercase">
                      {AppConfig.companyName}
                    </h2>

                    <p className="text-[11px] text-gray-500 uppercase tracking-wider">
                      {AppConfig.companySubName}
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-start gap-3 w-full px-2">
              <img
                src="/images/logo/favicon-circular.png"
                alt="Logo"
              />
            </div>
          )}
        </Link>
      </div>

      {/* =====================================================
          MENU AREA
         ===================================================== */}

      <div className="flex flex-col h-full overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">

            {/* =================================================
                DASHBOARD
               ================================================= */}

            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded ||
                isHovered ||
                isMobileOpen ? (
                  "Dashboard"
                ) : (
                  <Ellipsis className="size-6" />
                )}
              </h2>

              {renderMenuItems(
                noSubHeaderItems,
                "main"
              )}
            </div>

            {/* =================================================
                OPERATIONS
               ================================================= */}

            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded ||
                isHovered ||
                isMobileOpen ? (
                  "Operations"
                ) : (
                  <Ellipsis className="size-6" />
                )}
              </h2>

              {renderMenuItems(
                othersItems,
                "others"
              )}
            </div>

            {/* =================================================
                REPORTS
               ================================================= */}

            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded ||
                isHovered ||
                isMobileOpen ? (
                  "Reports"
                ) : (
                  <Ellipsis className="size-6" />
                )}
              </h2>

              {renderMenuItems(
                navItems,
                "main"
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* =====================================================
          LOGOUT
         ===================================================== */}

      <div
        className={`${
          isMobileOpen ? "pb-16" : "pb-4"
        } sticky bottom-0 bg-white dark:bg-gray-900 py-3`}
      >
        <button
          onClick={handleLogout}
          className="menu-item w-full flex items-center gap-2"
        >
          <LogOut />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;