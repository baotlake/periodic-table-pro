type UseRouter = () => {
  replace: (href: string, option?: { scroll: boolean }) => void
}

let useRouter: UseRouter = () => ({
  replace: () => {},
})

if (process.env.PLATFORM == 'next') {
  useRouter = require('next/navigation').useRouter
}

export { useRouter }
