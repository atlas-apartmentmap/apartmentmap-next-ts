import React from 'react';
import Box from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';

interface ObjectInfoBoxProps {
  objectName: string | null;
}

const ObjectInfoBox: React.FC<ObjectInfoBoxProps> = ({ objectName }) => {
  const theme = useTheme();

  if (!objectName) {
    return null;
  }

  return (
    <Box
      position="absolute"
      top={60}
      left={150}
      bgcolor={alpha(theme.palette.background.paper, 0.7)}
      color={theme.palette.text.primary}
      p={1}
      borderRadius={1}
      zIndex="tooltip"
    >
      {objectName}
    </Box>
  );
};

export default ObjectInfoBox;
