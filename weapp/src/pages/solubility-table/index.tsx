import { useState, CSSProperties } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { NavigationHeader, RichText } from '@periodic-table-pro/components'
import { chartData, notes } from '@periodic-table-pro/data'
import useShareMessage from '../../hooks/useShareMessage'
import useShareTimeline from '../../hooks/useShareTimeline'
import { useAtom } from 'jotai'
import {
  menuButtonClientRect,
  themeModeState,
} from '@periodic-table-pro/components/recoil/atom'
import './index.scss'

const classMap = {
  S: 'S',
  sS: 'sS',
  I: 'I',
  X: 'X',
  R: 'R',
  '?': 'unavailable',
}

export default function SolubilityTable() {
  const [zh, setZh] = useState(true)
  const [theme] = useAtom(themeModeState)
  const [rect] = useAtom(menuButtonClientRect)

  useShareMessage({
    path: 'pages/solubility-table/index',
    theme,
  })
  useShareTimeline()

  return (
    <View className={classNames('page', theme)}>
      <NavigationHeader
        background
        themeClass={theme}
        className="navigation"
        title="溶解性表"
      />
      <View
        className="content"
        style={{
          paddingTop: rect.bottom + 8 + 'px',
        }}
      >
        <View className="table-wrapper">
          <View className="table">
            <View className="head top">
              {chartData.column.map((column, i) => (
                <RichText className="anion" key={i} nodes={column} />
              ))}
            </View>
            <View className="head bottom">
              {chartData.column.map((column, i) => (
                <RichText className="anion" key={i} nodes={column} />
              ))}
            </View>
            <View className="head left">
              {chartData.row.map((row, i) => (
                <RichText className="cation" key={i} nodes={row} />
              ))}
            </View>

            <View
              className="content"
              style={
                {
                  '--columns': chartData.column.length + '',
                } as CSSProperties
              }
            >
              {chartData.content.map((rowList, i) => (
                <>
                  {rowList.map((item, j) => (
                    <View
                      key={i + '-' + j}
                      className={'item ' + classMap[item]}
                    >
                      {zh ? notes[item].initial : item}
                    </View>
                  ))}
                </>
              ))}
            </View>
          </View>
        </View>

        <View>
          <View className="key-table">
            {Object.keys(notes).map((key) => (
              <>
                <View className={classNames('cell', key)}>
                  {zh ? notes[key].initial : key}
                </View>
                <View className="cell">{notes[key].value}</View>
                <View className="cell">{notes[key].detail}</View>
              </>
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}
