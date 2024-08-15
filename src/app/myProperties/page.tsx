import { getData } from '@/api/sql/api';
import MyPropertiesView from '@/sections/views/my-properties-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'My Properties',
};

export default async function MyProperties() {
  const res = await getData();
  console.log(res);

  return <MyPropertiesView />;
}
