import React from 'react';
import Button from '@mui/material/Button';

interface SplitViewButtonProps {
  onClick: () => void;
}

const SplitViewButton: React.FC<SplitViewButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      size="large"
      color="primary"
      style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}
      onClick={onClick}
    >
      Split View
    </Button>
  );
};

export default SplitViewButton;
