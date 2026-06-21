import { useNavigate, useParams } from "react-router";
import { useShipment } from "../../queries/useShipment";

function InfoItem({ label, value }) {
    return (
        <div>
            <p className="text-xs text-gray-500 mb-1">
                {label}
            </p>

            <p className="font-medium text-gray-800">
                {value || "-"}
            </p>
        </div>
    );
}

export default function ViewOrder() {

    const navigate = useNavigate();

    const { id } = useParams();

    const {
        data: order,
        isLoading,
        isError,
    } = useShipment(id);

    if (isLoading) {
        return (
            <div className="p-6">
                Loading order details...
            </div>
        );
    }

    if (isError || !order) {
        return (
            <div className="p-6">

                <button
                    onClick={() => navigate("/orders")}
                    className="text-blue-600 hover:underline"
                >
                    ← Back To Orders
                </button>

                <p className="mt-4 text-red-500">
                    Order not found
                </p>

            </div>
        );
    }

    const deliveredPercentage =
        order.expectedHuCount > 0
            ? Math.round(
                ((order.deliveredHuCount || 0) /
                    order.expectedHuCount) * 100
            )
            : 0;

    return (

        <div className="space-y-6">

            {/* Back */}

            <button
                onClick={() => navigate("/orders")}
                className="
                    text-blue-600
                    hover:text-blue-800
                    font-medium
                "
            >
                ← Back To Orders
            </button>

            {/* Shipment Summary */}

            <div className="bg-white border rounded-2xl p-6">

                <h2 className="text-lg font-semibold mb-5">
                    Sale Order - {order.saleOrderNo}
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                    <InfoItem
                        label="Shipment Date"
                        value={order.shipmentDate}
                    />

                    <div>

                        <p className="text-xs text-gray-500 mb-1">
                            Status
                        </p>

                        <span
                            className={`
                                inline-flex
                                px-3
                                py-1
                                rounded-full
                                text-xs
                                font-medium
                                ${
                                    order.status === "PENDING_HUB_RECEIVE"
                                        ? "bg-orange-100 text-orange-700"
                                        : order.status === "IN_TRANSIT"
                                        ? "bg-blue-100 text-blue-700"
                                        : order.status === "OUT_FOR_DELIVERY"
                                        ? "bg-cyan-100 text-cyan-700"
                                        : order.status === "DELIVERED"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-100 text-gray-700"
                                }
                            `}
                        >
                            {order.status?.replaceAll("_", " ")}
                        </span>

                    </div>

                    <InfoItem
                        label="Expected HUs"
                        value={order.expectedHuCount}
                    />

                    <InfoItem
                        label="Uploaded By"
                        value={order.createdByName}
                    />

                </div>

            </div>

            {/* HU Progress */}

            <div className="bg-white border rounded-2xl p-6">

                <div className="flex justify-between items-center mb-5">

                    <h2 className="text-lg font-semibold">
                        HU Progress
                    </h2>

                    <span className="font-semibold text-blue-600">
                        {deliveredPercentage}% Delivered
                    </span>

                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

                    <div className="bg-gray-50 rounded-xl p-4">

                        <p className="text-xs text-gray-500">
                            Expected
                        </p>

                        <p className="text-2xl font-bold">
                            {order.expectedHuCount || 0}
                        </p>

                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">

                        <p className="text-xs text-gray-500">
                            Received
                        </p>

                        <p className="text-2xl font-bold">
                            {order.receivedHuCount || 0}
                        </p>

                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">

                        <p className="text-xs text-gray-500">
                            Loaded
                        </p>

                        <p className="text-2xl font-bold">
                            {order.loadedHuCount || 0}
                        </p>

                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">

                        <p className="text-xs text-gray-500">
                            Delivered
                        </p>

                        <p className="text-2xl font-bold text-green-600">
                            {order.deliveredHuCount || 0}
                        </p>

                    </div>

                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">

                    <div
                        className="
                            bg-green-500
                            h-3
                            rounded-full
                            transition-all
                        "
                        style={{
                            width: `${deliveredPercentage}%`,
                        }}
                    />

                </div>

            </div>

            {/* Tracking Timeline */}

            <div className="bg-white border rounded-2xl p-6">

                <h2 className="text-lg font-semibold mb-5">
                    Tracking Timeline
                </h2>

                <div className="space-y-4">

                    <div className="flex gap-4">

                        <div className="w-3 h-3 rounded-full bg-green-500 mt-1" />

                        <div>

                            <p className="font-medium">
                                Shipment Uploaded
                            </p>

                            <p className="text-sm text-gray-500">
                                Shipment created successfully
                            </p>

                        </div>

                    </div>

                    <div className="flex gap-4 opacity-50">

                        <div className="w-3 h-3 rounded-full bg-gray-400 mt-1" />

                        <div>

                            <p className="font-medium">
                                Received At Hub
                            </p>

                        </div>

                    </div>

                    <div className="flex gap-4 opacity-50">

                        <div className="w-3 h-3 rounded-full bg-gray-400 mt-1" />

                        <div>

                            <p className="font-medium">
                                Loaded To Vehicle
                            </p>

                        </div>

                    </div>

                    <div className="flex gap-4 opacity-50">

                        <div className="w-3 h-3 rounded-full bg-gray-400 mt-1" />

                        <div>

                            <p className="font-medium">
                                Delivered
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            {/* Customer Details */}

            <div className="bg-white border rounded-2xl p-6">

                <h2 className="text-lg font-semibold mb-5">
                    Customer Details
                </h2>

                <div className="grid grid-cols-2 gap-6">

                    <InfoItem
                        label="Customer Name"
                        value={order.customerName}
                    />

                    <InfoItem
                        label="Contact Person"
                        value={order.contactPerson}
                    />

                    <InfoItem
                        label="Contact Number"
                        value={order.contactNumber}
                    />

                </div>

                <div className="mt-6">

                    <p className="text-xs text-gray-500 mb-2">
                        Delivery Address
                    </p>

                    <p className="text-gray-700 leading-6">
                        {order.deliveryAddress || "-"}
                    </p>

                </div>

            </div>

            {/* Transport Details */}

            <div className="bg-white border rounded-2xl p-6">

                <h2 className="text-lg font-semibold mb-5">
                    Transport Details
                </h2>

                <div className="grid grid-cols-2 gap-6">

                    <InfoItem
                        label="Vehicle Number"
                        value={order.vehicleNumber}
                    />

                    <InfoItem
                        label="Driver Name"
                        value={order.inboundDriverName}
                    />

                    <InfoItem
                        label="Driver Mobile"
                        value={order.inboundDriverMobile}
                    />

                </div>

            </div>

        </div>

    );
}