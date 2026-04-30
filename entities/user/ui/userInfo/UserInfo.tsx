import clsx from 'clsx';

import { User } from '@/generated/graphql';
import { formatDate } from '@/shared/lib';
import { Avatar } from '@dangerous-tigers/framehub-ui-kit/components';

import s from './UserInfo.module.scss';

export function UserInfo({ user, className }: { user: User; className?: string }) {
  const avatarUrl = user.profile?.avatars?.[0]?.url;

  return (
    <div className={clsx(s.root, className)}>
      <div className={s.userInfoTop}>
        <Avatar
          url={avatarUrl}
          size='l'
        />
        <div className={s.info}>
          <p className={s.infoName}>{user.userName}</p>
          <p className={s.infoEmail}>{user.email}</p>
        </div>
      </div>
      <div className={s.userInfoBottom}>
        <div>
          <p className={s.userInfoBottomTitle}>UserID:</p>
          <p>{user.id}</p>
        </div>
        <div>
          <p className={s.userInfoBottomTitle}>Profile Creation Date: </p>
          <p>{formatDate(user.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}
