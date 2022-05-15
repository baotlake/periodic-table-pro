import React, { PropsWithChildren, CSSProperties } from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import MenuButton from "./MenuButton";
import useMenuButtonClientRect from "../../hooks/useMenuButtonClientRect";

import "./navigationBar.scss"

type Props = PropsWithChildren<{
  className?: string
}>;

export default function NavigationBar({ children, className }: Props) {
  const rect = useMenuButtonClientRect();
  // console.log(rect);

  return (
    <View
      className={classNames("navigation-bar", className)}
      style={{
        paddingTop: rect.top + 'PX',
        paddingRight: rect.windowWidth - rect.left + 'PX',
        height: rect.height + 'PX',
        width: rect.left + 'PX',
        "--size": rect.height + 'PX',
        "--margin": rect.windowWidth - rect.right + 'PX',
      } as CSSProperties}
    >
      {children}
      {process.env.TARO_ENV === 'h5' &&
        (
          <MenuButton
            style={{
              position: 'absolute',
              left: rect.left + 'px',
              background: 'rgba(0,0,0,0.15)',
              width: rect.width + 'px',
              height: rect.height + 'px',
              borderRadius: rect.height / 2 + 'px',
            }}
          />
        )
      }
    </View>
  );
}
