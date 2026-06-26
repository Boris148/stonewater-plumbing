import { cn } from '@/lib/utils'

/**
 * StoneWater brand lockup — "droplet on stone" (concept 3, picked by Jeremy 2026-06-26).
 * A water droplet whose top is water-blue and whose base is stone-gray, split by a
 * white wave. Everything on the site references <Logo/>, so swapping the final
 * vector here updates the whole brand in one place.
 */
export function Logo({
  className,
  inverted = false,
  showSubtitle = true,
}: {
  className?: string
  inverted?: boolean
  showSubtitle?: boolean
}) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <DropletMark className="h-9 w-9 shrink-0" />
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            'font-heading text-xl font-extrabold tracking-tight',
            inverted ? 'text-white' : 'text-stone',
          )}
        >
          Stone
          <span className={inverted ? 'text-white/70' : 'text-stone-light'}>
            Water
          </span>
        </span>
        {showSubtitle && (
          <span
            className={cn(
              'mt-0.5 text-[9px] font-semibold uppercase tracking-[0.2em]',
              inverted ? 'text-white/60' : 'text-stone-light/80',
            )}
          >
            Plumbing · San Antonio
          </span>
        )}
      </div>
    </div>
  )
}

function DropletMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-label="StoneWater"
    >
      <defs>
        <clipPath id="sw-drop">
          <path d="M20 4 C20 4 33 19 33 27 A13 13 0 0 1 7 27 C7 19 20 4 20 4 Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#sw-drop)">
        {/* stone base */}
        <rect x="0" y="0" width="40" height="40" fill="#8B939C" />
        {/* water top with wavy lower edge */}
        <path
          d="M0 0 H40 V24 C32 28 26 20 20 24 C14 28 8 20 0 24 Z"
          fill="#4FB0E6"
        />
        {/* white wave divider */}
        <path
          d="M0 24 C8 20 14 28 20 24 C26 20 32 28 40 24"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.8"
        />
        {/* highlight */}
        <path
          d="M15 11 C13 15 12 18 13 21"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.5"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </g>
      {/* crisp outline to keep the droplet readable on light backgrounds */}
      <path
        d="M20 4 C20 4 33 19 33 27 A13 13 0 0 1 7 27 C7 19 20 4 20 4 Z"
        fill="none"
        stroke="#2B2F36"
        strokeOpacity="0.08"
        strokeWidth="1"
      />
    </svg>
  )
}
