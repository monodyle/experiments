import { useEffect, useReducer, useRef } from 'react'
import Button from '../ui/button'

const chars =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*+-./:;<=>?[]{}()'

function ScrambleText({
  children,
  ...props
}: { children: string } & React.HTMLAttributes<HTMLSpanElement>) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current

    let iteration = 0

    const interval = setInterval(() => {
      el.innerText = el.innerText
        .split('')
        .map((_, i) => {
          if (i < iteration || children[i] === ' ') {
            return children[i]
          }

          return chars[Math.floor(Math.random() * chars.length)]
        })
        .join('')

      if (iteration >= children.length) {
        clearInterval(interval)
      }

      iteration += 1 / 3 // transform 3 characters
    }, 30)

    return () => clearInterval(interval)
  }, [children])

  return (
    <span ref={ref} {...props}>
      {children}
    </span>
  )
}

const text = 'HYPER SCRAMBLE TEXT EFFECT'
export default function ScrambleTextExample() {
  const [state, reload] = useReducer((prev) => prev + 1, 0)

  return (
    <div className="m-auto space-y-4">
      <ScrambleText className="font-mono text-3xl font-bold" key={state}>
        {text}
      </ScrambleText>
      <div>
        <Button onPress={() => reload()} className='text-sm'>RESET</Button>
      </div>
    </div>
  )
}
