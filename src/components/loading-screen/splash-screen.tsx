import { m } from 'framer-motion';

import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

import { bgBlur } from '@/theme/css';

import Logo from '../logo';

// ----------------------------------------------------------------------

export default function SplashScreen({ sx, ...other }: BoxProps) {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          ...bgBlur({
            blur: 2,
            opacity: 0.24,
            color: theme.palette.background.default,
          }),
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          zIndex: 9999,
          display: 'flex',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          ...sx,
        }}
        {...other}
      >
        <m.div
          animate={{
            scale: [1, 0.96, 1, 0.96, 1],
            opacity: [1, 0.48, 1, 0.48, 1],
          }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeatDelay: 1,
            repeat: Infinity,
          }}
        >
          <Logo single sx={{ width: 300, height: 120 }} />
        </m.div>
      </Box>

      <Box sx={{ width: 1, height: '100vh' }} />
    </>
  );
}
