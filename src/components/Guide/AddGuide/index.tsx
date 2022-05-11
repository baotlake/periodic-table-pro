import { View } from "@tarojs/components"
import classNames from "classnames"
import useMenuButtonClientRect from "../../../hooks/useMenuButtonClientRect"
import useAddGuide from "./useAddGuide"


import './index.scss'

type Props = {
    themeClass?: string
}

export function AddGuide({ themeClass }: Props) {

    const rect = useMenuButtonClientRect()
    const [visible, handleClose] = useAddGuide()

    return (
        <> {
            visible &&
            <View
                className={classNames('add-guide', themeClass)}
                style={{
                    top: rect.top + rect.height + 8 + 'px',
                    left: rect.left + rect.width / 4 + 'px',
                }}
            >
                <View className='box'>
                    <View className='arrow' />
                    <View>
                        “添加”后使用更方便！
                    </View>
                    <View
                        className='close'
                        onClick={handleClose}
                    />
                </View>
            </View>
        }

        </>
    )
}