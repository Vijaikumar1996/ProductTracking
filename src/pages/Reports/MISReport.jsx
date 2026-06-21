import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import DataTable from "../../components/common/DataTable";
import InputField from "../../components/form/form-input/InputField";
import FormGrid from "../../components/form/FormGrid";

import { useMisReport } from "../../queries/useReport";
import SelectField from "../../components/form/form-input/SelectField";
import Button from "../../components/ui/button/Button";
import DateField from "../../components/form/form-input/DateField";

export default function MISReport() {
    const {
        control,
        getValues,
        watch
    } = useForm({
        defaultValues: {
            saleOrderNo: "",
            status: "",
            mismatchOnly: false,
            fromDate: "",
            toDate: "",
        },
    });


    const [filters, setFilters] = useState(null);
    const fromDate = watch("fromDate");

    const {
        data,
        isLoading,
    } = useMisReport(filters);

    const onSearch = () => {
        setFilters({
            saleOrderNo:
                getValues("saleOrderNo") || null,

            status:
                getValues("status") || null,

            fromDate:
                getValues("fromDate") || null,

            toDate:
                getValues("toDate") || null,

            mismatchOnly:
                getValues("mismatchOnly"),

            pageNumber: 1,
            pageSize: 20,
        });
    };

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
                    <span className="whitespace-nowrap">
                        {new Date(
                            info.getValue()
                        ).toLocaleDateString()}
                    </span>
                ),
            },

            {
                accessorKey: "expectedHuCount",
                header: "Expected",
            },

            {
                accessorKey: "receivedHuCount",
                header: "Received",
                cell: (info) => (
                    <span className="font-medium text-blue-600">
                        {info.getValue()}
                    </span>
                ),
            },

            {
                accessorKey: "loadedHuCount",
                header: "Loaded",
                cell: (info) => (
                    <span className="font-medium text-indigo-600">
                        {info.getValue()}
                    </span>
                ),
            },

            {
                accessorKey: "deliveredHuCount",
                header: "Delivered",
                cell: (info) => (
                    <span className="font-medium text-green-600">
                        {info.getValue()}
                    </span>
                ),
            },

            {
                accessorKey: "hubMissingCount",
                header: "Hub Missing",
                cell: (info) => (
                    <span className="font-medium text-red-600">
                        {info.getValue()}
                    </span>
                ),
            },

            {
                accessorKey: "loadingMissingCount",
                header: "Load Missing",
                cell: (info) => (
                    <span className="font-medium text-red-600">
                        {info.getValue()}
                    </span>
                ),
            },

            {
                accessorKey: "deliveryMissingCount",
                header: "Delivery Missing",
                cell: (info) => (
                    <span className="font-medium text-red-600">
                        {info.getValue()}
                    </span>
                ),
            },

            {
                accessorKey: "totalMissingCount",
                header: "Total Missing",
                cell: (info) => (
                    <span className="font-bold text-red-700">
                        {info.getValue()}
                    </span>
                ),
            },

            {
                accessorKey: "status",
                header: "Status",
                cell: ({ row }) => {
                    const status = row.original.status;

                    const styles = {
                        UPLOADED:
                            "bg-gray-100 text-gray-700",

                        RECEIVED:
                            "bg-blue-100 text-blue-700",

                        LOADED:
                            "bg-indigo-100 text-indigo-700",

                        DELIVERED:
                            "bg-green-100 text-green-700",

                        MISMATCH:
                            "bg-red-100 text-red-700",
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
                                ${styles[status] ??
                                "bg-gray-100 text-gray-700"}
                            `}
                        >
                            {status}
                        </span>
                    );
                },
            },
        ],
        []
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        MIS Report
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Shipment tracking and mismatch analysis
                    </p>
                </div>

                {/* <button
                    className="
                        px-5
                        py-2.5
                        bg-green-600
                        text-white
                        rounded-xl
                        hover:bg-green-700
                        transition
                    "
                >
                    Export Excel
                </button> */}
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200">
                <div className="mb-5">
                    <FormGrid cols={5}>

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

                        <InputField
                            name="saleOrderNo"
                            label="Sales Order"
                            placeholder="Search sales order"
                            control={control}
                        />


                        <SelectField
                            name="status"
                            label="Status"
                            control={control}
                            options={[
                                {
                                    id: "UPLOADED",
                                    name: "Uploaded",
                                },
                                {
                                    id: "RECEIVED",
                                    name: "Received",
                                },
                                {
                                    id: "LOADED",
                                    name: "Loaded",
                                },
                                {
                                    id: "DELIVERED",
                                    name: "Delivered",
                                },
                            ]}
                        />

                        <div className="flex items-end">
                            <Button
                                type="button"
                                className="w-full"
                                onClick={onSearch}

                            >
                                Search
                            </Button>

                        </div>


                    </FormGrid>



                    {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">


                        <div className="flex items-center mt-8">
                            <input
                                type="checkbox"
                                id="mismatchOnly"
                                className="mr-2"
                            />

                            <label htmlFor="mismatchOnly">
                                Mismatch Only
                            </label>
                        </div>

                        <div className="flex items-end">
                           
                        </div>
                    </div> */}
                </div>

                <div className="overflow-x-auto">
                    <DataTable
                        data={data?.data ?? []}
                        columns={columns}
                        pageSize={10}
                        pinnedColumns={pinnedColumns}
                        emptyMessage="No MIS reports found"
                        globalSearch={true}
                    />
                </div>
            </div>
        </div>
    );
}