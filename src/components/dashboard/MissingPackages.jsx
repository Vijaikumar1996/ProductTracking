import { AlertTriangle } from "lucide-react";

export default function MissingPackages({
  missingPackages,
}) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 h-full">
      <div className="flex items-center gap-2 mb-5">
        <div className="bg-red-100 p-2 rounded-xl">
          <AlertTriangle className="h-5 w-5 text-red-600" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Missing Packages
          </h2>

          <p className="text-sm text-gray-500">
            Missing package summary
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Hub Receive</span>
          <span>
            {missingPackages?.hubReceiveMissing || 0}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Vehicle Loading</span>
          <span>
            {missingPackages?.vehicleLoadingMissing || 0}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>
          <span>
            {missingPackages?.deliveryMissing || 0}
          </span>
        </div>

        <div className="border-t pt-4 flex justify-between font-bold text-red-600">
          <span>Total Missing</span>
          <span>
            {missingPackages?.totalMissingPackages || 0}
          </span>
        </div>
      </div>
    </div>
  );
}