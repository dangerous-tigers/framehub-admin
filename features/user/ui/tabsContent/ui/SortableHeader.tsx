import { Button, TableHead, TableHeader, TableRow } from '@dangerous-tigers/framehub-ui-kit/components';

import s from './SortableHeader.module.scss';

export function SortableHeader({
  sortBy,
  setCurrentPageAndSortBy,
}: {
  sortBy: {
    field: 'createdAt' | 'userName';
    direction: 'asc' | 'desc';
  };
  setCurrentPageAndSortBy: (field: 'createdAt' | 'userName', direction: 'asc' | 'desc') => void;
}) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>{'user id'}</TableHead>
        <TableHead>
          <Button
            className={s.headBtn}
            variant='text'
            onClick={() => setCurrentPageAndSortBy('userName', sortBy.direction === 'asc' ? 'desc' : 'asc')}
          >
            Profile link{' '}
            <svg
              width='10'
              height='14'
              viewBox='0 0 8 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M4 0L7.4641 4.5H0.535898L4 0Z'
                fill='#4C4C4C'
              />
              <path
                d='M4 12L0.535898 7.5L7.4641 7.5L4 12Z'
                fill='#4C4C4C'
              />
            </svg>
          </Button>
        </TableHead>
        <TableHead>{'User name'}</TableHead>
        <TableHead>
          <Button
            className={s.headBtn}
            variant='text'
            onClick={() => setCurrentPageAndSortBy('createdAt', sortBy.direction === 'asc' ? 'desc' : 'asc')}
          >
            Subscribed date{' '}
            <svg
              width='10'
              height='14'
              viewBox='0 0 8 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M4 0L7.4641 4.5H0.535898L4 0Z'
                fill='#4C4C4C'
              />
              <path
                d='M4 12L0.535898 7.5L7.4641 7.5L4 12Z'
                fill='#4C4C4C'
              />
            </svg>
          </Button>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
