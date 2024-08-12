"use client";

import React, { useState } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, ListItemSecondaryAction, Divider } from '@mui/material';
import { useStarredProperties } from '@/context/StarredPropertiesContext';

const MyPropertiesView: React.FC = () => {
  const { starredProperties, removeProperty } = useStarredProperties();
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  const handleToggleFloorPlans = (propertyKey: string) => {
    if (selectedProperty === propertyKey) {
      setSelectedProperty(null); // Deselect if the same property is clicked again
    } else {
      setSelectedProperty(propertyKey); // Set the selected property
    }
  };

  const handleRemoveProperty = (propertyKey: string) => {
    removeProperty(propertyKey);
    if (selectedProperty === propertyKey) {
      setSelectedProperty(null); // Clear the displayed floor plan if the removed property is currently selected
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        My Starred Properties
      </Typography>
      {starredProperties.length === 0 ? (
        <Typography variant="body1">You haven't starred any properties yet.</Typography>
      ) : (
        <List>
          {starredProperties.map((property) => (
            <React.Fragment key={property.name}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={property.name.split('-')[0]} // Display object name without floor plan
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="textPrimary">
                        {property.details}
                      </Typography>
                      <br />
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{ mt: 1 }}
                        onClick={() => handleToggleFloorPlans(property.name)}
                      >
                        {selectedProperty === property.name ? 'Hide Floor Plans' : 'View Floor Plans'}
                      </Button>
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <Button variant="contained" color="secondary" onClick={() => handleRemoveProperty(property.name)}>
                    Remove
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
              {selectedProperty === property.name && property.selectedFloorPlan && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Selected Floor Plan:
                  </Typography>
                  <img src={property.selectedFloorPlan} alt="Selected Floor Plan" style={{ width: '100%' }} />
                </Box>
              )}
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default MyPropertiesView;
