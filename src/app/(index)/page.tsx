import HomeView from "@/sections/views/home-view";

// ----------------------------------------------------------------------

export const metadata = {
  title: "Travel: Home",
};

export default async function HomePage() {
  // const res = await getData();
  // console.log(res);

  return <HomeView />;
}
