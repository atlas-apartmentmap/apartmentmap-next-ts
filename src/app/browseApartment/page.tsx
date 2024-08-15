import { getData } from '@/api/sql/api';
import BrowseApartments from '@/sections/views/browse-view';

import TravelLandingView from '@/sections/views/landing-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Travel: Browse Apartments',
};

export default async function BrowseUnits() {
  const res = await getData();
  console.log(res);

  return <BrowseApartments />;
}
