// =============================================
// UserStatus Component
// =============================================

import { memo } from 'react';

import styles from './UserStatus.module.scss';

export interface UserStatusProps {
  isBanned: boolean;
  className?: string;
}

export const UserStatus = memo(function UserStatus({
  isBanned,
  className,
}: UserStatusProps) {
  return (
    <span
      className={`${styles.status} ${
        isBanned ? styles['status--banned'] : styles['status--active']
      } ${className || ''}`}
    >
      {isBanned ? 'Banned' : 'Active'}
    </span>
  );
});
