import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import InputField from "../../components/form/form-input/InputField";
import DateField from "../../components/form/form-input/DateField";
import TextAreaField from "../../components/form/form-input/TextAreaField";
import FileUploadField from "../../components/form/form-input/FileUploadField";
import FormGrid from "../../components/form/FormGrid";
import Button from "../../components/ui/button/Button";

/* ---------------- Schema ---------------- */

const shipmentUploadSchema = z.object({
    sales_order_number: z
        .string()
        .trim()
        .min(1, "Sales order number is required"),

    shipment_date: z
        .string()
        .min(1, "Shipment date is required"),

    inbound_vehicle_number: z
        .string()
        .trim()
        .min(1, "Inbound vehicle number is required"),

    inbound_driver_name: z
        .string()
        .trim()
        .min(1, "Driver name is required"),

    inbound_driver_mobile: z
        .string()
        .trim()
        .min(10, "Driver mobile number is required"),

    customer_name: z
        .string()
        .trim()
        .min(1, "Customer name is required"),

    delivery_address: z
        .string()
        .trim()
        .min(1, "Delivery address is required"),

    contact_person: z
        .string()
        .trim()
        .min(1, "Contact person is required"),

    contact_number: z
        .string()
        .trim()
        .min(10, "Contact number is required"),

    remarks: z.string().optional(),

    file: z.any().refine(
        (files) => files?.length > 0,
        "Shipment file is required"
    ),
});

/* ---------------- Component ---------------- */

export default function ShipmentUploadForm({
    defaultValues,
    onSubmit,
    isLoading,
    onCancel,
}) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(shipmentUploadSchema),
        defaultValues,
    });

    return (
        <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

                {/* Header */}

                <div className="border-b border-gray-200 px-6 py-4">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Upload Shipment
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Upload shipment Excel received from operations team
                    </p>
                </div>

                {/* Form */}

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="px-6 py-4 space-y-4"
                >

                    {/* Shipment Information */}

                    <div className="border border-gray-200 rounded-2xl p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Shipment Information
                        </h3>

                        <FormGrid cols={4}>
                            <InputField
                                name="sales_order_number"
                                label="Sales Order Number"
                                control={control}
                                error={errors.sales_order_number}
                                required
                            />

                            <DateField
                                name="shipment_date"
                                label="Shipment Date"
                                control={control}
                                required
                            />

                            <InputField
                                name="remarks"
                                label="Remarks"
                                control={control}
                                error={errors.remarks}
                                placeholder="Optional remarks"
                            />
                        </FormGrid>
                    </div>

                    {/* Inbound Vehicle Details */}

                    <div className="border border-gray-200 rounded-2xl p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Inbound Vehicle Details
                        </h3>

                        <FormGrid cols={3}>
                            <InputField
                                name="inbound_vehicle_number"
                                label="Inbound Vehicle Number"
                                control={control}
                                error={errors.inbound_vehicle_number}
                                placeholder="TN01AB1234"
                                required
                            />

                            <InputField
                                name="inbound_driver_name"
                                label="Inbound Driver Name"
                                control={control}
                                error={errors.inbound_driver_name}
                                required
                            />

                            <InputField
                                name="inbound_driver_mobile"
                                label="Inbound Driver Mobile"
                                control={control}
                                error={errors.inbound_driver_mobile}
                                required
                            />
                        </FormGrid>
                    </div>

                    {/* Delivery Details */}

                    <div className="border border-gray-200 rounded-2xl p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Delivery Details
                        </h3>

                        <FormGrid cols={4}>
                            <InputField
                                name="customer_name"
                                label="Customer Name"
                                control={control}
                                error={errors.customer_name}
                                required
                            />

                            <InputField
                                name="contact_person"
                                label="Contact Person"
                                control={control}
                                error={errors.contact_person}
                                required
                            />

                            <InputField
                                name="contact_number"
                                label="Contact Number"
                                control={control}
                                error={errors.contact_number}
                                required
                            />

                            <TextAreaField
                                name="delivery_address"
                                label="Delivery Address"
                                control={control}
                                error={errors.delivery_address}
                                placeholder="Enter complete delivery address"
                                required
                                rows={1}
                            />
                        </FormGrid>
                    </div>

                    {/* File Upload */}

                    <FileUploadField
                        name="file"
                        control={control}
                        label="Upload Shipment Excel"
                        error={errors.file}
                        required
                        accept=".xlsx,.xls,.csv"
                        helperText="XLSX, XLS, CSV"
                    />

                    {/* Buttons */}

                    <div className="flex justify-end gap-3 pt-2">

                        <Button
                            type="submit"
                            onClick={onCancel}
                            variant="outline"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading
                                ? "Uploading..."
                                : "Upload Shipment"}
                        </Button>

                    </div>

                </form>
            </div>
        </div>
    );
}