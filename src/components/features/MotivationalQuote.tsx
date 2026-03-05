import { Card, CardBody } from '@/components/ui'

interface MotivationalQuoteProps {
  text: string
  author: string
  book?: string
}

export function MotivationalQuote({
  text,
  author,
  book,
}: MotivationalQuoteProps) {
  return (
    <Card className="bg-gradient-to-r from-success to-primary text-white">
      <CardBody className="text-center py-8">
        <svg className="w-8 h-8 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-4.5-5-7-5H3c0 1-1 1-1 3v6c0 1 0 1 1 1s1-1 1-3v-4c1 0 2 1 3 3s1 4 1 6-1 4-3 6-2 3-3 3c-1 0-1 1-1 1z" />
        </svg>

        <p className="text-lg font-semibold italic mb-4 leading-relaxed">{text}</p>

        <div className="flex flex-col items-center gap-1">
          <p className="font-heading font-bold">— {author}</p>
          {book && <p className="text-sm opacity-75">{book}</p>}
        </div>
      </CardBody>
    </Card>
  )
}
