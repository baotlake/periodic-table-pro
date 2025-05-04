import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import {
  MenuHomeLayout,
  BottomNavigation,
  AutoDisplayPropertiesModal,
  AutoZoomModal,
} from '@packages/components'
import ZoomablePtTable from '@/components/ZoomablePtTable'
import { useEffect } from 'react'

export const metadata: Metadata = {
  title: '元素周期表表PRO - 高颜值化学必备小工具',
  description:
    '元素周期表Pro —— 高颜值的化学元素周期表工具，提供全面的元素属性、图片和百科知识等。',
  icons: '/favicon.ico',
}

export default function Home() {
  redirect('/')

  // const router = useRouter()

  // useEffect(() => {
  //   router.replace('/')
  // }, [])

  return (
    <div className="">
      <MenuHomeLayout>
        <ZoomablePtTable />
        <BottomNavigation />

        <AutoDisplayPropertiesModal />
        <AutoZoomModal />
      </MenuHomeLayout>
    </div>
  )
}
