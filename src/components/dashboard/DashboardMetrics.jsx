import { useNavigate } from "react-router";
import {
  Package,
  Truck,
  Warehouse,
  AlertTriangle,
  Upload,
  CheckCircle2,
} from "lucide-react";

export default function DashboardMetrics({ data }) {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Today's Uploads",
      count: data?.todayUploads || 0,
      label: "Orders",
      icon: Upload,
      route: "/orders",
      borderColor: "border-l-blue-500",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Pending Hub Receive",
      count: data?.pendingHubReceive || 0,
      label: "Orders",
      icon: Package,
      route: "/orders",
      borderColor: "border-l-orange-500",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Products In Hub",
      count: data?.productsInHub || 0,
      label: "Orders",
      icon: Warehouse,
      route: "/orders",
      borderColor: "border-l-purple-500",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Out For Delivery",
      count: data?.outForDelivery || 0,
      label: "Orders",
      icon: Truck,
      route: "/orders",
      borderColor: "border-l-cyan-500",
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600",
    },
    {
      title: "Delivered Today",
      count: data?.deliveredToday || 0,
      label: "Orders",
      icon: CheckCircle2,
      route: "/orders",
      borderColor: "border-l-green-500",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Missing Packages",
      count:
        data?.missingPackages?.totalMissingPackages || 0,
      label: "Packages",
      icon: AlertTriangle,
      route: "/misreports",
      borderColor: "border-l-red-500",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            onClick={() => navigate(card.route)}
            className={`cursor-pointer rounded-2xl border border-gray-200 border-l-4 ${card.borderColor} bg-white py-4 px-4 hover:shadow-md`}
          >
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  {card.count}
                </h3>
              </div>

              <div className={`${card.iconBg} rounded-xl p-2.5`}>
                <Icon
                  className={`h-5 w-5 ${card.iconColor}`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}