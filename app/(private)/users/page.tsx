import { ListUsers, Search } from '@/widgets/users';

export const dynamic = 'force-dynamic';

export default function UsersPage() {
  return (
    <>
      <Search />
      <ListUsers />
    </>
  );
}
