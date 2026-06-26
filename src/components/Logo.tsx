import { Droplets } from 'lucide-react'

import { cn } from '@/lib/utils'

/**
 * Swappable brand lockup. Replace the icon + wordmark here once Andrew signs off
 * on the final logo (3 concepts live in /brand/). Everything else references <Logo/>.
 */
export function Logo({
  className,
  inverted = false,
}: {
  className?: string
  inverted?: boolean
}) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-water text-white">
        <Droplets className="h-5 w-5" />
      </span>
      <span
        className={cn(
          'font-heading text-xl font-extrabold tracking-tight',
          inverted ? 'text-white' : 'text-stone',
        )}
      >
        Stone<span className="text-water">Water</span>
      </span>
    </div>
  )
}
