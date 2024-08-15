import React from 'react';
import { Box, Typography, Button, Stack, Accordion, AccordionSummary, AccordionDetails, ListItemButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { apartments } from '@/assets/data/apartments';
import { useModelContext } from '@/context/ModelContext'; // Import the ModelContext

interface MapSidePanelProps {
  onToggleLandVisibility: () => void;
  setHoveredBuilding: (building: string | null) => void;
}

const MapSidePanel: React.FC<MapSidePanelProps> = ({ onToggleLandVisibility, setHoveredBuilding }) => {
  const { setSelectedModel } = useModelContext(); // Use the context to set the selected model

  const handleModelSelect = (building: string) => {
    const normalizedBuilding = normalizeName(building);
    if (normalizedBuilding === 'skytower') {
      setSelectedModel('skytower.glb');
    } else if (normalizedBuilding === 'spire') {
      setSelectedModel('spire.glb');
    }
      else if(normalizedBuilding === 'festival') {
        setSelectedModel('festival.glb');
      }
  };

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
                <ListItemButton
                  key={apartment.code}
                  onMouseEnter={() => setHoveredBuilding(normalizeName(apartment.label))}
                  onMouseLeave={() => setHoveredBuilding(null)}
                  href="/3DViewer" // Use href to navigate to the 3DViewer page
                  onClick={() => handleModelSelect(apartment.label)} // Update the context before navigation
                  component="a" // Make ListItemButton behave like a link
                  style={{ textDecoration: 'none' }}
                >
                  <Box>
                    <Typography variant="subtitle1">{apartment.label}</Typography>
                    <Typography variant="body2">{apartment.address}</Typography>
                    <Typography variant="body2">{apartment.postcode}</Typography>
                  </Box>
                </ListItemButton>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Box>
  );
};

// Function to normalize names for matching with 3D models
const normalizeName = (name: string) => {
  const lowerName = name.toLowerCase();

  if (lowerName.includes('spire residences')) return 'spire';
  if (lowerName.includes('sky tower')) return 'skytower';
  if (lowerName.includes('festival towers')) return 'festival';
  // Add more custom mappings as needed

  return lowerName.replace(/\s+/g, '');
};

export default MapSidePanel;
