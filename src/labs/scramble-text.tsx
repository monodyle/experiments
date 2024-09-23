import {
  Form,
  Input,
  Label,
  Radio,
  RadioGroup,
  TextField,
  useContextProps,
} from 'react-aria-components'
import { useEffect, useReducer, useRef, useState } from 'react'
import Button from '../ui/button'

const example = 'HYPER SCRAMBLE TEXT EFFECT'
const chars =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*+-./:;<=>?[]{}()'

type ScrambleTextProps = React.HTMLAttributes<HTMLSpanElement> & {
  children?: string
  content?: string
  /**
   * Indicates the number of times each letter should be randomized.
   * @default 3
   */
  letterRandomizationCount?: number
  /**
   * Specifies the total duration (in milliseconds) of the randomization for each letter.
   * @default 100 (ms)
   */
  letterRandomizationDuration?: number
}
function ScrambleText({
  children,
  content,
  letterRandomizationCount = 3,
  letterRandomizationDuration = 100,
  ...props
}: ScrambleTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const text = children || content

  useEffect(() => {
    if (!ref.current || !text) return
    const el = ref.current

    let iteration = 0

    const interval = setInterval(() => {
      el.innerText = el.innerText
        .split('')
        .map((_, i) => {
          if (i < iteration || text[i] === ' ') {
            return text[i]
          }

          return chars[Math.floor(Math.random() * chars.length)]
        })
        .join('')

      if (iteration >= text.length) {
        clearInterval(interval)
      }

      iteration += 1 / letterRandomizationCount
    }, letterRandomizationDuration / letterRandomizationCount)

    return () => clearInterval(interval)
  }, [text, letterRandomizationDuration, letterRandomizationCount])

  if (!text)
    throw new Error(
      'ScrambleText component must receive at least one `children` or `content` property',
    )

  console.debug('letterRandomizationDuration', letterRandomizationDuration)

  return (
    <span ref={ref} {...props}>
      {text}
    </span>
  )
}

function Debug({
  config,
  setConfig,
  dispatch,
}: {
  config: ScrambleTextProps
  setConfig: React.Dispatch<React.SetStateAction<ScrambleTextProps>>
  dispatch: () => void
}) {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    console.debug(data)

    setConfig((original) => {
      if (data.content) {
        original.content = data.content.toString()
      }
      if (data.speed) {
        original.letterRandomizationDuration = 100 / Number(data.speed)
      }

      return original
    })
    dispatch()
  }

  return (
    <Form className="space-y-2" onSubmit={onSubmit}>
      <TextField
        type="text"
        name="content"
        defaultValue={config.children || config.content || example}
      >
        <Label className="text-xs font-semibold uppercase">Content</Label>
        <Input className="w-full text-sm py-2 px-4 bg-zinc-100 font-sans border border-zinc-900" />
      </TextField>
      <RadioGroup className="flex items-center gap-2" name="speed">
        <Label className="text-xs font-semibold uppercase">Speed</Label>
        <Radio
          value="0.2"
          className="text-xs font-semibold px-2 py-1 data-[selected]:bg-zinc-200 rounded"
        >
          x0.2
        </Radio>
        <Radio
          value="0.5"
          className="text-xs font-semibold px-2 py-1 data-[selected]:bg-zinc-200 rounded"
        >
          x0.5
        </Radio>
        <Radio
          value="1"
          className="text-xs font-semibold px-2 py-1 data-[selected]:bg-zinc-200 rounded"
        >
          x1
        </Radio>
      </RadioGroup>
      <Button type="submit" className="text-sm uppercase ml-auto">
        Update
      </Button>
    </Form>
  )
}

export default function ScrambleTextExample() {
  const [config, setConfig] = useState<ScrambleTextProps>({ content: example })
  const [key, update] = useReducer(() => Date.now(), Date.now())

  return (
    <div className="m-auto space-y-4 w-full max-w-lg">
      <ScrambleText
        className="font-mono text-3xl font-bold break-all"
        {...config}
        key={key}
      />
      <Debug config={config} setConfig={setConfig} dispatch={update} />
    </div>
  )
}
