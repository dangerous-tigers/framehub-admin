import { ComponentPropsWithoutRef } from 'react';

import s from './ButtonTableHead.module.scss';

type Props = {
  label: string;
} & ComponentPropsWithoutRef<'button'>;

export const ButtonTableHead = ({ label, ...rest }: Props) => {
  return (
    <button
      className={s.root}
      {...rest}
    >
      <div>{label}</div>
      <svg
        width='10'
        height='14'
        viewBox='0 0 8 12'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M4 0L7.4641 4.5H0.535898L4 0Z'
          fill='#4C4C4C'
        />
        <path
          d='M4 12L0.535898 7.5L7.4641 7.5L4 12Z'
          fill='#4C4C4C'
        />
      </svg>
    </button>
  );
};
