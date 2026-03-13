import s from "./Avatar.module.scss";

export function Avatar({ url }: { url: string | undefined }) {
  return <img className={s.root} src={url} alt="user-avatar" />;
}
