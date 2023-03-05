import { useContext, useState } from 'react'
import classNames from 'classnames/bind'
import ElementCard from './ElementCard'
import ElementProfile from './ElementProfile'
import PropsGroup from './PropsGroup'
import { Context } from '../state'
import { Image, ScrollView } from '../compat'
import {
    elementsCategories,
    symbol,
    formalShortAtomicWeights,
    zhCNNames,
    pinyin,
    enName,
    getDetailData,
    propertiesGroupLabel,
    DetailData,
    Categories,
} from '@periodic-table-pro/data'

import styles from './detailContent.module.scss'

import outlineImg from "../assets/icons/outline.svg"
import physicsImg from "../assets/icons/physics.svg"
import atomImg from "../assets/icons/atom.svg"
import timeImg from "../assets/icons/time.svg"
import otherImg from "../assets/icons/other.svg"
import earthImg from "../assets/icons/earth.svg"
import magnetImg from "../assets/icons/magnet.svg"
import cyclopediaImg from '../assets/icons/wikipedia_w.svg'

const cx = classNames.bind(styles)

const icon: Record<keyof DetailData['properties'], any> = {
    cyclopedia: cyclopediaImg,
    basic: outlineImg,
    physical: physicsImg,
    atomic: atomImg,
    other: otherImg,
    history: timeImg,
    abundance: earthImg,
    electromagnetic: magnetImg,
}

type Props = {
    detailData: DetailData
}

export function DetailContent({ detailData }: Props) {
    const Z = detailData.atomicNumber
    const {
        state: {
            theme: { mode: themeMode },
            menuButtonClientRect: rect,
        } } = useContext(Context)
    const [scrollInto, setScrollInto] = useState('')

    const category = elementsCategories[Z - 1]

    return (
        <div
            className={cx('detail-content', themeMode, Categories[category])}
        >
            <div
                className={cx('drawer')}
                style={{
                    '--margin-left': rect.windowWidth - rect.right + 'px',
                    '--margin-top': rect.bottom + 8 + 'px',
                } as React.CSSProperties}
            >
                <ElementCard
                    themeClass={themeMode}
                    atomicNumber={Z}
                    category={category}
                    symbol={symbol[Z - 1]}
                    atomicWeight={formalShortAtomicWeights[Z - 1]}
                    name={zhCNNames[Z - 1]}
                    pinyin={pinyin[Z - 1]}
                    enName={enName[Z - 1]}
                />
                {
                    Object.keys(detailData.properties).map((key) => (
                        <div
                            key={key}
                            className={cx('drawer-item')}
                            onClick={() => setScrollInto(key)}
                        >
                            <Image className={cx('drawer-item-icon')} src={icon[key]} />
                            {propertiesGroupLabel[key]}
                        </div>
                    ))
                }
            </div>

            <ScrollView
                className={cx('scroll-view')}
                scrollIntoView={scrollInto}
                scrollY
                style={{
                    '--margin-top': rect.bottom + 8 + 'px'
                } as React.CSSProperties}
            >
                <div className={cx('main')}>
                    <ElementProfile
                        atomicNumber={Z}
                        category={category}
                        symbol={symbol[Z - 1]}
                        atomicWeight={formalShortAtomicWeights[Z - 1]}
                        name={zhCNNames[Z - 1]}
                        pinyin={pinyin[Z - 1]}
                        enName={enName[Z - 1]}
                    />
                    {
                        Object.keys(detailData.properties).map((key) => (
                            <PropsGroup
                                id={key}
                                key={key}
                                propsType={key as any}
                                themeClass={themeMode}
                                symbol={detailData.symbol}
                                Z={Z}
                                data={detailData.properties[key]}
                            />
                        ))
                    }
                    {/* {
                        PLATFORM === 'weapp' && DETAIL_CUSTOM_AD &&
                        <AdCustom unitId={DETAIL_CUSTOM_AD} style={{ margin: 'auto' }}></AdCustom>
                    } */}
                </div>
            </ScrollView>
        </div>
    )
}

export default DetailContent
