// =============================================
// UserAvatar Component
// =============================================

import { memo } from 'react';

import styles from './UserAvatar.module.scss';

export interface UserAvatarProps {
  src?: string | null;
  alt: string;
  size?: number;
  className?: string;
}

export const UserAvatar = memo(function UserAvatar({
  src,
  alt,
  size = 40,
  className,
}: UserAvatarProps) {
  const avatarStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };

  if (!src) {
    return (
      <div
        className={`${styles.avatar} ${styles['avatar--placeholder']} ${className || ''}`}
        style={avatarStyle}
      >
        <span className={styles['avatar__placeholder']}>
          {alt.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${styles.avatar} ${className || ''}`}
      style={avatarStyle}
    />
  );
});
