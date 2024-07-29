import { useEffect } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { alpha, useTheme } from "@mui/material/styles";

import Image from "@/components/image";

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <HeroSection />
    </Box>
  );
}

// ----------------------------------------------------------------------

function HeroSection() {
  const theme = useTheme();

  const renderOverlay = (
    <Box
      sx={{
        background: `linear-gradient(to bottom, ${alpha(theme.palette.common.black, 0)} 0%, ${theme.palette.common.black} 75%)`,
        top: 0,
        left: 0,
        zIndex: 8,
        width: 1,
        height: 1,
        position: "absolute",
      }}
    />
  );

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "common.white",
      }}
    >
      <Stack
        spacing={5}
        sx={{
          zIndex: 9,
          position: "relative",
          maxWidth: 480,
          padding: { xs: 2, md: 0 },
        }}
      >
        <Typography variant="h2">Welcome to My Website</Typography>
        <Typography variant="h6">
          Discover amazing content and stay updated with the latest trends.
        </Typography>
        <Button variant="contained" size="large" color="primary">
          Get Started
        </Button>
      </Stack>
      <Box
        sx={{
          width: 1,
          height: 1,
          position: "absolute",
        }}
      >
        {renderOverlay}
        <Image
          alt="hero"
          src="https://source.unsplash.com/random"
          sx={{
            width: 1,
            height: "100vh",
          }}
        />
      </Box>
    </Box>
  );
}
