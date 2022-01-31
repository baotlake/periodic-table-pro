import { View } from "@tarojs/components";

import "./groups.scss";

type Props = {
  groups: (string | number)[];
};

export default function Groups({ groups }: Props) {
  return (
    <View className='pt__groups'>
      {groups.map((label, index) => (
        <View key={index} className='item'>{label}</View>
      ))}
    </View>
  );
}
