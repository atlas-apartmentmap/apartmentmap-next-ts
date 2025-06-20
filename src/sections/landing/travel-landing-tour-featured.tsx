import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from '@/routes/paths';
import { RouterLink } from '@/routes/components';

import { ITourProps } from '@/types/tour';

import TravelTourItem from '../list/travel-tour-item';

// ----------------------------------------------------------------------

type Props = {
  tours: ITourProps[];
};

export default function TravelLandingTourFeatured({ tours }: Props) {
  return (
    <Container
      sx={{
        py: { xs: 5, md: 10 },
      }}
    >
      <Stack spacing={3} sx={{ textAlign: 'center' }}>
        <Typography variant="h3">Featured Tours</Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          {`Our Featured Tours can help you find the trip that's perfect for you!`}
        </Typography>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          my: { xs: 8, md: 10 },
          gap: { xs: 4, md: 3 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        {tours.map((tour) => (
          <TravelTourItem key={tour.id} tour={tour} />
        ))}
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Button
          component={RouterLink}
          href={paths.units}
          size="large"
          variant="outlined"
          color="inherit"
        >
          View All Tours
        </Button>
      </Box>
    </Container>
  );
}
