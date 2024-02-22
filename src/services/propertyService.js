import apiClient from "./apiService";

// Reusable API request function
const makeApiRequest = async (method, url, data = null) => {
    const response = await apiClient[method](url, data);
    return response.data;
};

// Service functions
const fetchProperties = () => {
    return makeApiRequest('get', '/properties');
};

const addProperty = (data) => {
    return makeApiRequest('post', '/properties', data);
};

const fetchLocations = (query) => {
    const url = `/properties/locations?search=${encodeURIComponent(query)}`;
    return makeApiRequest('get', url);
};

export const propertyService = {
    fetchProperties,
    addProperty,
    fetchLocations,
};