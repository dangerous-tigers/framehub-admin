import { ListUsers, Search } from '@/widgets/users';

export const dynamic = 'force-dynamic';

export default function UsersPage() {
  return (
    <div style={{ marginTop: '3.75rem' }}>
      <Search />
      <ListUsers />
    </div>
  );
}
