import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { filledInputClasses } from '@mui/material/FilledInput';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';

import { countries } from '@/assets/data';

import Iconify from '@/components/iconify';

// ----------------------------------------------------------------------

interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  label?: string;
  error?: boolean;
  placeholder?: string;
  hiddenLabel?: boolean;
  helperText?: React.ReactNode;
}

export default function CountrySelect<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({
  label,
  error,
  helperText,
  hiddenLabel,
  placeholder,
  ...other
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {
  const { multiple } = other;

  return (
    <Autocomplete
      autoHighlight={!multiple}
      disableCloseOnSelect={multiple}
      renderOption={(props, option) => {
        const country = getCountry(option as string);

        if (!country.label) {
          return null;
        }

        return (
          <li {...props} key={country.label}>
            <Iconify
              key={country.label}
              icon={`circle-flags:${country.code?.toLowerCase()}`}
              sx={{ mr: 1 }}
            />
            {country.label} ({country.code}) +{country.phone}
          </li>
        );
      }}
      renderInput={(params) => {
        const country = getCountry(params.inputProps.value as string);

        const baseField = {
          ...params,
          label,
          placeholder,
          error: !!error,
          helperText,
          hiddenLabel,
          inputProps: {
            ...params.inputProps,
            autoComplete: 'new-password',
          },
        };

        if (multiple) {
          return <TextField {...baseField} />;
        }

        return (
          <TextField
            {...baseField}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{
                    ...(!country.code && {
                      display: 'none',
                    }),
                  }}
                >
                  <Iconify
                    icon={`circle-flags:${country.code?.toLowerCase()}`}
                    sx={{ mr: -0.5, ml: 0.5 }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              ...(!hiddenLabel && {
                [`& .${filledInputClasses.root}`]: {
                  '& .component-iconify': {
                    mt: -2,
                  },
                },
              }),
            }}
          />
        );
      }}
      renderTags={(selected, getTagProps) =>
        selected.map((option, index) => {
          const country = getCountry(option as string);

          return (
            <Chip
              {...getTagProps({ index })}
              key={country.label}
              label={country.label}
              icon={<Iconify icon={`circle-flags:${country.code?.toLowerCase()}`} />}
              size="small"
              variant="soft"
            />
          );
        })
      }
      {...other}
    />
  );
}

// ----------------------------------------------------------------------

export function getCountry(inputValue: string) {
  const option = countries.filter((country) => country.label === inputValue)[0];

  return {
    ...option,
  };
}
