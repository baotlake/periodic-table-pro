import { View, Video } from "@tarojs/components"

import "./index.scss"

type Props = {
    src: string
    ratio?: number
}

export function VideoDemo({ src, ratio = 16 / 9 }: Props) {

    return (
        <View
            className="video-demo"
            style={{
                paddingBottom: 1 / ratio * 100 + '%',
            }}
        >
            <View className="container">
                <Video
                    controls={false}
                    showProgress={false}
                    showFullscreenBtn={false}
                    autoPauseIfNavigate={false}
                    autoPauseIfOpenNative={false}
                    showPlayBtn={false}
                    showCenterPlayBtn={false}
                    enableProgressGesture={false}
                    loop
                    muted
                    autoplay
                    src={src}
                />
            </View>
        </View>
    )
}