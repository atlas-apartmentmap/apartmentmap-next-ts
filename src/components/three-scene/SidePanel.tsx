import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuItem from '@mui/material/MenuItem';

interface SidePanelProps {
  objectName: string | null;
  floorPlans: string[];
}

const SidePanel: React.FC<SidePanelProps> = ({ objectName, floorPlans }) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  if (!objectName) {
    return null;
  }

  return (
    <Box
      position="absolute"
      top={0}
      right={0}
      width="30%"
      height="100%"
      bgcolor="#333"
      color="white"
      p={2}
      boxSizing="border-box"
    >
      <Typography variant="h5">{objectName}</Typography>
      <Typography>Additional information about {objectName}</Typography>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Floor Plans</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {floorPlans.map((plan, index) => (
            <MenuItem key={index} component="a" href={`/assets/${plan}`} target="_blank" rel="noopener noreferrer">
              {plan}
            </MenuItem>
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default SidePanel;
