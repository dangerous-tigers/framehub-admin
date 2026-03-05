// =============================================
// User Entity Types
// =============================================

import { User } from '@/types/__generated__/graphql';

export type { User };

export interface UserWithProfile extends User {
  fullName: string;
  avatarUrl?: string;
}
