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
                    order.expectedHuCount) *
                100
            )
            : 0;

    /*
     * ============================================================
     * TRACKING TIMELINE
     * ============================================================
     *
     * Uploaded
     *     ↓
     * Received
     *     ↓
     * Loaded
     *     ↓
     * Delivered
     *
     * Current API statuses:
     *
     * PENDING_HUB_RECEIVE -> Received
     * IN_TRANSIT          -> Loaded
     * DELIVERED           -> Delivered
     */

    const trackingSteps = [
        {
            key: "UPLOADED",
            title: "Uploaded",
            description: "Shipment uploaded successfully",
            completed: true,
        },
        {
            key: "RECEIVED",
            title: "Received",
            description: "Shipment received at hub",
            completed: [
                "RECEIVED",
                "LOADED",
                "DELIVERED",
            ].includes(order.status),
        },
        {
            key: "LOADED",
            title: "Loaded",
            description: "Shipment loaded to vehicle",
            completed: [
                "LOADED",
                "DELIVERED",
            ].includes(order.status),
        },
        {
            key: "DELIVERED",
            title: "Delivered",
            description: "Shipment delivered successfully",
            completed:
                order.status === "DELIVERED",
        },
    ];

    return (
        <div className="space-y-6">

            {/* =====================================================
                BACK
               ===================================================== */}

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


            {/* =====================================================
                SHIPMENT SUMMARY
               ===================================================== */}

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
                                    order.status ===
                                    "PENDING_HUB_RECEIVE"
                                        ? "bg-orange-100 text-orange-700"
                                        : order.status ===
                                          "IN_TRANSIT"
                                        ? "bg-blue-100 text-blue-700"
                                        : order.status ===
                                          "DELIVERED"
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


            {/* =====================================================
                HU PROGRESS
               ===================================================== */}

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


                {/* Progress Bar */}

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


            {/* =====================================================
                TRACKING TIMELINE
               ===================================================== */}

            <div className="bg-white border rounded-2xl p-6">

                <h2 className="text-lg font-semibold mb-6">
                    Tracking Timeline
                </h2>

                <div className="relative">

                    {trackingSteps.map((step, index) => {

                        const isLast =
                            index === trackingSteps.length - 1;

                        return (
                            <div
                                key={step.key}
                                className="
                                    relative
                                    flex
                                    gap-4
                                    pb-7
                                    last:pb-0
                                "
                            >

                                {/* Vertical Line */}

                                {!isLast && (
                                    <div
                                        className={`
                                            absolute
                                            left-[5px]
                                            top-3
                                            w-[2px]
                                            h-full
                                            ${
                                                step.completed
                                                    ? "bg-green-500"
                                                    : "bg-gray-200"
                                            }
                                        `}
                                    />
                                )}


                                {/* Status Circle */}

                                <div
                                    className={`
                                        relative
                                        z-10
                                        w-3
                                        h-3
                                        mt-1
                                        rounded-full
                                        flex-shrink-0
                                        ${
                                            step.completed
                                                ? "bg-green-500"
                                                : "bg-gray-300"
                                        }
                                    `}
                                />


                                {/* Timeline Content */}

                                <div
                                    className={
                                        step.completed
                                            ? "opacity-100"
                                            : "opacity-50"
                                    }
                                >

                                    <p
                                        className={`
                                            font-medium
                                            ${
                                                step.completed
                                                    ? "text-gray-800"
                                                    : "text-gray-500"
                                            }
                                        `}
                                    >
                                        {step.title}
                                    </p>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {step.description}
                                    </p>

                                </div>

                            </div>
                        );
                    })}

                </div>

            </div>


            {/* =====================================================
                CUSTOMER DETAILS
               ===================================================== */}

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


            {/* =====================================================
                TRANSPORT DETAILS
               ===================================================== */}

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