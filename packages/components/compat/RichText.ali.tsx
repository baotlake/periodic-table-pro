import parse from 'mini-html-parser2'
import type { RichTextProps } from '@tarojs/components'
import { components } from './Taro'
import { useEffect, useState, CSSProperties } from 'react'

type Props = {
  className?: string
  style?: CSSProperties
  nodes?: string
}

type Nodes = RichTextProps['nodes']

const { RichText } = components

export function AliRichText({ className, style, nodes: html }: Props) {
  const [nodes, setNodes] = useState<Nodes>([])

  useEffect(() => {
    parse(html, (error, value) => {
      !error && setNodes(value)
    })
  }, [html])

  return <RichText className={className} style={style} nodes={nodes} />
}
