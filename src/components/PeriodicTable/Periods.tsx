import { View } from "@tarojs/components";

import "./periods.scss";

type Props = {
    periods: (string | number)[];
};

export default function Periods({ periods }: Props) {
  return (
    <View className="pt__periods">
      {periods.map((label,index) => (
        <View key={index} className="item">{label}</View>
      ))}
    </View>
  );
}
