import { CSSProperties, useEffect, useState } from "react";
import { useRouter } from "@tarojs/taro";
import classNames from "classnames";
import { View, Image, ScrollView } from "@tarojs/components";
import ElementProfile from "../../components/ElementProfile";
import {
  symbol,
  formalShortAtomicWeights,
  zhCNNames,
  enName,
  pinyin
} from "../../data/elements";
import { elementsCategories } from "../../data/classification";
import { NavigationHeader } from "../../components/NavigationBar";
import PropsGroup from "../../components/PropsGroup";
import { getDetailData, propertiesGroupLabel } from "../../data/details";
import ElementCard from "../../components/ElementCard";
import useMenuButtonClientRect from "../../hooks/useMenuButtonClientRect";
import useThemeMode from "../../hooks/useThemeMode";

import outlineImg from "../../assets/icons/outline.svg";
import physicsImg from "../../assets/icons/physics.svg";
import atomImg from "../../assets/icons/atom.svg";
import timeImg from "../../assets/icons/time.svg";
import otherImg from "../../assets/icons/other.svg";

import './index.scss'

const icon = {
  basic: outlineImg,
  physical: physicsImg,
  atomic: atomImg,
  other: otherImg,
  history: timeImg,
}

export default function DetailPage() {
  const router = useRouter();
  const rect = useMenuButtonClientRect()
  const [theme] = useThemeMode()
  const [atomicNumber, setAtomicNumber] = useState(1);
  const [scrollInto, setScrollInto] = useState('')

  useEffect(() => {
    const Z = router.params.Z;
    console.log('Z ', Z)
    if (Z && isFinite(parseInt(Z))) {
      // console.log('setAtomicNumber ', parseInt(Z))
      setAtomicNumber(parseInt(Z));
    }
  }, [router]);

  const detailData = getDetailData(atomicNumber)

  return (
    <View className={classNames('detail-page', theme)}>
      <NavigationHeader themeClass={theme} />
      <View className='content'>
        <View
          className='drawer'
          style={{
            '--margin-left': rect.windowWidth - rect.right + 'px',
            '--margin-top': rect.bottom + 8 + 'px'
          } as CSSProperties}
        >
          <ElementCard
            themeClass={theme}
            atomicNumber={atomicNumber}
            category={elementsCategories[atomicNumber - 1]}
            symbol={symbol[atomicNumber - 1]}
            atomicWeight={formalShortAtomicWeights[atomicNumber - 1]}
            name={zhCNNames[atomicNumber - 1]}
            pinyin={pinyin[atomicNumber - 1]}
            enName={enName[atomicNumber - 1]}
          />
          {
            Object.keys(detailData.properties).map((key) => (
              <View
                key={key}
                className='props-group-index'
                onClick={() => setScrollInto(key)}
              >
                <Image className='icon' src={icon[key]} />
                {propertiesGroupLabel[key]}
              </View>
            ))
          }
        </View>
        <ScrollView
          className='scroll-view'
          scrollIntoView={scrollInto}
          scrollY
          style={{
            '--margin-top': rect.bottom + 8 + 'px'
          } as CSSProperties}
        >
          <View className='main'>
            <ElementProfile
              atomicNumber={atomicNumber}
              category={elementsCategories[atomicNumber - 1]}
              symbol={symbol[atomicNumber - 1]}
              atomicWeight={formalShortAtomicWeights[atomicNumber - 1]}
              name={zhCNNames[atomicNumber - 1]}
              pinyin={pinyin[atomicNumber - 1]}
              enName={enName[atomicNumber - 1]}
            />
            {
              Object.keys(detailData.properties).map((key) => (
                <PropsGroup
                  id={key}
                  themeClass={theme}
                  key={key}
                  propsType={key}
                  data={detailData.properties[key]}
                />
              ))
            }
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
