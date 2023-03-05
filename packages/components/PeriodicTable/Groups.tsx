import classNames from 'classnames/bind'

import styles from "./groups.module.scss"

const cx = classNames.bind(styles)

type Props = {
  groups: (string | number)[];
};

export default function Groups({ groups }: Props) {
  return (
    <div className={cx('group')}>
      {groups.map((label, index) => (
        <div key={index} className={cx('item')}>{label}</div>
      ))}
    </div>
  );
}
