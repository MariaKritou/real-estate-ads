import React, { useState } from 'react';
import { TextField, MenuItem, Button, Container, FormControlLabel, Checkbox, Grid } from '@mui/material';
import _ from 'lodash';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AutocompleteDropdown from '../../components/autocomplete/AutocompleteDropdown';

function AddProperty() {
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        price: '',
        isNegotiable: false,
        description: '',
        availableFrom: null,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleDateChange = (newValue) => {
        setFormData({ ...formData, availableFrom: newValue });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Perform validation and submission logic here
    };

    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    required
                    label="Title"
                    variant="outlined"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    inputProps={{ maxLength: 155 }}
                    margin="normal"
                />
                                <AutocompleteDropdown/>

                <Grid container  justifyContent={'space-between'}>
                    <Grid item xs={6}>
                        <TextField
                            select
                            required
                            fullWidth
                            margin="normal"
                            label="Type"
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                        >
                            {['buy', 'rent', 'exchange', 'donation'].map((option) => (
                                <MenuItem key={option} value={option}>
                                    {_.capitalize(option)}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Available From"
                                inputFormat="MM/DD/YYYY"
                                fullWidth
                                sx={{ mt: 2, mb: 2 }}
                                value={formData.availableFrom}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params}/>}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={8}>
                        <TextField
                            fullWidth
                            required
                            label="Price"
                            variant="outlined"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            margin="normal"
                            onKeyDown={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
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
