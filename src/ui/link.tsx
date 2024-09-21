import { Link as AriaLink, type LinkProps } from 'react-aria-components'
import { ChevronUpRight } from '../icons/external-link'
import { useMemo } from 'react'

export default function Link({
  children,
  ...props
}: LinkProps & { children?: React.ReactNode }) {
  const isExternalLink = useMemo(() => {
    try {
      if (!props.href) return false
      const url = new URL(props.href)
      return url.origin !== window.location.origin
    } catch (_) {
      return false
    }
  }, [props.href])

  return (
    <AriaLink
      {...props}
      className={[
        'text-zinc-500 hover:text-zinc-700',
        isExternalLink && 'relative',
        props.className,
      ].join(' ')}
    >
      {children}
      {isExternalLink && (
        <ChevronUpRight className="absolute -top-0.5 -right-2.5" />
      )}
    </AriaLink>
  )
}
