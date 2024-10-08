import { useLocation } from 'react-router-dom'
import { routes } from './routes'
import Link from './ui/link'
import { Fragment } from 'react/jsx-runtime'

const links = [routes.scramble_text, routes.wip]

function Header() {
  const { pathname } = useLocation()

  return (
    <>
      <div className="border-b border-zinc-300" />
      <header className="border-b border-x border-zinc-300">
        <nav className="size-full flex items-center justify-center gap-4 text-sm font-medium text-zinc-300 select-none">
          <Link
            href="https://minhle.space"
            target="_blank"
            rel="noreferrer noopener"
            className="text-zinc-500 hover:text-zinc-700"
          >
            Space
          </Link>
          {links.map((link) => (
            <Fragment key={link.path}>
              ⟡
              <Link
                href={link.path}
                className="text-zinc-500 hover:text-zinc-700 data-[active='true']:text-zinc-700"
                data-active={pathname === link.path}
              >
                {link.label}
              </Link>
            </Fragment>
          ))}
        </nav>
      </header>
      <div className="border-b border-zinc-300" />
    </>
  )
}

export default function Layout({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <main className="grid grid-cols-[4rem_1fr_4rem] grid-rows-[4rem_1fr_4rem] min-h-screen relative">
      <Header />
      <div className="border-b border-zinc-300" />
      <div
        className={[
          'border-x border-b border-zinc-300 w-full p-8',
          className,
        ].join(' ')}
        {...props}
      >
        {children}
      </div>
      <div className="border-b border-zinc-300" />
      <Footer />
    </main>
  )
}

function Footer() {
  return (
    <>
      <div />
      <footer className="flex border-x border-zinc-300">
        <span className="m-auto text-sm font-medium text-zinc-500">
          <a
            href="https://github.com/monodyle/experiments"
            target="_blank"
            rel="noreferrer noopener"
            className="border-b border-dashed hover:border-zinc-500 hover:text-zinc-700"
          >
            experiments
          </a>{' '}
          by{' '}
          <a
            href="https://github.com/monodyle"
            target="_blank"
            rel="noreferrer noopener"
            className="border-b border-dashed hover:border-zinc-500 hover:text-zinc-700"
          >
            monodyle
          </a>
        </span>
      </footer>
      <div />
    </>
  )
}
