import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton, { iconButtonClasses } from '@mui/material/IconButton';
import InputBase, { InputBaseProps, inputBaseClasses } from '@mui/material/InputBase';

import Iconify from '@/components/iconify';

// ----------------------------------------------------------------------

type Props = InputBaseProps & {
  rooms: {
    bedrooms: number;
    bathrooms: number;
  };
  onIncrementRooms: (room?: string) => void;
  onDecreaseRooms: (room?: string) => void;
};

export default function FilterRooms({
  rooms,
  onIncrementRooms,
  onDecreaseRooms,
  sx,
  ...other
}: Props) {
  const totalRooms = rooms.bathrooms + rooms.bedrooms;

  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);

  return (
    <>
      <InputBase
        fullWidth
        value={totalRooms > 0 ? `${totalRooms} Rooms` : ''}
        placeholder="Rooms"
        startAdornment={
          <InputAdornment position="start">
            <Iconify width={24} icon="carbon:events" sx={{ mr: 1, color: 'text.disabled' }} />
          </InputAdornment>
        }
        onClick={handleOpen}
        sx={{
          height: 52,
          [`& .${inputBaseClasses.input}`]: {
            typography: 'subtitle1',
          },
          ...sx,
        }}
        {...other}
      />

      <Popover
        open={!!open}
        onClose={handleClose}
        anchorEl={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: { width: 360, p: 3 },
          },
        }}
      >
        <Stack spacing={2.5} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
          <Input
            title="Bedrooms"
            caption="Number of bedrooms"
            total={rooms.bedrooms}
            onDecrease={() => onDecreaseRooms('bedrooms')}
            onIncrement={() => onIncrementRooms('bedrooms')}
          />

          <Input
            title="Bathrooms"
            caption="Number of bathrooms"
            total={rooms.bathrooms}
            onDecrease={() => onDecreaseRooms('bathrooms')}
            onIncrement={() => onIncrementRooms('bathrooms')}
          />
        </Stack>
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

type RowProps = {
  title: string;
  caption: string;
  total: number;
  onDecrease: VoidFunction;
  onIncrement: VoidFunction;
};

function Input({ title, caption, total, onDecrease, onIncrement }: RowProps) {
  return (
    <Stack direction="row">
      <Stack spacing={0.5} sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          {caption}
        </Typography>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: 100, typography: 'subtitle1' }}
      >
        <IconButton
          disabled={total < 1}
          onClick={onDecrease}
          sx={{
            p: 0,
            [`&.${iconButtonClasses.disabled}`]: {
              opacity: 0.72,
            },
          }}
        >
          <Iconify icon="carbon:subtract-alt" />
        </IconButton>

        {total}

        <IconButton onClick={onIncrement} sx={{ p: 0 }}>
          <Iconify icon="carbon:add-alt" />
        </IconButton>
      </Stack>
    </Stack>
  );
}
