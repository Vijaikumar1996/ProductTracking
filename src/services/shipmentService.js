import apiClient from "../services/apiClient";

/* ---------------- Upload Shipment ---------------- */

export const uploadShipment = async (formData) => {
    const res = await apiClient.post(
        "/SaleOrder/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return res.data;
};

/* ---------------- Get Shipments ---------------- */

export const getShipments = async (filters) => {

    const res = await apiClient.get(
        "/SaleOrder",
        {
            params: {
                saleOrderNo:
                    filters?.saleOrderNo,

                fromDate:
                    filters?.fromDate,

                toDate:
                    filters?.toDate,

                status:
                    filters?.status,
            },
        }
    );

    return res.data;
};

/* ---------------- Get Shipment By Id ---------------- */

export const getShipmentById = async (id) => {
    const res = await apiClient.get(`/SaleOrder/${id}`);

    return res.data;
};