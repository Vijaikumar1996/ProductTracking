import { useQuery } from "@tanstack/react-query";
import { getMisReport } from "../services/reportService";

export const useMisReport = (filters) => {
    return useQuery({
        queryKey: ["mis-report", filters],
        queryFn: () => getMisReport(filters),
        enabled: !!filters,
    });
};