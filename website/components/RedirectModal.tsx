import { Modal, getStorage, setStorage } from '@packages/components'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'

const cx = classNames.bind({})

let show = false

export default function RedirectModal() {
  const [visible, setVisible] = useState(false)
  const [count, setCount] = useState(5)

  useEffect(() => {
    let stale = false
    const isZiziyi = location.origin.endsWith('ziziyi.com')

    getStorage({
      noRedirectZiziyi: 0,
    }).then(({ noRedirectZiziyi }) => {
      if (stale) {
        return
      }
      if (!noRedirectZiziyi && !isZiziyi && show != true) {
        show = true
        setVisible(true)
      }
    })

    return () => {
      stale = true
    }
  }, [])

  useEffect(() => {
    if (visible && count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000)
      return () => {
        clearTimeout(timer)
      }
    }

    const isLocal = /127\.0\.0\.|localhost:/.test(location.origin)

    if (visible && count <= 0 && count > -100 && !isLocal) {
      open('https://pt.ziziyi.com', '_top')
    }
  }, [visible, count])

  const handleCancel = () => {
    setVisible(false)
  }

  const handleNoMore = () => {
    setVisible(false)
    setStorage({ noRedirectZiziyi: Date.now() })
  }

  return (
    <Modal
      className={cx('w-2/3 max-w-md h-auto')}
      visible={visible}
      destroyOnClose
    >
      <div className={'p-5 flex flex-col'}>
        <div className="flex items-center">
          <img className="w-6 h-6 rounded-full mr-2" src="/pwa/logo.svg" />
          <div className=" font-bold ">✨新域名上线啦🎉🎉🎉</div>
        </div>

        <div className="mt-6 mx-auto">
          <a
            className="text-4xl bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-600 text-transparent font-bold"
            href="https://pt.ziziyi.com"
          >
            pt.ziziyi.com
          </a>
          <div className="flex items-center">
            <span className="text-4xl invisible">pt.</span>
            <span className="text-[1.65rem] font-bold">孜孜以</span>
            <span
              className={cx(
                'inline-flex items-center justify-center mx-1',
                'w-5 h-5 p-1 text-xs font-bold rounded-full translate-y-[3px]',
                'bg-black text-white'
              )}
            >
              求
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={handleCancel}
            className={cx(
              'py-2 px-4 rounded-md border-none bg-slate-200 text-base'
            )}
          >
            取消自动转跳 {count >= 0 ? `(${count}s)` : ''}
          </button>
          <button
            onClick={handleNoMore}
            className={cx(
              'py-2 px-4 rounded-md border-none bg-slate-200 text-base opacity-80'
            )}
          >
            不再提示
          </button>
        </div>
      </div>
    </Modal>
  )
}
