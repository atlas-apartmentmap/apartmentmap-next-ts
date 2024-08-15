import HomeView from '@/sections/views/home-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Apartment Map',
};

export default async function HomePage() {
  // const res = await getData();
  // console.log(res);

  return <HomeView />;
}
