import s from './TruncatedDescription.module.scss';

interface TruncatedDescriptionProps {
  text: string;
  charLimit?: number;
  expanded?: boolean;
  onToggle?: () => void;
}

export const TruncatedDescription = ({
  text,
  charLimit = 80,
  expanded = false,
  onToggle,
}: TruncatedDescriptionProps) => {
  const isTruncated = text.length > charLimit;
  const displayedText = expanded || !isTruncated ? text : text.slice(0, charLimit) + '…';

  return (
    <div className={s.text}>
      {displayedText}
      {isTruncated && onToggle && (
        <span
          className={s.showMoreBtn}
          onClick={onToggle}
        >
          {expanded ? 'Hide' : 'ShowMore'}
        </span>
      )}
    </div>
  );
};
