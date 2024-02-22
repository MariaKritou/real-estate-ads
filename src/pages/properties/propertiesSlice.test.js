import propertiesReducer, { setProperties, addProperty, propertiesSliceSelector, initialState } from './propertiesSlice';

describe('propertiesSlice', () => {
    it('should return the initial state', () => {
        expect(propertiesReducer(undefined, {})).toEqual(initialState);
    });

    it('setProperties should update the properties array', () => {
        const previousState = { properties: [] };
        const newProperties = [{ id: '1', title: 'Property 1', price: 500 }];
        expect(propertiesReducer(previousState, setProperties(newProperties))).toEqual({ properties: newProperties });
    });

    it('addProperty should add a property to the properties array', () => {
        const previousState = { properties: [{ id: '1', title: 'Property 1',  price: 500 }] };
        const newProperty = { id: '2', title: 'Property 2', price: 200 };
        expect(propertiesReducer(previousState, addProperty(newProperty))).toEqual({
            properties: [...previousState.properties, newProperty],
        });
    });

    it('propertiesSliceSelector should return the properties slice of the state', () => {
        const mockState = { propertiesState: initialState };
        expect(propertiesSliceSelector(mockState)).toEqual(initialState);
    });
});
