import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Chip, Stack } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import ContactPhoneIcon from '@mui/icons-material/ContactPhoneOutlined';
import SaveIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { capitalize } from 'lodash';
import './CardStyle.css'

/**
 * Card component for displaying property information
 * We use the same image for all cards for design purposes
 * The card action button are not working , they are also just for design purposes
 * @param {object} property - property object with relevant information
 * @returns {JSX.Element} Card component with property information
 */
export default function CardProperty({ property }) {

  /**
   * Truncates text to a specified length with an ellipsis
   * Otherwise cards would be too long
   * @param {string} text - text to be truncated
   * @param {number} maxLength - maximum length of truncated text
   * @returns {string} truncated text
   */
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <Card className="cardRoot">
      <CardMedia
        component="img"
        alt="modern house"
        height="140"
        image="https://coralhomes.com.au/wp-content/uploads/Atlanta-Series.png"
      />
      <div className="cardContentContainer">
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            {property.title}
          </Typography>
          <Box display="flex" alignItems="center">
            <LocationOnIcon fontSize="small" className="iconSpacing" />
            <Typography variant="body2" color="text.secondary">
              {property.area.mainText + ', ' + property.area.secondaryText}
            </Typography>
          </Box>
          <Stack mt={2} direction={'row'} justifyContent={'space-between'} alignItems="center" spacing={1}>
            <Box display="flex" alignItems="center">
              <HomeIcon fontSize="small" className="iconSpacing" />
              <Typography variant="body2" color="text.secondary">
                {capitalize(property.type)}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">

              <Typography variant="body2" color="text.secondary">
                {property.priceDetails.amount}€
              </Typography>
              {property.priceDetails.isNegotiable && (
                <Chip label="negotiable" size="small" color="success" sx={{ ml: 1 }} />
              )}
            </Box>
          </Stack>
          <Typography variant="body2" mt={1}>
            {truncateText(property.description, 100)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button startIcon={<SaveIcon />} size="small">Save</Button>
          <Button startIcon={<ContactPhoneIcon />} size="small">Contact</Button>
        </CardActions>
      </div>
    </Card>
  );
}
