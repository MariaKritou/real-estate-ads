import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardProperty from './CardProperty'; // Update the import path as necessary

describe('CardProperty', () => {
    const mockProperty = {
        title: 'Modern House',
        area: {
            placeId: '949d1u22cbffbrarjh182eig557vnwvfqb9',
            mainText: 'Aristotelous',
            secondaryText: 'Thessaloniki',
        },
        type: 'rent',
        priceDetails: {
            amount: '500',
            isNegotiable: true,
        },
        description: 'A beautiful, modern house located in the heart of Aristotelous. Spacious and well-lit.',
    };

    it('renders property details correctly', () => {
        render(<CardProperty property={mockProperty} />);

        expect(screen.getByText('Modern House')).toBeInTheDocument();
        expect(screen.getByText(/Aristotelous, Thessaloniki/)).toBeInTheDocument();
        expect(screen.getByText('Rent')).toBeInTheDocument();
        expect(screen.getByText('500€')).toBeInTheDocument();
        expect(screen.getByText('negotiable')).toBeInTheDocument();
        expect(screen.getByText(/A beautiful, modern house/)).toBeInTheDocument();
    });

    it('truncates long descriptions correctly', () => {
        const longDescriptionProperty = {
            ...mockProperty,
            description: 'This is a very long description that should be truncated because it exceeds the maximum length set by the truncateText function.',
        };
        render(<CardProperty property={longDescriptionProperty} />);
        expect(screen.getByText(/This is a very long description that should be truncated/)).toBeInTheDocument();
        expect(screen.queryByText(longDescriptionProperty.description)).not.toBeInTheDocument();
    });

    it('renders non-negotiable price details without negotiable chip', () => {
        const nonNegotiableProperty = {
            ...mockProperty,
            priceDetails: {
                ...mockProperty.priceDetails,
                isNegotiable: false,
            },
        };
        render(<CardProperty property={nonNegotiableProperty} />);
        expect(screen.queryByText('negotiable')).not.toBeInTheDocument();
    });

    // If there are specific interactions to test, like clicking the Save or Contact buttons,
    // you can test those interactions here. For example:
    it('calls appropriate action on save button click', async () => {
        render(<CardProperty property={mockProperty} />);
        // Assuming you want to test the Save button's onClick functionality, you would first need to mock it
        // For demonstration, let's simulate a user clicking the Save button
        const saveButton = screen.getByRole('button', { name: 'Save' });
        await userEvent.click(saveButton);

        // Verify the expected outcome, such as a function call or state change.
        // This might require you to mock and pass in functions as props to CardProperty, or to observe changes in your app's state or UI.
    });
});
