import { useState, useCallback } from "react";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack, { StackProps } from "@mui/material/Stack";

import Iconify from "@/components/iconify";

// import FilterTime from './filter-time';
// import FilterBedrooms from './filter-bedrooms'; // Renamed from FilterGuests
import FilterLocation from "./filter-location";

// ----------------------------------------------------------------------

export default function Filters({ sx, ...other }: StackProps) {
  const [departureDay, setDepartureDay] = useState<Date | null>(null);

  const [rooms, setRooms] = useState({
    bedrooms: 0,
    bathrooms: 0,
  });

  const handleChangeDepartureDay = useCallback((newValue: Date | null) => {
    setDepartureDay(newValue);
  }, []);

  const handleIncrementRooms = useCallback(
    (room?: string) => {
      if (room === "bathrooms") {
        setRooms({ ...rooms, bathrooms: rooms.bathrooms + 1 });
      } else {
        setRooms({ ...rooms, bedrooms: rooms.bedrooms + 1 });
      }
    },
    [rooms]
  );

  const handleDecreaseRooms = useCallback(
    (room?: string) => {
      if (room === "bathrooms") {
        setRooms({ ...rooms, bathrooms: rooms.bathrooms - 1 });
      } else {
        setRooms({ ...rooms, bedrooms: rooms.bedrooms - 1 });
      }
    },
    [rooms]
  );

  return (
    <Stack
      spacing={2.5}
      alignItems={{ md: "center" }}
      direction={{ xs: "column", md: "row" }}
      sx={{ p: 4, borderRadius: 2, bgcolor: "background.neutral", ...sx }}
      {...other}
    >
      <FilterLocation />

      {/* <Divider flexItem orientation="vertical" /> */}

      {/* <FilterTime departureDay={departureDay} onChangeDepartureDay={handleChangeDepartureDay} />

      <Divider flexItem orientation="vertical" />

      <FilterBedrooms
        rooms={rooms}
        onDecreaseRooms={handleDecreaseRooms}
        onIncrementRooms={handleIncrementRooms}
      /> */}

      <Button
        size="large"
        color="secondary"
        variant="contained"
        sx={{
          px: 0,
          flexShrink: 0,
          minWidth: { xs: 1, md: 48 },
        }}
      >
        <Iconify icon="carbon:search" />
      </Button>
    </Stack>
  );
}
