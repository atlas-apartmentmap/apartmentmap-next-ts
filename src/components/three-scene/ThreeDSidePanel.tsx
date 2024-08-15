import React, { useEffect } from 'react';
import { Box, Button, Typography, IconButton, Stack, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
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
  selectedModel: string | null;
  onModelChange: (model: string) => void;
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
  selectedModel,
  onModelChange,
}) => {
  const { addProperty, starredProperties, removeProperty } = useStarredProperties();

  // Default to "Sky Tower" if no model is selected
  useEffect(() => {
    if (!selectedModel) {
      onModelChange('skytower.glb');
    }
  }, [selectedModel, onModelChange]);

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

  const handleModelChange = (event: SelectChangeEvent<string>) => {
    onModelChange(event.target.value);
    setOverviewMode(true); // Set to overview mode when the model changes
  };

  return (
    <Box sx={{ p: 2 }}>
      <Stack spacing={2} direction="row">
        <Button variant="contained" color="primary" onClick={toggleSplitView}>
          {isSplitView ? 'Close Split View' : 'Split View'}
        </Button>
        <Button variant="contained" color="secondary" onClick={() => setOverviewMode(true)}>
          Overview
        </Button>
      </Stack>
      
      <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
        <InputLabel id="model-select-label">Select Model</InputLabel>
        <Select
          labelId="model-select-label"
          value={selectedModel || 'skytower.glb'}  // Default to "Sky Tower"
          onChange={handleModelChange}
          label="Select Model"
          onClose={() => setOverviewMode(true)} // Close the dropdown when a selection is made
        >
          <MenuItem value="skytower.glb">Sky Tower</MenuItem>
          <MenuItem value="spire.glb">Spire</MenuItem>
          <MenuItem value="festival.glb">Festival</MenuItem>
        </Select>
      </FormControl>

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
        overviewMode && selectedModel && (
          <Box sx={{ mt: 2 }}>
            <img src={`/assets/floorplate/${selectedModel.replace('.glb', '')}.jpg`} alt="Model Overview" style={{ width: '100%' }} />
          </Box>
        )
      )}
    </Box>
  );
};

export default ThreeDSidePanel;
