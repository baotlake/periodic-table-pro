import ZoomModal from "../Modal/ZoomModal"
import { useRecoilState } from "recoil"
import { themeModeState, zoomModalVisible } from "../recoil/atom"


export function AutoZoomModal() {
    const [mode] = useRecoilState(themeModeState)
    const [visible, setVisible] = useRecoilState(zoomModalVisible)

    const handleClose = () => {
        setVisible(false)
    }

    return (
        <ZoomModal
            themeClass={mode}
            visible={visible}
            onClose={handleClose}
        />
    )
}