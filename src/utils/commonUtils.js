// src/utils/dateUtils.js

export const formatDate = (date) => {
    if (!date) return "";
    return date.includes("T") ? date.split("T")[0] : date;
};