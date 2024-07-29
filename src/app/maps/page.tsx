import TravelLandingView from "@/sections/views/landing-view";
import HomeView from "@/sections/views/home-view";
import MapsView from "@/sections/views/maps-view";

// ----------------------------------------------------------------------

export const metadata = {
  title: "Travel: Maps",
};

export default async function MapsPage() {
  return <MapsView />;
}
