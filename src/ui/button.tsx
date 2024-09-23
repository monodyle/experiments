import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from 'react-aria-components'

type ButtonProps = AriaButtonProps
export default function Button({ className, ...props }: ButtonProps) {
  return (
    <AriaButton
      {...props}
      className={[
        'bg-zinc-900 hover:bg-zinc-800 text-zinc-50 cursor-pointer flex justify-center font-semibold py-2 pl-6 pr-5 [clip-path:polygon(0_0,100%_0,100%_100%,100%_100%,12px_100%,0_calc(100%-12px))] hover:scale-[1.02] active:scale-[0.95] ease-in-out transition-transform duration-100',
        className,
      ].join(' ')}
    />
  )
}
