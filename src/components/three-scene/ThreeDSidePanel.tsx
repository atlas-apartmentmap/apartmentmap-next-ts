import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Stack, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, IconButton } from '@mui/material';
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
  setHoveredStack: (stackNumber: string | null) => void;
  setSelectedStack: (stackNumber: string | null) => void;
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
  setHoveredStack,
  setSelectedStack,
}) => {
  const { addProperty, starredProperties, removeProperty } = useStarredProperties();
  const [selectedStack, setStackSelection] = useState<string | null>(null); // Local stack selection state

  useEffect(() => {
    if (!selectedModel) {
      onModelChange('spire.glb');
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
        selectedFloorPlan,
      };
      addProperty(property);
    } else if (uniqueKey && isPropertyStarred) {
      removeProperty(uniqueKey);
    }
  };

  const handleFloorPlanChange = (event: SelectChangeEvent<string>) => {
    onFloorPlanChange(event.target.value);
  };

  const handleModelChange = (event: SelectChangeEvent<string>) => {
    onModelChange(event.target.value);
    setOverviewMode(true);
  };

  const handleStackChange = (event: SelectChangeEvent<string>) => {
    const stackNumber = event.target.value;
    setStackSelection(stackNumber);
    setSelectedStack(stackNumber);  // Update parent component's selected stack state
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
        <Stack spacing={2} direction="row" alignItems="center">
          <IconButton color="primary" onClick={handleStarClick}>
            {isPropertyStarred ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        </Stack>
      </Stack>

      {/* Model Selection */}
      <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
        <InputLabel id="model-select-label">Select Model</InputLabel>
        <Select
          labelId="model-select-label"
          value={selectedModel || 'spire.glb'}
          onChange={handleModelChange}
          label="Select Model"
          onClose={() => setOverviewMode(true)}
        >
          <MenuItem value="skytower.glb">Sky Tower</MenuItem>
          <MenuItem value="spire.glb">Spire</MenuItem>
          <MenuItem value="festival.glb">Festival</MenuItem>
        </Select>
      </FormControl>

      {selectedObjectName && !overviewMode ? (
        <>
          {/* Stack Selection */}
          <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
            <InputLabel id="stack-select-label">Select Stack</InputLabel>
            <Select
              labelId="stack-select-label"
              value={selectedStack ?? ''}
              onChange={handleStackChange}
              label="Select Stack"
              onMouseEnter={(event) => setHoveredStack((event.target as HTMLInputElement).value)}
              onMouseLeave={() => setHoveredStack(null)}
            >
              {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'].map((stackNumber) => (
                <MenuItem key={stackNumber} value={stackNumber}>
                  Stack {stackNumber}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Display Floor Plan based on selected stack */}
          {selectedStack && (
            <Box sx={{ mt: 2 }}>
              <img 
                src={`/assets/floorplans/spire/plan_${selectedStack}.jpg`} 
                alt={`Floor Plan for Stack ${selectedStack}`} 
                style={{ width: '100%' }} 
              />
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
