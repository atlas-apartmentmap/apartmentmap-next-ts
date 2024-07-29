import VisionView from "@/sections/views/vision-view";
import ThreeDView from "@/sections/views/threed-view"; // Corrected import name

// ----------------------------------------------------------------------

export const metadata = {
  title: "Unit: 3D Viewer",
};

export default async function threeDViewerPage() {
  return <ThreeDView />; // Corrected component name
}
