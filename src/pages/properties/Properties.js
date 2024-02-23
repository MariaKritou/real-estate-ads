import Grid from '@mui/material/Grid';
import CardProperty from '../../components/cardProperty/CardProperty';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPropertiesRequest, propertiesSliceSelector } from './propertiesSlice';

/**
 * Renders the properties list
 */
function Properties() {
    const dispatch = useDispatch();
    const { properties } = useSelector(propertiesSliceSelector);

    /**
       * Runs the fetch properties request action if the properties list is empty
       */
    useEffect(() => {
        properties.length === 0 && dispatch(fetchPropertiesRequest())
    }, [dispatch, properties])

    /**
       * Renders the property cards
       */
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