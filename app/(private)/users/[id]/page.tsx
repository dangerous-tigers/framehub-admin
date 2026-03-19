import { UserPage } from '@/features/user/ui/UserPage';

export default async function UserHomePage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  return (
    <div>
      <UserPage id={id} />
    </div>
  );
}
