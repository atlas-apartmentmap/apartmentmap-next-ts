import React, { useEffect } from 'react';
import { Box, Button, Typography, IconButton, Stack, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { useStarredProperties } from '@/context/StarredPropertiesContext';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface ThreeDSidePanelProps {
  selectedObjectName: string | null;
  floorPlans: string[];
  selectedFloorPlan: string | null;
  onFloorPlanChange: (floorPlan: string | null) => void;
  overviewMode: boolean;
  setOverviewMode: (mode: boolean) => void;
  toggleSplitView: () => void;
  isSplitView: boolean;
}

const ThreeDSidePanel: React.FC<ThreeDSidePanelProps> = ({
  selectedObjectName,
  floorPlans,
  selectedFloorPlan,
  onFloorPlanChange,
  overviewMode,
  setOverviewMode,
  toggleSplitView,
  isSplitView,
}) => {
  const { addProperty, starredProperties, removeProperty } = useStarredProperties();

  const uniqueKey = selectedObjectName && selectedFloorPlan ? `${selectedObjectName}-${selectedFloorPlan}` : null;

  const isPropertyStarred = uniqueKey
    ? starredProperties.some((property) => property.name === uniqueKey)
    : false;

  const handleStarClick = () => {
    if (uniqueKey && !isPropertyStarred) {
      const property = {
        name: uniqueKey,
        floorPlans,
        details: `Details about ${selectedObjectName}`,
        selectedFloorPlan, // Save the current selected floor plan
      };
      addProperty(property);
    } else if (uniqueKey && isPropertyStarred) {
      removeProperty(uniqueKey); // Unstar the property if it's already starred
    }
  };

  const handleFloorPlanChange = (event: SelectChangeEvent<string>) => {
    onFloorPlanChange(event.target.value);
  };

  // Reset the star icon when floor plan is changed
  useEffect(() => {
    if (uniqueKey && isPropertyStarred) {
      removeProperty(uniqueKey); // Remove the starred status when floor plan changes
    }
  }, [selectedFloorPlan]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        3D Viewer
      </Typography>
      <Stack spacing={2} direction="row">
        <Button variant="contained" color="primary" onClick={toggleSplitView}>
          {isSplitView ? 'Close Split View' : 'Split View'}
        </Button>
        <Button variant="contained" color="secondary" onClick={() => setOverviewMode(true)}>
          Overview
        </Button>
      </Stack>

      {selectedObjectName && !overviewMode ? (
        <>
          <Typography variant="h6" gutterBottom>
            Selected Object: {selectedObjectName}
          </Typography>
          <Stack spacing={2} direction="row" alignItems="center">
            <IconButton
              color="primary"
              onClick={handleStarClick}
            >
              {isPropertyStarred ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
          </Stack>
          <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
            <InputLabel id="floor-plan-select-label">Floor Plan</InputLabel>
            <Select
              labelId="floor-plan-select-label"
              value={selectedFloorPlan ?? ''}
              onChange={handleFloorPlanChange}
              label="Floor Plan"
            >
              {floorPlans.map((plan, index) => (
                <MenuItem key={index} value={plan}>
                  Floor Plan {index + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedFloorPlan && (
            <Box sx={{ mt: 2 }}>
              <img src={selectedFloorPlan} alt="Selected Floor Plan" style={{ width: '100%' }} />
            </Box>
          )}
        </>
      ) : (
        overviewMode && (
          <Box sx={{ mt: 2 }}>
            <img src={`/assets/floorplate/sky-tower/SkyTowerOverview.jpg`} alt="Sky Tower Overview" style={{ width: '100%' }} />
          </Box>
        )
      )}
    </Box>
  );
};

export default ThreeDSidePanel;
