import React, { useState } from 'react';
import { TextField, MenuItem, Button, Container, FormControlLabel, Checkbox, Grid, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AutocompleteDropdown from '../../components/autocomplete/AutocompleteDropdown';
import { useDispatch } from 'react-redux';
import { capitalize } from 'lodash';
import { addPropertyRequest } from '../properties/propertiesSlice';
import { propertyService } from '../../services/propertyService';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function AddProperty() {
    const dispatch = useDispatch();
    const [area, setArea] = useState(null)
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        amount: '',
        isNegotiable: false,
        description: '',
        availableFrom: null,
    });
    const [formErrors, setFormErrors] = useState({});

    const validate = () => {
        let errors = {};
        let isValid = true;

        if (!formData.title) errors.title = 'Title is required!';
        if (formData.title && formData.title.length > 155) errors.title = 'Title length too big!';
        if (!area) errors.area = 'Location is required!';
        if (!formData.type) errors.type = 'Type is required!';
        if (!formData.amount) errors.amount = 'Price is required!';
        if (formData.amount && !/^[0-9]+$/.test(formData.amount)) errors.amount = 'Only numbers are allowed!';
        if (formData.availableFrom && new Date(formData.availableFrom).getTime() < new Date().getTime()) errors.availableFrom = 'Cannot select past date!';

        setFormErrors(errors);

        Object.keys(errors).forEach((key) => {
            if (errors[key]) isValid = false;
        });

        return isValid;
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        // Check if the input change is for the 'amount' field and if the value is numeric
        if (name === 'amount') {
            const isNumeric = /^[0-9]*$/.test(value); // Regex to match only numbers
            if (isNumeric || value === '') { // Allow numbers or an empty string to clear the field
                setFormData({
                    ...formData,
                    [name]: value,
                });
            }
        } else {
            setFormData({
                ...formData,
                [name]: type === 'checkbox' ? checked : value,
            });
        }
        setFormErrors({ ...formErrors, [name]: '' });
    };

    const handleDateChange = (newValue) => {
        setFormData({ ...formData, availableFrom: newValue });
        setFormErrors({ ...formErrors, availableFrom: '' });
    };

    const handleOptionSelect = (option) => {
        setArea(option);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return; // Prevent submission if validation fails

        const propertyData = {
            title: formData.title,
            type: formData.type,
            priceDetails: {
                amount: Number(formData.amount),
                isNegotiable: formData.isNegotiable,
            },
            description: formData.description,
            availableFrom: formData.availableFrom,
            area,
        };

        dispatch(addPropertyRequest(propertyData));
    };

    const renderLocationOptions = (props, option) => (
        <li {...props}>
            <Grid container alignItems="center">
                <Grid item sx={{ display: 'flex', width: 44 }}>
                    <LocationOnIcon sx={{ color: 'text.secondary' }} />
                </Grid>
                <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                    <Typography variant="body2">
                        {option.mainText}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {option.secondaryText}
                    </Typography>
                </Grid>
            </Grid>
        </li>
    );

    const getLocationOptionLabel = (option) => (option.mainText + ", " + option.secondaryText) || '';


    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Title*"
                    variant="outlined"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    inputProps={{ maxLength: 155 }}
                    margin="normal"
                    error={!!formErrors.title}
                    helperText={formErrors.title}
                />
                <AutocompleteDropdown
                    fetchOptions={propertyService.fetchLocations}
                    renderOption={renderLocationOptions}
                    getOptionLabel={getLocationOptionLabel}
                    onOptionSelect={handleOptionSelect}
                    autocompleteError={!!formErrors.area}
                    autocompleteErrorText={formErrors.area}
                />
                <Grid container justifyContent={'space-between'}>
                    <Grid item xs={6}>
                        <TextField
                            select
                            fullWidth
                            margin="normal"
                            label="Type*"
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            error={!!formErrors.type}
                            helperText={formErrors.type}
                        >
                            {['buy', 'rent', 'exchange', 'donation'].map((option) => (
                                <MenuItem key={option} value={option}>
                                    {capitalize(option)}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Available From"
                                inputFormat="MM/DD/YYYY"
                                disablePast
                                fullWidth
                                sx={{ mt: 2, mb: 2 }}
                                value={formData.availableFrom}
                                onChange={handleDateChange}
                                slotProps={{
                                    textField: {
                                        error: !!formErrors.availableFrom,
                                        helperText: formErrors.availableFrom,
                                    },
                                }}

                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={8}>
                        <TextField
                            fullWidth
                            label="Price*"
                            variant="outlined"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            margin="normal"
                            error={!!formErrors.amount}
                            helperText={formErrors.amount}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.isNegotiable}
                                    onChange={handleInputChange}
                                    name="isNegotiable"
                                />
                            }
                            label="Negotiable"
                        />
                    </Grid>
                </Grid>
                <TextField
                    fullWidth
                    label="Description"
                    variant="outlined"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    multiline
                    minRows={3}
                    margin="normal"
                />
                <Button type="submit" variant="contained" sx={{ mt: 3 }}>
                    Submit
                </Button>
            </form>
        </Container>
    );
}
export default AddProperty;
