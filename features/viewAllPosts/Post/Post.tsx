'use client';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import TimeAgo from 'react-timeago';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { TruncatedDescription } from '@/entities/viewAllPosts';
import { useConfirmStore } from '@/features/viewAllPosts/useConfirmStore';
import { Avatar, Button } from '@dangerous-tigers/framehub-ui-kit/components';
import Block from '@dangerous-tigers/framehub-ui-kit/icons/Block';

import s from './Post.module.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export type Post = {
  id: number;
  ownerId: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  images: {
    id: number;
    createdAt: string;
    url: string;
    width: number;
    height: number;
    fileSize: number;
  }[];
  postOwner: {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    avatars: {
      url: string;
      width: number;
      height: number;
      fileSize: number;
    }[];
  };
  userBan: {
    reason: string;
    createdAt: string;
  };
};

type Props = {
  post: Post;
  expanded?: boolean;
  toggleExpanded: (id: number) => void;
  setPost: (post: Post) => void;
};

export const Post = ({ post, expanded, toggleExpanded, setPost }: Props) => {
  const { show } = useConfirmStore();

  const handleUserBanClick = () => {
    setPost(post);
    show();
  };

  return (
    <article
      key={post.id}
      className={clsx(s.post)}
    >
      <div className={clsx(expanded ? s.swiperSmall : s.swiperLarge)}>
        <Link href={`/profile/${post.ownerId}?postId=${post.id}`}>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={post.images.length > 1}
            pagination={post.images.length > 1 ? { clickable: true } : false}
            spaceBetween={10}
            slidesPerView={1}
            className={s.postSlider}
          >
            {post.images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <Image
                  src={img.url}
                  alt={post.description || 'Post image'}
                  width={300}
                  height={300}
                  className={clsx(s.postImage)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Link>
      </div>

      <div className={clsx(s.postInfoTop)}>
        {post.postOwner && (
          <Avatar
            url={post.postOwner.avatars[0]?.url}
            size='s'
            className={clsx(s.postAvatar)}
          />
        )}
        <Link href={`/profile/${post.ownerId}`}>
          <p className={clsx(s.postName)}>{post.postOwner.userName}</p>
        </Link>
        <Button
          className={s.ban}
          onClick={handleUserBanClick}
        >
          <Block />
        </Button>
      </div>
      <div className={clsx(s.postData)}>
        <TimeAgo date={post.createdAt} />
      </div>

      <div className={s.postDescription}>
        <TruncatedDescription
          text={post.description}
          expanded={expanded}
          onToggle={() => toggleExpanded(post.id)}
        />
      </div>
    </article>
  );
};
