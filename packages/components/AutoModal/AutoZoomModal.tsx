'use client'

import ZoomModal from '../Modal/ZoomModal'
import { useAtom } from 'jotai'
import { themeModeState, zoomModalVisible } from '../recoil/atom'

export function AutoZoomModal() {
  const [mode] = useAtom(themeModeState)
  const [visible, setVisible] = useAtom(zoomModalVisible)

  const handleClose = () => {
    setVisible(false)
  }

  return <ZoomModal themeClass={mode} visible={visible} onClose={handleClose} />
}
