import { SearchComponent } from '@/features/users/Search/ui/SearchComponent';
import { ViewAllPosts } from '@/features/viewAllPosts';

export const dynamic = 'force-dynamic';

export default function PostsPage() {
  return (
    <div style={{ marginTop: '3.75rem' }}>
      <SearchComponent />
      <ViewAllPosts />
    </div>
  );
}
