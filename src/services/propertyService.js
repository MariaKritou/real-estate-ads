import apiClient from "./apiService";

const addProperty = async (data) => {
    const response = await apiClient.post('/properties', data);
    return response.data;
};

const fetchLocations = async (query) => {
    const response = await apiClient.get(`/properties/locations?search=${encodeURIComponent(query)}`);
    return response.data;
};

export const propertyService = {
    addProperty,
    fetchLocations,
};