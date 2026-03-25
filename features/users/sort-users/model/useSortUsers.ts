import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type SortOption = 'userName' | 'createdAt';
export type SortDirection = 'asc' | 'desc';
export type SortPreset = 'name-asc' | 'name-desc' | 'date-asc' | 'date-desc';

interface UseSortUsersReturn {
  sortBy: SortOption;
  sortDirection: SortDirection;
  sortPreset: SortPreset;
  handleSortChange: (preset: SortPreset) => void;
}

export function useSortUsers(): UseSortUsersReturn {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentPreset = useMemo((): SortPreset => {
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortDirection = searchParams.get('sortDirection') || 'desc';

    if (sortBy === 'userName' && sortDirection === 'asc') return 'name-asc';
    if (sortBy === 'userName' && sortDirection === 'desc') return 'name-desc';
    if (sortBy === 'createdAt' && sortDirection === 'asc') return 'date-asc';
    return 'date-desc';
  }, [searchParams]);

  const sortBy = useMemo<SortOption>(() => {
    return currentPreset.startsWith('name') ? 'userName' : 'createdAt';
  }, [currentPreset]);

  const sortDirection = useMemo<SortDirection>(() => {
    return currentPreset.endsWith('asc') ? 'asc' : 'desc';
  }, [currentPreset]);

  const handleSortChange = useCallback(
    (preset: SortPreset) => {
      const params = new URLSearchParams(searchParams.toString());
      const [sortByParam, directionParam] = preset.split('-');

      if (sortByParam === 'createdAt') {
        params.delete('sortBy');
      } else {
        params.set('sortBy', sortByParam);
      }

      if (directionParam === 'desc') {
        params.delete('sortDirection');
      } else {
        params.set('sortDirection', directionParam);
      }

      const query = params.toString();
      const nextUrl = query ? `${pathname}?${query}` : pathname;
      router.replace(nextUrl, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return {
    sortBy,
    sortDirection,
    sortPreset: currentPreset,
    handleSortChange,
  };
}
