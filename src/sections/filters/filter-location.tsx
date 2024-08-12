import { filledInputClasses } from '@mui/material/FilledInput';

// Assuming you have an array of apartment options
import { apartments } from '@/assets/data';

import ApartmentSelect from '@/components/apartment-select/apartment-select';

// ----------------------------------------------------------------------

export default function FilterApartments() {
  return (
    <ApartmentSelect
      fullWidth
      hiddenLabel
      popupIcon={null}
      placeholder="Browse"
      options={apartments.map((option) => option.label)}
      getOptionLabel={(option) => option}
      sx={{
        [`& .${filledInputClasses.root}`]: {
          bgcolor: 'white',
          '&:hover': {
            bgcolor: 'white',
          },
          [`&.${filledInputClasses.focused}`]: {
            bgcolor: 'white',
          },
        },
        [`& .${filledInputClasses.input}`]: {
          typography: 'subtitle1',
        },
      }}
    />
  );
}
