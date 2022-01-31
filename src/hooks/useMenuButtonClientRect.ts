import { useCallback, useEffect, useState } from "react";
import Taro, { useResize, useDidShow } from "@tarojs/taro";

type MenuButtonRect = ReturnType<typeof Taro.getMenuButtonBoundingClientRect> & {
  windowWidth: number;
  windowHeight: number;
};

const defaultMenuRect = {
  bottom: 56,
  height: 32,
  left: 320,
  right: 407,
  top: 24,
  width: 87,
  windowWidth: 414,
  windowHeight: 736,
}

export default function useMenuButtonClientRect() {
  const [menuButtonRect, setMenuButtonRect] = useState<MenuButtonRect>(defaultMenuRect);

  const getClientRect = useCallback(() => {
    const { windowWidth: ww, windowHeight: wh } = Taro.getSystemInfoSync()
    if (process.env.TARO_ENV === 'weapp') {
      Taro.nextTick(() => {
        const rect = Taro.getMenuButtonBoundingClientRect();
        setMenuButtonRect({
          ...rect,
          windowWidth: ww,
          windowHeight: wh,
        });
      })
    }
    if (process.env.TARO_ENV === 'h5') {
      const rect = defaultMenuRect;
      const rm = rect.windowWidth - rect.right
      setMenuButtonRect({
        ...rect,
        right: ww - rm,
        left: ww - rect.width - rm,
        windowWidth: ww,
        windowHeight: wh,
      });
    }
  }, [])

  useEffect(() => {
    getClientRect();
    window.addEventListener("resize", getClientRect);
    return () => {
      window.removeEventListener("resize", getClientRect);
    };
  }, []);

  useResize(getClientRect)
  useDidShow(getClientRect)

  return menuButtonRect;
}
