import { useState, useEffect } from 'react'
import { getStorage, setStorage } from '../../utils/storage'
import { reportEvent } from '../../utils/analytics'

const PLATFORM = process.env.PLATFORM

export default function useAddGuide(): [boolean, () => void] {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        let mount = true
        let closedAt = 0
        let showAt = 0

        const getCloseAtPromise = getStorage('closeAddGuideAt')

        const getShowCountPromise = getStorage('showAddGuideAt')

        getCloseAtPromise
            .then(({ closeAddGuideAt }) => {
                closedAt = closeAddGuideAt
            })
            .catch(() => { })
            .then(() => {
                return getShowCountPromise
            })
            .then(({ showAddGuideAt }) => {
                showAt = showAddGuideAt
            })
            .catch(() => { })
            .then(() => {
                const now = Date.now()
                const days21 = 1000 * 60 * 60 * 24 * 21
                const hour6 = 1000 * 60 * 60 * 6
                const weapp = PLATFORM === 'weapp' || process.env.NODE_ENV === 'development'


                if (now - closedAt > days21 && now - showAt > hour6 && weapp) {
                    setTimeout(() => {
                        if (mount) {
                            setVisible(true)
                            reportEvent('add_guide', {})
                            setStorage({ showAddGuideAt: Date.now() })
                        }
                    }, 1000 * 4)
                    // 18 seconds
                    setTimeout(() => {
                        mount && setVisible(false)
                    }, 1000 * 24)
                }
            })

        return () => {
            mount = false
        }
    }, [])

    const handleClose = () => {
        setVisible(false)
        setStorage({
            closeAddGuideAt: Date.now(),
        })
        reportEvent('close_add_guide', {})
    }

    return [visible, handleClose]
}