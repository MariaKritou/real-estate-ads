import Grid from '@mui/material/Grid';
import CardProperty from '../../components/cardProperty/CardProperty';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPropertiesRequest, propertiesSliceSelector } from './propertiesSlice';

function Properties() {
    const dispatch = useDispatch();
    const { properties } = useSelector(propertiesSliceSelector);

    useEffect(() => {
        properties.length === 0 && dispatch(fetchPropertiesRequest())
    }, [dispatch, properties])

    const renderPropertyCards = () => {
        return properties.map((property) => (
            <Grid key={property?._id} item>
                <CardProperty property={property} />
            </Grid>
        ))
    }

    return (
        <Grid>
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={3}>
                    {renderPropertyCards()}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Properties;