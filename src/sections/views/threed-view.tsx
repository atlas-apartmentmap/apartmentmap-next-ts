'use client';

import { useEffect } from 'react';

import { useBoolean } from '@/hooks/use-boolean';
import ThreeScene from '../landing/threed-page';
import { Box } from '@mui/system';

// ----------------------------------------------------------------------

export default function ThreeDView() {
  const loading = useBoolean(true);

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      loading.onFalse();
    };
    fakeLoading();
  }, [loading]);

  return (
    <Box sx={{ position: 'relative' }}>
    <ThreeScene />
  </Box>
  );
}
