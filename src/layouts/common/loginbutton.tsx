import { m } from "framer-motion";
import Link from "next/link";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Theme, SxProps } from "@mui/material/styles";
import Badge, { badgeClasses } from "@mui/material/Badge";

import { varHover } from "@/components/animate";
import { useSettingsContext } from "@/components/settings";

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export default function LoginButton({ sx }: Props) {
  const settings = useSettingsContext();

  return (
    <Badge
      color="error"
      variant="dot"
      invisible={!settings.canReset}
      sx={{
        [`& .${badgeClasses.badge}`]: {
          top: 8,
          right: 8,
        },
        ...sx,
      }}
    >
      <Link href="/auth/login-cover" passHref>
        <Button
          component={m.button}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          variants={varHover(1.05)}
          color="primary"
          aria-label="login"
          sx={sx}
        >
          Login
        </Button>
      </Link>
    </Badge>
  );
}
