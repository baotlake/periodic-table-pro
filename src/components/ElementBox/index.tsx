import { CSSProperties } from 'react'
import { View, Text, Image } from "@tarojs/components";
import classNames from 'classnames'

import "./index.scss";

type ItemValue = string | {
  type: 'image'
  url: string
}

type ItemProps = {
  value: ItemValue
  className: string
}

function Item({value, className}: ItemProps) {
  if(typeof value === 'string') {
    return <Text className={classNames(className, 'text')} >{value}</Text>
  }

  if(value.type === 'image') {
    return <Image className={className} src={value.url}></Image>
  }

  return <Text></Text>
}

type Props = {
  onClick?: (Z: number) => void;
  className?: string
  style?: CSSProperties
  emphasize?: 'symbol' | 'number' |  'name'
  atomicNumber: number;
  symbol: string;
  zhName?: ItemValue;
  tl?: string;
  tr?: string;
  ml?: string;
  mc?: string;
  mr?: string;
  bc?: string;
};

export default function ElementBox({
  onClick,
  className,
  style,
  emphasize,
  atomicNumber,
  symbol,
  zhName,
  mr,
  mc,
  bc,
  tl,
  tr,
}: Props) {
  return (
    <View
      className={classNames("element-box", {
        scalable: true,
      }, className)}
      style={style}
      onClick={() => onClick && onClick(atomicNumber)}
    >
      {
        (emphasize === 'symbol' || !emphasize) ? (
          <>
          {atomicNumber && !tl && <Text className='text tl'>{atomicNumber}</Text>}
          {symbol && !mc && <Text className='text mc'>{symbol}</Text>}
          {zhName && !tr && <Item className='tr' value={zhName} />}
          </>
        ): emphasize === 'name' ? (
          <>
            {atomicNumber && !tl && <Text className='text tl'>{atomicNumber}</Text>}
            {symbol && !tr && <Text className='text tr'>{symbol}</Text>}
            {zhName && !mc && <Item className='mc' value={zhName} />}
          </>
        ): (
          // number
          <>
            {symbol && !tl && <Text className='text tl'>{symbol}</Text>}
            {zhName && !tr && <Item className='tr' value={zhName} />}
            {atomicNumber && !mc && <Text className='text mc'>{atomicNumber}</Text>}
          </>
        )
      }

      {tr && <Text className='text tr'>{tr}</Text>}
      {mr && <Text className='text mr'>{mr}</Text>}
      {bc && <Text className='text bc'>{bc}</Text>}
    </View>
  );
}

