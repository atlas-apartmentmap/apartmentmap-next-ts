import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { filledInputClasses } from "@mui/material/FilledInput";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";

import { apartments } from "@/assets/data";

import Iconify from "@/components/iconify";

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

export default function ApartmentSelect<
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
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, "renderInput">) {
  const { multiple } = other;

  return (
    <Autocomplete
      autoHighlight={!multiple}
      disableCloseOnSelect={multiple}
      renderOption={(props, option) => {
        const apartment = getApartment(option as string);

        if (!apartment.label) {
          return null;
        }

        return (
          <li {...props} key={apartment.label}>
            <Iconify
              key={apartment.label}
              icon="mdi:home-city"
              sx={{ mr: 1 }}
            />
            {apartment.label}
          </li>
        );
      }}
      renderInput={(params) => {
        const apartment = getApartment(params.inputProps.value as string);

        const baseField = {
          ...params,
          label,
          placeholder,
          error: !!error,
          helperText,
          hiddenLabel,
          inputProps: {
            ...params.inputProps,
            autoComplete: "new-password",
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
                    ...(!apartment.label && {
                      display: "none",
                    }),
                  }}
                >
                  <Iconify icon="mdi:home-city" sx={{ mr: -0.5, ml: 0.5 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              ...(!hiddenLabel && {
                [`& .${filledInputClasses.root}`]: {
                  "& .component-iconify": {
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
          const apartment = getApartment(option as string);

          return (
            <Chip
              {...getTagProps({ index })}
              key={apartment.label}
              label={apartment.label}
              icon={<Iconify icon="mdi:home-city" />}
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

export function getApartment(inputValue: string) {
  const option = apartments.filter(
    (apartment) => apartment.label === inputValue
  )[0];

  return {
    ...option,
  };
}
