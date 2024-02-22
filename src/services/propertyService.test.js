import { propertyService } from './propertyService';
import apiClient from './apiService';
jest.mock('./apiService'); // Mock the apiClient

describe('propertyService', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetchProperties makes a GET request and returns data', async () => {
    const mockData = { properties: [] };
    apiClient.get.mockResolvedValue({ data: mockData });

    const data = await propertyService.fetchProperties();

    expect(apiClient.get).toHaveBeenCalledWith('/properties', null);
    expect(data).toEqual(mockData);
  });

  it('addProperty makes a POST request with data and returns response data', async () => {
    const postData = { title: 'New Property' };
    const mockData = { id: '123', ...postData };
    apiClient.post.mockResolvedValue({ data: mockData });

    const data = await propertyService.addProperty(postData);

    expect(apiClient.post).toHaveBeenCalledWith('/properties', postData);
    expect(data).toEqual(mockData);
  });

  it('fetchLocations makes a GET request with query and returns data', async () => {
    const query = 'thessaloniki';
    const mockData = { locations: [] };
    const encodedQuery = encodeURIComponent(query);
    apiClient.get.mockResolvedValue({ data: mockData });

    const data = await propertyService.fetchLocations(query);

    expect(apiClient.get).toHaveBeenCalledWith(`/properties/locations?search=${encodedQuery}`, null);
    expect(data).toEqual(mockData);
  });
});
