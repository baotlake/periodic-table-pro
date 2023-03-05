import classNames from 'classnames/bind'

import styles from "./periods.module.scss"

const cx = classNames.bind(styles)

type Props = {
  periods: (string | number)[];
};

export default function Periods({ periods }: Props) {
  return (
    <div className={cx("period")}>
      {periods.map((label, index) => (
        <div key={index} className={cx("item")}>{label}</div>
      ))}
    </div>
  );
}
