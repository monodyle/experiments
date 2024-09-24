export default function Heading(
  props: React.HTMLAttributes<HTMLHeadingElement>,
) {
  return (
    <h2
      {...props}
      className={[
        'bg-zinc-900 text-zinc-50 font-semibold pb-0.5 pt-1 pl-1.5 pr-2.5 inline-block uppercase text-xs [clip-path:polygon(0_0,100%_0,100%_calc(100%-0.5rem),calc(100%-0.5rem)_100%,0_100%,0_100%)]',
        props.className,
      ].join(' ')}
    />
  )
}
