import { useMemo, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";

import DataTable from "../../components/common/DataTable";
import InputField from "../../components/form/form-input/InputField";
import FormGrid from "../../components/form/FormGrid";
import { useShipments } from "../../queries/useShipment";
import DateField from "../../components/form/form-input/DateField";
import Button from "../../components/ui/button/Button";
import SelectField from "../../components/form/form-input/SelectField";

export default function Orders() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const today = new Date()
        .toISOString()
        .split("T")[0];

    // ---------------------------------------------------------
    // Dashboard filter
    // ---------------------------------------------------------

    const dashboardFilter =
        searchParams.get("dashboardFilter") || "";

    // ---------------------------------------------------------
    // Convert dashboard filter into actual order filters
    // ---------------------------------------------------------

    const getDashboardFilters = () => {
        switch (dashboardFilter) {
            case "todayUploads":
                return {
                    saleOrderNo: "",
                    fromDate: today,
                    toDate: today,
                    status: "UPLOADED",
                };

            case "pendingHubReceive":
                return {
                    saleOrderNo: "",
                    fromDate: "",
                    toDate: "",
                    status: "UPLOADED",
                };

            case "productsInHub":
                return {
                    saleOrderNo: "",
                    fromDate: "",
                    toDate: "",
                    status: "RECEIVED",
                };

            case "outForDelivery":
                return {
                    saleOrderNo: "",
                    fromDate: "",
                    toDate: "",
                    status: "LOADED",
                };

            case "deliveredToday":
                return {
                    saleOrderNo: "",
                    fromDate: today,
                    toDate: today,
                    status: "DELIVERED",
                };

            default:
                return {
                    saleOrderNo: "",
                    fromDate: "",
                    toDate: "",
                    status: "",
                };
        }
    };

    const initialFilters = getDashboardFilters();

    // ---------------------------------------------------------
    // Form
    // ---------------------------------------------------------

    const {
        control,
        register,
        getValues,
        watch,
        setValue,
    } = useForm({
        defaultValues: initialFilters,
    });

    const fromDate = watch("fromDate");

    // ---------------------------------------------------------
    // API filters
    // ---------------------------------------------------------

    const [filters, setFilters] = useState(initialFilters);

    // ---------------------------------------------------------
    // Apply dashboard filter when URL changes
    // ---------------------------------------------------------

    useEffect(() => {
        const newFilters = getDashboardFilters();

        setValue("saleOrderNo", newFilters.saleOrderNo);
        setValue("fromDate", newFilters.fromDate);
        setValue("toDate", newFilters.toDate);
        setValue("status", newFilters.status);

        setFilters(newFilters);
    }, [dashboardFilter]);

    // ---------------------------------------------------------
    // Make sure To Date is not before From Date
    // ---------------------------------------------------------

    useEffect(() => {
        const currentToDate = getValues("toDate");

        if (
            currentToDate &&
            fromDate &&
            currentToDate < fromDate
        ) {
            setValue("toDate", fromDate);
        }
    }, [
        fromDate,
        getValues,
        setValue,
    ]);

    // ---------------------------------------------------------
    // Get shipments
    // ---------------------------------------------------------

    const {
        data: shipments = [],
        isLoading,
    } = useShipments(filters);

    // ---------------------------------------------------------
    // Manual search
    // ---------------------------------------------------------

    const handleSearch = () => {
        const values = getValues();

        setFilters({
            saleOrderNo: values.saleOrderNo || "",
            fromDate: values.fromDate || "",
            toDate: values.toDate || "",
            status: values.status || "",
        });
    };

    // ---------------------------------------------------------
    // Transform API data
    // ---------------------------------------------------------

    const orders = shipments.map((shipment) => ({
        id: shipment.id,

        saleOrderNo: shipment.saleOrderNo,

        shipmentDate: shipment.shipmentDate
            ? new Date(
                shipment.shipmentDate
            ).toLocaleDateString("en-GB")
            : "-",

        expectedHuCount:
            shipment.expectedHuCount || 0,

        uploadedBy:
            shipment.createdByName || "-",

        status:
            shipment.status,

        createdAt:
            shipment.createdAt
                ? new Date(
                    shipment.createdAt
                ).toLocaleString("en-GB")
                : "-",
    }));

    // ---------------------------------------------------------
    // Pinned columns
    // ---------------------------------------------------------

    const pinnedColumns = useMemo(
        () => ({
            left: ["saleOrderNo"],
        }),
        []
    );

    // ---------------------------------------------------------
    // Table columns
    // ---------------------------------------------------------

    const columns = useMemo(
        () => [
            {
                accessorKey: "saleOrderNo",
                header: "Sales Order",
                cell: (info) => (
                    <span className="font-semibold text-gray-800 whitespace-nowrap">
                        {info.getValue()}
                    </span>
                ),
            },

            {
                accessorKey: "shipmentDate",
                header: "Shipment Date",
                cell: (info) => (
                    <span className="text-gray-600 whitespace-nowrap">
                        {info.getValue()}
                    </span>
                ),
            },

            {
                accessorKey: "expectedHuCount",
                header: "Expected HUs",
                cell: (info) => (
                    <span className="font-medium whitespace-nowrap">
                        {info.getValue()}
                    </span>
                ),
            },

            {
                accessorKey: "status",
                header: "Status",
                cell: ({ row }) => {
                    const status =
                        row.original.status;

                    const styles = {
                        PENDING_HUB_RECEIVE:
                            "bg-orange-100 text-orange-700",

                        IN_TRANSIT:
                            "bg-blue-100 text-blue-700",

                        OUT_FOR_DELIVERY:
                            "bg-cyan-100 text-cyan-700",

                        DELIVERED:
                            "bg-green-100 text-green-700",
                    };

                    return (
                        <span
                            className={`
                px-3
                py-1
                rounded-full
                text-xs
                font-medium
                whitespace-nowrap
                ${styles[status] ||
                                "bg-gray-100 text-gray-700"
                                }
              `}
                        >
                            {status?.replaceAll(
                                "_",
                                " "
                            )}
                        </span>
                    );
                },
            },

            {
                accessorKey: "uploadedBy",
                header: "Uploaded By",
            },

            {
                accessorKey: "createdAt",
                header: "Created At",
            },

            {
                id: "actions",
                header: "Actions",
                cell: ({ row }) => (
                    <button
                        onClick={() =>
                            navigate(
                                `/orders/${row.original.id}`
                            )
                        }
                        className="
              text-blue-600
              hover:underline
              whitespace-nowrap
              font-medium
            "
                    >
                        View
                    </button>
                ),
            },
        ],
        [navigate]
    );

    // ---------------------------------------------------------
    // Loading
    // ---------------------------------------------------------

    if (isLoading) {
        return (
            <div className="p-6">
                Loading orders...
            </div>
        );
    }

    // ---------------------------------------------------------
    // Page
    // ---------------------------------------------------------

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Orders
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Manage uploaded shipment orders
                    </p>
                </div>

            </div>

            {/* Filters */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200">

                <div className="mb-5">

                    <FormGrid cols={5}>

                        {/* Sales Order */}
                        <InputField
                            name="saleOrderNo"
                            label="Sales Order"
                            placeholder="Search sales order"
                            control={control}
                        />

                        {/* From Date */}
                        <DateField
                            name="fromDate"
                            label="From Date"
                            control={control}
                        />

                        {/* To Date */}
                        <DateField
                            name="toDate"
                            label="To Date"
                            control={control}
                            minDate={fromDate}
                        />

                        {/* Status */}

                       
                          <SelectField
                            name="status"
                            label="Status"
                            control={control}
                            options={[
                                {
                                    id: "",
                                    name: "All",
                                },
                                {
                                    id: "UPLOADED",
                                    name: "Pending Hub Receive",
                                },
                                {
                                    id: "RECEIVED",
                                    name: "Products in Hub",
                                },
                                {
                                    id: "LOADED",
                                    name: "Out For Delivery",
                                },
                                {
                                    id: "DELIVERED",
                                    name: "Delivered",
                                },
                            ]}
                        />


                        {/* Search */}
                        <div className="flex items-end">

                            <Button
                                type="button"
                                className="w-full mt-6"
                                onClick={handleSearch}
                            >
                                Search
                            </Button>

                        </div>

                    </FormGrid>

                </div>

                {/* Orders table */}
                <DataTable
                    data={orders}
                    columns={columns}
                    pageSize={10}
                    pinnedColumns={pinnedColumns}
                    emptyMessage="No orders found"
                    globalSearch={true}
                    exportFileName="Orders"
                    exportSheetName="Orders"
                />

            </div>

        </div>
    );
}