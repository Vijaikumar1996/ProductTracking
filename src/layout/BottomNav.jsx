import { useNavigate, useLocation } from "react-router";
import {
    ClipboardList,
    FileBarChart,
    LayoutDashboard,
    PackagePlus,
} from "lucide-react";
import { useSelector } from "react-redux";

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { user } = useSelector((state) => state.auth);

    const userRoles = user?.roles || [];

    const tabs = [
        {
            name: "Home",
            path: "/home",
            icon: <LayoutDashboard size={20} />,
        },
        {
            name: "Upload Shipment",
            path: "/uploadshipment",
            icon: <PackagePlus size={20} />,
            roles: ["WEB_ADMIN", "WEB_USER"],
        },
        {
            name: "Orders",
            path: "/orders",
            icon: <ClipboardList size={20} />,
        },
        {
            name: "MIS Reports",
            path: "/misreports",
            icon: <FileBarChart size={20} />,
        },
    ];

    const hasAccess = (tab) => {
        // If roles are not specified,
        // allow everyone to see the menu
        if (!tab.roles || tab.roles.length === 0) {
            return true;
        }

        // User should have at least one matching role
        return tab.roles.some((role) =>
            userRoles.includes(role)
        );
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-md lg:hidden">
            <div className="flex justify-around items-center h-14">
                {tabs
                    .filter((tab) => hasAccess(tab))
                    .map((tab) => {
                        const isActive =
                            location.pathname === tab.path ||
                            location.pathname.startsWith(
                                `${tab.path}/`
                            );

                        return (
                            <button
                                key={tab.name}
                                onClick={() => navigate(tab.path)}
                                className={`flex flex-col items-center justify-center text-xs ${
                                    isActive
                                        ? "text-blue-600"
                                        : "text-gray-500"
                                }`}
                            >
                                {tab.icon}

                                <span className="mt-0.5">
                                    {tab.name}
                                </span>
                            </button>
                        );
                    })}
            </div>
        </div>
    );
};

export default BottomNav;