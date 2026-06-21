import { ScanLine } from "lucide-react";

export default function RecentScanActivity() {
  const activities = [
    {
      huNumber: "161202731",
      stage: "HUB RECEIVE",
      time: "10:32 AM",
      user: "Ravi",
    },
    {
      huNumber: "164165971",
      stage: "VEHICLE LOADING",
      time: "10:45 AM",
      user: "Kumar",
    },
    {
      huNumber: "161187260",
      stage: "DELIVERY",
      time: "11:05 AM",
      user: "Arun",
    },
    {
      huNumber: "161202888",
      stage: "DELIVERY",
      time: "11:22 AM",
      user: "Suresh",
    },
  ];

  const stageTextStyles = {
    "HUB RECEIVE":
      "text-blue-600",

    "VEHICLE LOADING":
      "text-cyan-600",

    DELIVERY:
      "text-green-600",
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="bg-gray-100 p-2 rounded-xl">
          <ScanLine className="h-5 w-5 text-gray-700" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Scan Activity
          </h2>

          <p className="text-sm text-gray-500">
            Latest barcode scan updates
          </p>
        </div>
      </div>

      {/* Activities */}
      <div className="space-y-4">
        {activities.map((item, index) => (
          <div
            key={index}
            className="
    flex
    items-center
    justify-between
    border-b
    border-gray-100
    py-3
  "
          >
            {/* Left */}
            <div>
              <p className="font-semibold text-sm text-gray-800">
                {item.huNumber}

                <span className="ml-1 font-normal text-gray-500">
                  by {item.user}
                </span>
              </p>
            </div>

            {/* Right */}
            <div>
              <p
                className={`
      text-xs
      font-medium
      ${stageTextStyles[item.stage]}
    `}
              >
                {item.stage} at {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}