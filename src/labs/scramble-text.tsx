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

    const newConfig: ScrambleTextProps = {}
    if (data.content) {
      newConfig.content = data.content.toString()
    }
    if (data.speed) {
      newConfig.letterRandomizationDuration = 100 / Number(data.speed)
    }
    if (data.fontFamily) {
      newConfig.className =
        data.fontFamily.toString() === 'mono' ? 'font-mono' : 'font-sans'
    }

    setConfig((original) => ({ ...original, ...newConfig }))
    dispatch()
  }

  return (
    <Form className="border" onSubmit={onSubmit}>
      <div className="flex items-center border-b">
        <span className='text-xs font-semibold uppercase pl-4'>Debug Tool</span>
        <Button type="submit" className="text-xs uppercase ml-auto">
          Run
        </Button>
      </div>
      <div className="space-y-2 p-4">
        <TextField
          type="text"
          name="content"
          defaultValue={config.children || config.content || example}
        >
          <Label className="text-xs font-semibold uppercase">Content</Label>
          <Input className="w-full text-sm py-1 px-2 bg-zinc-100 font-sans border border-zinc-200" />
        </TextField>
        <RadioGroup
          name="speed"
          defaultValue="1"
          className="flex items-center gap-2"
        >
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
        <RadioGroup
          name="fontFamily"
          defaultValue="mono"
          className="flex items-center gap-2"
        >
          <Label className="text-xs font-semibold uppercase">Font</Label>
          <Radio
            value="sans"
            className="text-xs font-semibold px-2 py-1 data-[selected]:bg-zinc-200 rounded"
          >
            Sans Serif
          </Radio>
          <Radio
            value="mono"
            className="text-xs font-semibold px-2 py-1 data-[selected]:bg-zinc-200 rounded"
          >
            Monospace
          </Radio>
        </RadioGroup>
      </div>
    </Form>
  )
}

export default function ScrambleTextExample() {
  const [config, setConfig] = useState<ScrambleTextProps>({ content: example })
  const [key, update] = useReducer(() => Date.now(), Date.now())

  return (
    <div className="m-auto space-y-4 w-full max-w-lg">
      <ScrambleText
        {...config}
        className={[
          'text-3xl font-bold break-all',
          config.className || 'font-mono',
        ].join(' ')}
        key={key}
      />
      <Debug config={config} setConfig={setConfig} dispatch={update} />
    </div>
  )
}
