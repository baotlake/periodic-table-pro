import { Metadata } from 'next'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  MenuHomeLayout,
  ZoomablePT,
  BottomNavigation,
  weappPath2Web,
} from '@periodic-table-pro/components'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '元素周期表表PRO - 高颜值化学必备小工具',
    description:
      '元素周期表Pro —— 高颜值的化学元素周期表工具，提供全面的元素属性、图片和百科知识等。',
    icons: '/favicon.ico',
    viewport: 'width=device-width, initial-scale=1',
  }
}
export default function Home() {
  // const router = useRouter()

  // useEffect(() => {
  //   const path = weappPath2Web(location.href)
  //   router.replace(path)
  // }, [router])

  return (
    <div className="">
      <MenuHomeLayout>
        <ZoomablePT />
        <BottomNavigation />
      </MenuHomeLayout>
    </div>
  )
}
