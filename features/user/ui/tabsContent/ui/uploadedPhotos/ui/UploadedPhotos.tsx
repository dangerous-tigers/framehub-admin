"use client";

import { useGetPostsUserInfinite } from "../model/useGetPostsUserInfinite";

import s from "./UploadedPhotos.module.scss";

export function UploadedPhotos({ userId }: { userId: number }) {
  const { items, hasMore, cursorRef } = useGetPostsUserInfinite({
    userId,
  });

  return (
    <div>
      <ul className={s.postList}>
        {items.map((item) => (
          <li key={item.id}>
            <img src={item.url ?? ""} alt={"uploded-photo " + item.id} />
          </li>
        ))}
      </ul>
      <div ref={cursorRef} />
      {!hasMore && <div className={s.noMore}>Вы дошли до конца ленты</div>}
    </div>
  );
}
