import SquareButtonShimmer from '@components/Shimmers/SquareButtonShimmer'
import { EXPLORE, HOME, LIBRARY } from '@utils/url-path'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiHome } from 'react-icons/fi'
import { MdOutlineVideoLibrary } from 'react-icons/md'
import { RiLeafLine } from 'react-icons/ri'

const ToggleTheme = dynamic(() => import('./ToggleTheme'), {
  loading: () => <SquareButtonShimmer />,
  ssr: false
})

const Sidebar = () => {
  const router = useRouter()

  const isActivePath = (path: string) => router.pathname === path

  return (
    <div className="fixed top-0 bottom-0 left-0 items-start justify-between hidden w-[68px] p-1 m-2 bg-white border shadow dark:border-gray-900 rounded-xl dark:bg-black md:flex md:flex-col">
      <div className="flex flex-col w-full space-y-1.5">
        <Link href={HOME}>
          <a className="flex items-center justify-center p-3 focus:outline-none">
            <img
              src="/lenstube.svg"
              draggable={false}
              className="w-6 h-6 ml-0.5"
              alt=""
            />
          </a>
        </Link>
        <div className="flex flex-col w-full space-y-1">
          <Link href={HOME} passHref>
            <a
              className={clsx('rounded-lg py-2 2xl:py-2.5 group', {
                'bg-indigo-50 dark:bg-[#181818]': isActivePath(HOME),
                'hover:bg-gray-50 dark:hover:bg-[#181818]': !isActivePath(HOME)
              })}
            >
              <div className="flex flex-col pt-0.5 items-center space-y-1 group-hover:opacity-100 opacity-80">
                <FiHome className="text-xl" />
                <p className="text-[11px] font-medium">Home</p>
              </div>
            </a>
          </Link>
          <Link href={EXPLORE} passHref>
            <a
              className={clsx('rounded-lg py-2 2xl:py-2.5 group', {
                'bg-indigo-50 dark:bg-[#181818]': isActivePath(EXPLORE),
                'hover:bg-gray-50 dark:hover:bg-[#181818]':
                  !isActivePath(EXPLORE)
              })}
            >
              <div className="flex flex-col pt-0.5 items-center space-y-1 group-hover:opacity-100 opacity-80">
                <RiLeafLine className="text-xl" />
                <p className="text-[11px] font-medium">Explore</p>
              </div>
            </a>
          </Link>
          <Link href={LIBRARY} passHref>
            <a
              className={clsx('rounded-lg py-2 2xl:py-2.5 group', {
                'bg-indigo-50 dark:bg-[#181818]': isActivePath(LIBRARY),
                'hover:bg-gray-50 dark:hover:bg-[#181818]':
                  !isActivePath(LIBRARY)
              })}
            >
              <div className="flex flex-col items-center pt-0.5 space-y-1 group-hover:opacity-100 opacity-80">
                <MdOutlineVideoLibrary className="text-xl" />
                <p className="text-[11px] font-medium">Library</p>
              </div>
            </a>
          </Link>
        </div>
      </div>
      <ToggleTheme />
    </div>
  )
}

export default Sidebar