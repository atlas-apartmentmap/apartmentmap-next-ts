// src/components/map-side-panel/map-side-panel.tsx
import React from 'react';
import { Box, Typography, Button, Stack, Accordion, AccordionSummary, AccordionDetails, ListItemButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { apartments } from '@/assets/data/apartments';

interface MapSidePanelProps {
  onToggleLandVisibility: () => void;
  setHoveredBuilding: (building: string | null) => void;
}

const MapSidePanel: React.FC<MapSidePanelProps> = ({ onToggleLandVisibility, setHoveredBuilding }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Map Side Panel
      </Typography>
      <Stack spacing={2}>
        <Button variant="contained" color="primary" onClick={onToggleLandVisibility}>
          Toggle Land Visibility
        </Button>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Available Apartments</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ width: '100%' }}>
              {apartments.map((apartment) => (
                <a
                  key={apartment.code}
                  href={`/3DViewer?building=${encodeURIComponent(apartment.label)}`}
                  style={{ textDecoration: 'none' }}
                >
                  <ListItemButton
                    onMouseEnter={() => setHoveredBuilding(normalizeName(apartment.label))}
                    onMouseLeave={() => setHoveredBuilding(null)}
                  >
                    <Box>
                      <Typography variant="subtitle1">{apartment.label}</Typography>
                      <Typography variant="body2">{apartment.address}</Typography>
                      <Typography variant="body2">{apartment.postcode}</Typography>
                    </Box>
                  </ListItemButton>
                </a>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Box>
  );
};

// Function to normalize names
const normalizeName = (name: string) => name.replace(/\s+/g, '').toLowerCase();

export default MapSidePanel;
