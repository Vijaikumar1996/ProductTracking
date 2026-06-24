import { useNavigate, useLocation } from "react-router";
import { ClipboardList, FileBarChart, LayoutDashboard, PackagePlus, Users } from "lucide-react";

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        { name: "Home", path: "/home", icon: <LayoutDashboard fontSize={20} /> },
        { name: "Upload Shipment", path: "/uploadshipment", icon: <PackagePlus fontSize={20} /> },
        { name: "Orders", path: "/orders", icon: <ClipboardList fontSize={20} /> },
        { name: "MIS Reports", path: "/misreports", icon: <FileBarChart fontSize={20} /> },

    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-md lg:hidden">
            <div className="flex justify-around items-center h-14">
                {tabs.map((tab) => {
                    const isActive = location.pathname.includes(tab.path);

                    return (
                        <button
                            key={tab.name}
                            onClick={() => navigate(tab.path)}
                            className={`flex flex-col items-center text-sm ${isActive ? "text-blue-600" : "text-gray-500"
                                }`}
                        >
                            {/* <tab.icon size={20} /> */}
                            {tab.icon}
                            {tab.name}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomNav;