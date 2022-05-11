import { useEffect, useRef } from 'react'
import { View, Image, Text } from "@tarojs/components";
import Taro from '@tarojs/taro'
import classNames from "classnames";
import { zhCNCategories, Categories } from "../../data/classification";
import previewImg from '../../assets/icons/preview.svg'
// import useMenuButtonClientRect from "../../hooks/useMenuButtonClientRect";

import "./index.scss";

type Props = {
  symbol: string
  enName: string
  name: string
  atomicNumber: number
  atomicWeight: string | number
  category: number
  pinyin: string
};

export default function ElementProfile({
  category,
  symbol,
  atomicNumber,
  atomicWeight,
  name,
  enName,
  pinyin,
}: Props) {

  // const menuRect = useMenuButtonClientRect()
  const viewRef = useRef<HTMLElement>()

  const host = process.env.TARO_ENV == 'weapp' ? STORAGE_HOST : BUCKET_HOST
  const imageUrl = host + '/elements/1920p/' + symbol + '.jpg'

  const handleViewImage = () => {
    Taro.previewImage({
      urls: [imageUrl],
      current: imageUrl,
    })
  };

  useEffect(() => {
    // console.log('viewRef', viewRef)
    if (viewRef.current) {
      const dataLayer = document.querySelector('.data-layer')
      // console.log('dataLayer', dataLayer)
    }
  }, [])

  return (
    <View
      ref={viewRef}
      className={classNames("element-profile default landscape", Categories[category])}
    >
      <Image
        className='image'
        mode='aspectFill'
        src={imageUrl}
      />
      <View className='data-layer'>
        <Text className='category'>{zhCNCategories[category]}</Text>

        <View className='basic-group'>
          <Text className='symbol'>{symbol}</Text>
          <Text className='zh-name'>{atomicNumber + " " + name + " " + pinyin}</Text>
          <Text className='en-name'>{enName}</Text>
          <Text className='weight'>{atomicWeight}</Text>
        </View>

        <Image className='view-icon white' onClick={handleViewImage} src={previewImg} />
      </View>
    </View>
  );
}
