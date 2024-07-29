import { memo } from "react";

import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";

import { RouterLink } from "@/routes/components";

// ----------------------------------------------------------------------

interface LogoProps extends BoxProps {
  single?: boolean;
}

function Logo({ single = false, width = 160, height = 40, sx }: LogoProps) {
  const theme = useTheme();

  return (
    <Link
      component={RouterLink}
      href="/"
      color="inherit"
      aria-label="go to homepage"
      sx={{ lineHeight: 0 }}
    >
      <Box
        sx={{
          width,
          height,
          lineHeight: 0,
          cursor: "pointer",
          display: "inline-flex",
          ...sx,
        }}
      >
        <img
          src="/assets/logo/logo5.png"
          alt="Custom Logo"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
    </Link>
  );
}

export default memo(Logo);
