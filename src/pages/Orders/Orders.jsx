import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import DataTable from "../../components/common/DataTable";
import InputField from "../../components/form/form-input/InputField";
import FormGrid from "../../components/form/FormGrid";
import { useShipments } from "../../queries/useShipment";
import DateField from "../../components/form/form-input/DateField";
import Button from "../../components/ui/button/Button";
import { PackagePlus } from "lucide-react";

export default function Orders() {

    const navigate = useNavigate();

    const today = new Date()
        .toISOString()
        .split("T")[0];

    const {
        control,
        register,
        getValues,
        watch,
        setValue,
    } = useForm({
        defaultValues: {
            saleOrderNo: "",
            fromDate: today,
            toDate: today,
            status: "",
        },
    });

    const fromDate = watch("fromDate");

    const [filters, setFilters] = useState({
        saleOrderNo: "",
        fromDate: today,
        toDate: today,
        status: "",
    });

    useEffect(() => {

        const currentToDate =
            getValues("toDate");

        if (
            currentToDate &&
            fromDate &&
            currentToDate < fromDate
        ) {
            setValue(
                "toDate",
                fromDate
            );
        }

    }, [
        fromDate,
        getValues,
        setValue,
    ]);

    const {
        data: shipments = [],
        isLoading,
    } = useShipments(filters);

    const handleSearch = () => {

        const values = getValues();

        setFilters({
            saleOrderNo:
                values.saleOrderNo,

            fromDate:
                values.fromDate,

            toDate:
                values.toDate,

            status:
                values.status,
        });
    };

    const orders = shipments.map((shipment) => ({
        id: shipment.id,

        saleOrderNo: shipment.saleOrderNo,

        shipmentDate: shipment.shipmentDate
            ? new Date(shipment.shipmentDate)
                .toLocaleDateString("en-GB")
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

    const pinnedColumns = useMemo(
        () => ({
            left: ["saleOrderNo"],
        }),
        []
    );

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

    if (isLoading) {
        return (
            <div className="p-6">
                Loading orders...
            </div>
        );
    }

    return (
        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Orders
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Manage uploaded shipment orders
                    </p>
                </div>

                {/* <button
                    onClick={() =>
                        navigate("/uploadshipment")
                    }
                    className="
                        px-5
                        py-2.5
                        bg-blue-600
                        text-white
                        rounded-xl
                        hover:bg-blue-700
                        transition
                    "
                >
                    + Upload Shipment
                </button> */}
                {/* <Button
                    onClick={() =>
                        navigate("/uploadshipment")
                    }
                    type="button"
                    variant="primary"
                    className="bg-blue-600! text-white hover:bg-blue-700! transition"
                    size="sm"
                >
                    + Upload Shipment
                </Button> */}

                <Button
                onClick={() =>
                        navigate("/uploadshipment")
                    }
                    startIcon={<PackagePlus size={16} />}
                    className="!bg-blue-600 hover:!bg-blue-700"
                >
                    Upload Shipment
                </Button>

            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200">

                <div className="mb-5">

                    <FormGrid cols={5}>

                        <InputField
                            name="saleOrderNo"
                            label="Sales Order"
                            placeholder="Search sales order"
                            control={control}
                        />

                        <DateField
                            name="fromDate"
                            label="From Date"
                            control={control}
                        />

                        <DateField
                            name="toDate"
                            label="To Date"
                            control={control}
                            minDate={fromDate}
                        />

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Status
                            </label>

                            <select
                                {...register("status")}
                                className="
                                    w-full
                                    border border-gray-300
                                    rounded-xl
                                    px-4 py-2.5
                                    text-sm
                                "
                            >
                                <option value="">
                                    All Status
                                </option>

                                <option value="PENDING_HUB_RECEIVE">
                                    Pending Hub Receive
                                </option>

                                <option value="IN_TRANSIT">
                                    In Transit
                                </option>

                                <option value="OUT_FOR_DELIVERY">
                                    Out For Delivery
                                </option>

                                <option value="DELIVERED">
                                    Delivered
                                </option>

                            </select>

                        </div>

                        <div className="flex items-end">
                            <Button
                                type="button"
                                className="w-full mt-6 "
                                onClick={handleSearch}
                            >
                                Search
                            </Button>

                        </div>

                    </FormGrid>

                </div>

                <DataTable
                    data={orders}
                    columns={columns}
                    pageSize={10}
                    pinnedColumns={pinnedColumns}
                    emptyMessage="No orders found"
                    globalSearch={true}
                />

            </div>

        </div>
    );
}