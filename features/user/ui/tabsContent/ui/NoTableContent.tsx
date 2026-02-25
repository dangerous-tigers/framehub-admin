import s from "./NoTableContent.module.scss";

export function NoTableContent() {
  return (
    <div>
      <p className={s.noContent}>No followers</p>
    </div>
  );
}
