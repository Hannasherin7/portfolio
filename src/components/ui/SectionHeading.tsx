import Scramble from './Scramble'
import AnimatedText from './AnimatedText'

type Props = {
  index: string
  eyebrow: string
  title: string
  className?: string
}

export default function SectionHeading({ index, eyebrow, title, className = '' }: Props) {
  return (
    <div className={className}>
      <div className="mb-5 flex items-center gap-3 font-mono text-[11px]">
        <span className="text-accent2">{index}</span>
        <span className="h-px w-8 bg-line" />
        <Scramble
          text={`// ${eyebrow.toLowerCase()}`}
          className="uppercase tracking-[0.2em] text-mist"
          speed={22}
        />
      </div>
      <AnimatedText
        as="h2"
        text={title}
        by="words"
        className="max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-tightest sm:text-5xl lg:text-6xl"
      />
    </div>
  )
}
