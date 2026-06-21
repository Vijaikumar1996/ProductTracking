import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    uploadShipment,
    getShipments,
    getShipmentById,
} from "../services/shipmentService";

/* ---------------- Get Shipments ---------------- */

export const useShipments = (filters) => {
    return useQuery({
        queryKey: ["shipments", filters],
        queryFn: () => getShipments(filters),
    });
};
/* ---------------- Get Shipment By Id ---------------- */

export const useShipment = (id) => {
    return useQuery({
        queryKey: ["shipment", id],
        queryFn: () => getShipmentById(id),
        enabled: !!id,
    });
};

/* ---------------- Upload Shipment ---------------- */

export const useUploadShipment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: uploadShipment,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["shipments"],
            });
        },
    });
};