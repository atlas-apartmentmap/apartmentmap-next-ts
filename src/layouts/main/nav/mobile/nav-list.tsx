import Collapse from '@mui/material/Collapse';

import { useActiveLink } from '@/routes/hooks/use-active-link';

import { useBoolean } from '@/hooks/use-boolean';

import { NavSectionVertical } from '@/components/nav-section';

import NavItem from './nav-item';
import { NavListProps } from '../types';

// ----------------------------------------------------------------------

export default function NavList({ data }: NavListProps) {
  const active = useActiveLink(data.path, !!data.children);

  const menuOpen = useBoolean();

  return (
    <>
      <NavItem
        open={menuOpen.value}
        onClick={menuOpen.onToggle}
        //
        title={data.title}
        path={data.path}
        //
        active={active}
        hasChild={!!data.children}
        externalLink={data.path.includes('http')}
      />

      {!!data.children && (
        <Collapse in={menuOpen.value} unmountOnExit>
          <NavSectionVertical
            data={data.children}
            slotProps={{
              rootItem: {
                pl: 1,
                minHeight: 30,
              },
              subheader: {
                pl: 1,
              },
            }}
          />
        </Collapse>
      )}
    </>
  );
}
