"use client";

import { useEffect } from "react";
import { useBoolean } from "@/hooks/use-boolean";
import { SplashScreen } from "@/components/loading-screen";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
// Import Zone UI components
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/custom-breadcrumbs";
import { Typography } from "@mui/material";
// import { VisionStatement, VisionImage } from '@/components/vision';

export default function VisionView() {
  const loading = useBoolean(true);

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      loading.onFalse();
    };
    fakeLoading();
  }, [loading]);

  if (loading.value) {
    return <SplashScreen />;
  }

  return (
    <>
      <Container>
        <Box my={4}>
          <Typography variant="h2" gutterBottom>
            Our Vision
          </Typography>
          <Typography variant="body1" paragraph>
            Our company revolutionizes the property market by enhancing the
            experience for both buyers and sellers. We empower apartment owners
            with real-time access to the most relevant price information and a
            list of interested buyers, ensuring a seamless selling process. For
            buyers, our platform offers the ability to express interest in
            specific floor plans and receive notifications when matching
            apartments become available, providing a transparent and efficient
            path to homeownership.
          </Typography>

          {/* <VisionImage src="/path/to/vision-image.jpg" alt="Vision Image" /> */}
        </Box>

        <Box my={4}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                Innovation
              </Typography>
              <Typography variant="body1" paragraph>
                Our innovative use of 3D models is revolutionizing the property
                market, providing buyers with a detailed and immersive
                visualization of buildings and their floor plans. This
                cutting-edge technology allows prospective buyers to explore
                every aspect of a property in a realistic and interactive
                manner, enhancing their ability to make informed decisions. By
                visualizing the space in three dimensions, buyers can gain a
                true sense of the layout, design, and flow of each apartment,
                ultimately improving their overall home-buying experience.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box my={4}>
          {/* Call to Action or Newsletter Signup */}
          {/* Uncomment and implement TravelNewsletter */}
          {/* <TravelNewsletter /> */}
        </Box>
      </Container>
    </>
  );
}
