import { useState } from "react";
import ShipmentUploadForm from "./ShipmentUploadForm";
import { useUploadShipment } from "../../queries/useShipment";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function UploadShipment() {

    const [validationErrors, setValidationErrors] =
        useState([]);

    const uploadShipmentMutation =
        useUploadShipment();

    const defaultValues = {
        shipment_date: new Date()
            .toISOString()
            .split("T")[0],
    };

    const navigate = useNavigate();

    const handleSubmit = async (data) => {

        setValidationErrors([]);

        const formData = new FormData();

        formData.append(
            "saleOrderNo",
            data.sales_order_number
        );

        formData.append(
            "shipmentDate",
            data.shipment_date
        );

        formData.append(
            "inboundVehicleNumber",
            data.inbound_vehicle_number
        );

        formData.append(
            "inboundDriverName",
            data.inbound_driver_name
        );

        formData.append(
            "inboundDriverMobile",
            data.inbound_driver_mobile
        );

        formData.append(
            "customerName",
            data.customer_name
        );

        formData.append(
            "deliveryAddress",
            data.delivery_address
        );

        formData.append(
            "contactPerson",
            data.contact_person
        );

        formData.append(
            "contactNumber",
            data.contact_number
        );

        formData.append(
            "file",
            data.file[0]
        );

        try {
            const response =
                await uploadShipmentMutation.mutateAsync(
                    formData
                );
            toast.success("Shipment uploaded successfully");
             navigate("/orders");
        }
        catch (error) {

            console.error(error);

            setValidationErrors([
                error?.response?.data?.message ??
                "Upload failed"
            ]);
        }
    };

    const handleCancel = () => {

        window.history.back();
    };

    return (
        <div className="space-y-4">


            <ShipmentUploadForm
                defaultValues={defaultValues}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isLoading={
                    uploadShipmentMutation.isPending
                }
            />

            {validationErrors.length > 0 && (
                <div className="border border-red-200 bg-red-50 rounded-xl p-4">
                    <h4 className="font-semibold text-red-700 mb-2">
                        Validation Errors
                    </h4>

                    <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
                        {validationErrors.map(
                            (error, index) => (
                                <li key={index}>
                                    {error}
                                </li>
                            )
                        )}
                    </ul>
                </div>
            )}

        </div>
    );
}