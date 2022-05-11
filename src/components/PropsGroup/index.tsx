import { View, Text, Image } from "@tarojs/components"
import { useState } from "react"
import classNames from "classnames"
import { DetailData, propertiesLabel, propertiesGroupLabel } from '../../data/details'
import ElectronsShell from "./ElectronsShell"

import outlineImg from "../../assets/icons/outline.svg"
import physicsImg from "../../assets/icons/physics.svg"
import atomImg from "../../assets/icons/atom.svg"
import timeImg from "../../assets/icons/time.svg"
import otherImg from "../../assets/icons/other.svg"

import "./index.scss"

type Props = {
  id?: string
  themeClass?: string
  propsType: string;
  data: DetailData['properties']['basic']
  | DetailData['properties']['physical']
  | DetailData['properties']['atomic']
  | DetailData['properties']['other']
};

const icon = {
  basic: outlineImg,
  physical: physicsImg,
  atomic: atomImg,
  other: otherImg,
  history: timeImg,
}

const shellNameList = ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R']

const host = process.env.TARO_ENV == 'weapp' ? STORAGE_HOST : BUCKET_HOST
const spectralLinesPath = host + '/elements/spectral-lines/'

export default function PropsGroup({ propsType, data, id, themeClass }: Props) {
  const [isCollapse, setIsCollapse] = useState(false);

  return (
    <View className={classNames('props-group landscape', themeClass)} id={id}>
      <View
        className='props-headline'
        onClick={() => setIsCollapse(!isCollapse)}
      >
        <Image className='props-icon' src={icon[propsType]} />
        {propertiesGroupLabel[propsType]}
        <View
          className={classNames("expand-icon", {
            collapse: isCollapse
          })}
        />
      </View>
      <View
        className={classNames("item-container", {
          collapse: isCollapse
        })}
      >
        {Object.keys(data).map(key => {
          let title = propertiesLabel[key]
          let value = data[key] as string

          switch (key) {
            case 'electronsPerShell':
              return (
                <View className='props-item' key={key}>
                  <View className='title'>{title}</View>
                  <ElectronsShell className='electrons-shell' value={value} />
                  <View className='electrons-per-shell'>
                    {value.split(',').map((n, i) => (
                      <>
                        <Text className='name'>{shellNameList[i]}</Text>
                        <Text className='number'>{n + ' '}</Text>
                      </>
                    ))}
                  </View>
                </View>
              )
            case 'spectralLines':
              return (
                <View className='props-item' key={key}>
                  <View className='title'>{title}</View>
                  <Image
                    className='spectral-lines'
                    src={spectralLinesPath + value + '.png'}
                  />
                </View>
              )
            default:
              return (
                <View className='props-item' key={key}>
                  <View className='title'>{title}</View>
                  <View className='value'>{value || '--'}</View>
                </View>
              )
          }
        })}
      </View>
    </View>
  );
}
