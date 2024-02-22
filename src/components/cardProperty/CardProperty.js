import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Stack } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // For location icon
import HomeIcon from '@mui/icons-material/Home'; // For property type icon
import ContactPhoneIcon from '@mui/icons-material/ContactPhoneOutlined'; // For property type icon
import SaveIcon from '@mui/icons-material/FavoriteBorderOutlined'; // For property type icon
import { capitalize } from 'lodash';
import './CardStyle.css'

export default function CardProperty({ property }) {

  // Function to truncate text
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
          <LocationOnIcon fontSize="small" className="iconSpacing"/>
          <Typography variant="body2" color="text.secondary">
            {property.area.mainText + ', ' + property.area.secondaryText} {/* Assuming location is available */}
          </Typography>
        </Box>
        <Stack mt={2} direction={'row'} justifyContent={'space-between'} alignItems="center" spacing={1}>
          <Box display="flex" alignItems="center">
            <HomeIcon fontSize="small" className="iconSpacing" />
            <Typography variant="body2" color="text.secondary">
              {capitalize(property.type)}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {property.priceDetails.amount}€
          </Typography>
        </Stack>
        <Typography variant="body2" mt={1}>
          {truncateText(property.description, 100)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button startIcon={<SaveIcon />} size="small">Save</Button> {/* Assuming SaveIcon is imported */}
        <Button startIcon={<ContactPhoneIcon />} size="small">Contact</Button> {/* Assuming ContactPhoneIcon is imported */}
      </CardActions>
      </div>
    </Card>
  );
}
