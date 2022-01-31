import { useState, CSSProperties } from 'react'
import { View, RichText } from '@tarojs/components'
import classNames from 'classnames'
import { NavigationHeader } from '../../components/NavigationBar'
import { chartData, notes } from '../../data/solubility'
import useMenuButtonClientRect from "../../hooks/useMenuButtonClientRect"
import useThemeMode from '../../hooks/useThemeMode'
import useShareMessage from '../../hooks/useShareMessage'
import useShareTimeline from '../../hooks/useShareTimeline'

import './index.scss'

const classMap = {
  'S': 'S',
  'sS': 'sS',
  'I': 'I',
  'X': 'X',
  'R': 'R',
  '?': 'unavailable',
}

export default function SolubilityTable() {

  const rect = useMenuButtonClientRect()
  const [zh, setZh] = useState(true)
  const [theme] = useThemeMode()

  useShareMessage({
    path: 'pages/solubility-table/index',
    theme,
  })
  useShareTimeline()

  return (
    <View className={classNames('page', theme)}>
      <NavigationHeader
        themeClass={theme}
        className='navigation'
        title='溶解性表'
      />
      <View
        className='content'
        style={{
          paddingTop: rect.bottom + 8 + 'px',
        }}
      >
        <View className='table-wrapper'>
          <View className='table'>
            <View className='head top'>
              {
                chartData.column.map((column, i) => (
                  <RichText className='anion' key={i} nodes={column} />
                ))
              }
            </View>
            <View className='head bottom'>
              {
                chartData.column.map((column, i) => (
                  <RichText className='anion' key={i} nodes={column} />
                ))
              }
            </View>
            <View className='head left'>
              {
                chartData.row.map((row, i) => (
                  <RichText className='cation' key={i} nodes={row} />
                ))
              }
            </View>

            <View
              className='content'
              style={{
                '--columns': chartData.column.length + '',
              } as CSSProperties}
            >
              {
                chartData.content.map((rowList, i) => (
                  <>
                    {
                      rowList.map((item, j) => (
                        <View
                          key={i + '-' + j}
                          className={'item ' + classMap[item]}
                        >{zh ? notes[item].initial : item}</View>
                      ))
                    }
                  </>
                ))
              }
            </View>
          </View>
        </View>

        <View>
          <View className='key-table'>
            {
              Object.keys(notes).map(key => (
                <>
                  <View className={classNames('cell', key)}>{zh ? notes[key].initial : key}</View>
                  <View className='cell'>{notes[key].value}</View>
                  <View className='cell'>{notes[key].detail}</View>
                </>
              ))
            }
          </View>
        </View>
      </View>
    </View>
  )
}
