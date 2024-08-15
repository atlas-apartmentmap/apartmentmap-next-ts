import { getData } from '@/api/sql/api';

import MapsView from '@/sections/views/maps-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Brisbane: Map',
};

export default async function MapsPage() {
  const res = await getData();
  console.log(res);

  return <MapsView />;
}
