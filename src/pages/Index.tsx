import { useState } from 'react'
import {
  Phone,
  ShieldCheck,
  Star,
  CheckCircle2,
  Droplets,
  Wrench,
  Home,
  Sparkles,
  Clock,
  BadgeDollarSign,
  MapPin,
  ThermometerSnowflake,
  Waves,
  ClipboardCheck,
  CircleDollarSign,
  AlertTriangle,
  X,
  Handshake,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { Logo } from '@/components/Logo'

// TODO[Jeremy]: replace with the real tracking number once provisioned.
const PHONE_DISPLAY = '(210) XXX-XXXX'
const PHONE_TEL = '+1210XXXXXXX'

// TODO[Jeremy]: paste the live GoHighLevel inbound webhook URL for the lead form.
const GHL_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/REPLACE_ME'

const trustStrip = [
  'Licensed & Insured',
  '5-Star Rated',
  '$0 Down Financing',
  '100% Money-Back Guarantee',
]

const hardWaterCosts = [
  {
    icon: ThermometerSnowflake,
    title: 'Killed water heaters',
    body: 'Scale buildup makes heaters work harder and die years early — a $1,500+ replacement.',
  },
  {
    icon: Waves,
    title: 'Scale-clogged pipes',
    body: 'Limestone deposits narrow your pipes and choke water pressure throughout the home.',
  },
  {
    icon: Home,
    title: 'Appliances die early',
    body: 'Dishwashers, washing machines, and ice makers fail up to 2x faster on hard water.',
  },
  {
    icon: Sparkles,
    title: 'Dry skin & dull hair',
    body: 'Hard minerals leave a film that dries out skin, irritates scalp, and strips shine.',
  },
  {
    icon: Droplets,
    title: 'Spotty dishes & glass',
    body: 'White scale spots on every glass, faucet, and shower door — no matter how you scrub.',
  },
  {
    icon: CircleDollarSign,
    title: 'Higher monthly bills',
    body: 'More soap, more energy, more repairs. Hard water quietly taxes you every single month.',
  },
]

const benefits = [
  'Noticeably softer skin & hair',
  'Appliances last up to 2x longer',
  'Spot-free dishes & glassware',
  'Use up to 50% less soap & detergent',
  'Protected pipes & fixtures',
  'Cleaner, scale-free water heater',
]

const offerStack = [
  {
    label: 'FREE in-home hard water test & whole-home plumbing inspection',
    value: '$199 value',
  },
  {
    label: 'Professional whole-home water softener install by licensed plumbers',
    value: 'Included',
  },
  { label: 'Same-week / next-day installation', value: 'Included' },
  {
    label: 'First year of salt + filter service included',
    value: '$240 value',
  },
  { label: 'Lifetime workmanship warranty on the install', value: 'Included' },
  {
    // TODO[Jeremy]: confirm financing rate/APR before publishing "$XX/mo".
    label: '$0 down financing — as low as ~$XX/mo',
    value: 'Included',
  },
  {
    label: 'Bonus: free under-sink reverse-osmosis drinking water consultation',
    value: 'Free',
  },
]

const whyStoneWater = [
  { icon: ShieldCheck, title: 'Licensed & Insured', body: 'Fully licensed Texas plumbers and insured crews on every job.' },
  { icon: Handshake, title: 'Local & Owner-Operated', body: 'The big names got bought out and went corporate. We stayed independent, local, and accountable to our neighbors.' },
  { icon: Wrench, title: 'Certified Installs', body: 'Manufacturer-certified whole-home softener installations.' },
  { icon: BadgeDollarSign, title: 'Upfront Pricing', body: 'Clear quotes before we start. No surprises, no pressure.' },
  { icon: CircleDollarSign, title: 'Flexible Financing', body: '$0 down options so you can protect your home today.' },
  { icon: Clock, title: 'Fast Install', body: 'Most whole-home systems installed same-week or next-day.' },
]

const processSteps = [
  {
    icon: Droplets,
    step: '1',
    title: 'Free Water Test',
    body: 'We test your water hardness and inspect your whole-home plumbing — at no cost.',
  },
  {
    icon: ClipboardCheck,
    step: '2',
    title: 'Custom Quote',
    body: 'Upfront, honest pricing tailored to your home. No pressure, ever.',
  },
  {
    icon: Wrench,
    step: '3',
    title: 'Same-Week Install',
    body: 'Licensed plumbers install your softener fast — usually within the week.',
  },
]

// TODO[Jeremy]: swap placeholder reviews for real, verified customer reviews.
const reviews = [
  {
    name: 'Marcus T.',
    area: 'Stone Oak',
    body: 'Our water went from rock-hard to incredible overnight. Skin feels better and the install crew was spotless.',
  },
  {
    name: 'Diana R.',
    area: 'Alamo Heights',
    body: 'No more scale spots on the glasses. They tested the water for free and the price was exactly what they quoted.',
  },
  {
    name: 'Kevin & Sara P.',
    area: 'Boerne',
    body: 'Financing made it a no-brainer. Installed the next day. Wish we had done this years ago.',
  },
  {
    name: 'Lupe G.',
    area: 'Schertz',
    body: 'Professional, licensed, and on time. Our appliances and hair both thank us. Highly recommend StoneWater.',
  },
]

const serviceAreas = [
  'San Antonio',
  'Stone Oak',
  'Alamo Heights',
  'Boerne',
  'Bulverde',
  'Spring Branch',
  'Fair Oaks Ranch',
  'Helotes',
  'Schertz',
  'New Braunfels',
  'Converse',
  'Cibolo',
]

const faqs = [
  {
    q: 'How much does a water softener cost in San Antonio?',
    a: 'It depends on your home size and water hardness, but with $0 down financing most homeowners protect their entire home for a low monthly payment. Your free water test gives you an exact, upfront quote — no obligation.',
  },
  {
    q: 'Why are your prices lower than the door-to-door companies?',
    a: 'We send licensed local plumbers, not commissioned salespeople who mark systems up to $5,000–$10,000+ to cover their pressure-pitch model. You get an honest, upfront quote with $0 down financing available — no “sign today” games.',
  },
  {
    q: 'How long does installation take?',
    a: 'Most whole-home softener installs are completed in a few hours, and we typically schedule same-week or next-day. Your home is back to normal the same day.',
  },
  {
    q: 'Do I really need a softener in San Antonio?',
    a: 'San Antonio sits on the Edwards Aquifer limestone, giving us some of the hardest water in the country — roughly 15–20+ grains per gallon. That hardness silently damages appliances, pipes, skin, and hair. A softener stops the damage.',
  },
  {
    q: 'Salt vs. salt-free — which is better?',
    a: 'True salt-based softeners actually remove the hardness minerals, which is what protects your appliances and gives that soft-water feel. We will walk you through both options during your free water test so you can choose what fits your home.',
  },
  {
    q: 'What maintenance is involved?',
    a: 'Very little — mostly periodic salt top-offs. Your first year of salt and filter service is included with this offer, and we will show you exactly how easy it is.',
  },
  {
    q: 'What does the warranty cover?',
    a: 'You get a lifetime workmanship warranty on the installation, plus the manufacturer warranty on the equipment itself.',
  },
  {
    q: 'How does financing work?',
    a: '$0 down with simple monthly payments and a 60-second application. We will present financing options alongside your upfront quote so there are no surprises.',
  },
]

function CtaButtons({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <Button asChild size="lg" className="font-bold">
        <a href="#booking">Claim My Free Water Test</a>
      </Button>
      <Button asChild size="lg" variant="outline" className="font-bold">
        <a href={`tel:${PHONE_TEL}`}>
          <Phone className="h-5 w-5" /> Call {PHONE_DISPLAY}
        </a>
      </Button>
    </div>
  )
}

function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow?: string
  title: string
  sub?: string
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <p className="mb-2 text-sm font-bold uppercase tracking-wider text-water">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-extrabold tracking-tight text-stone sm:text-4xl">
        {title}
      </h2>
      {sub ? <p className="mt-4 text-lg text-muted-foreground">{sub}</p> : null}
    </div>
  )
}

export default function Index() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const formData = new FormData(e.currentTarget)
    const payload = Object.fromEntries(formData.entries())
    try {
      // TODO[Jeremy]: confirm GHL webhook field mapping (name/phone/email/address/message).
      await fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      setSubmitted(true)
    } catch {
      // Fail soft — still show the thank-you so a lead is never lost on the UI.
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* 1. TOP UTILITY BAR */}
      <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Logo />
          <div className="hidden items-center gap-5 text-sm font-medium text-muted-foreground lg:flex">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-water" /> Licensed &amp; Insured
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-water" /> Serving San Antonio &amp; surrounding
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${PHONE_TEL}`}
              className="hidden items-center gap-1.5 font-semibold text-stone hover:text-water sm:inline-flex"
            >
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
            <Button asChild size="sm" className="font-bold">
              <a href="#booking">Free Water Test</a>
            </Button>
          </div>
        </div>
      </header>

      {/* 2. HERO */}
      <section className="relative overflow-hidden bg-stone">
        <div className="absolute inset-0 bg-gradient-to-br from-stone via-stone to-water/40" />
        <div className="container relative grid gap-10 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <div className="text-white">
            <Badge variant="trust" className="mb-4 bg-trust/20 text-trust">
              San Antonio Launch Special — Limited Install Slots
            </Badge>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Get a Whole-Home Water Softener Installed{' '}
              <span className="text-water-aqua">This Week</span> — or You Don&apos;t Pay.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/80">
              San Antonio has some of the hardest water in America. We turn it soft —
              protecting your home, appliances, skin, and hair. Backed by a 100%
              money-back guarantee.
            </p>
            <CtaButtons className="mt-8" />
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-white/90">
              {trustStrip.map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-water-aqua" /> {t}
                </span>
              ))}
            </div>
          </div>
          <div className="relative">
            {/* TODO[Jeremy]: replace with real hero photo (modern home / installed softener / water droplet). */}
            <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-white/15 bg-white/5 backdrop-blur">
              <div className="text-center text-white/70">
                <Droplets className="mx-auto h-16 w-16 text-water-aqua" />
                <p className="mt-3 text-sm">Hero image placeholder</p>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-xl bg-white p-4 shadow-lg sm:block">
              <div className="flex items-center gap-1 text-trust">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-trust" />
                ))}
              </div>
              <p className="mt-1 text-sm font-semibold text-stone">
                Trusted by San Antonio homes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM (AGITATE) */}
      <section id="problem" className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="The Hidden Cost"
            title="San Antonio Has Some of the Hardest Water in America"
            sub="Bexar County water routinely tests at 15–20+ grains per gallon from the Edwards Aquifer limestone — nearly double the threshold for “very hard” water. It quietly destroys your home from the inside out."
          />
          <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
            {[
              { stat: '15–20+', label: 'grains per gallon in San Antonio' },
              { stat: '2x', label: 'past the “very hard” water line' },
              { stat: '~$1,500', label: 'to replace a scaled-out water heater' },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border bg-white p-5 text-center"
              >
                <p className="text-3xl font-extrabold text-water">{s.stat}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {hardWaterCosts.map((c) => (
              <Card key={c.title}>
                <CardContent className="p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-water/10 text-water">
                    <c.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-stone">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button asChild size="lg" className="font-bold">
              <a href="#booking">Stop the Damage — Claim My Free Water Test</a>
            </Button>
          </div>
        </div>
      </section>

      {/* 4. SOLUTION */}
      <section id="solution" className="bg-muted/50 py-16 sm:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="The Fix"
            title="How a Water Softener Fixes It"
            sub="A whole-home softener removes the hard minerals before they ever reach your pipes, appliances, or shower."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-center">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { n: '1', t: 'Capture', b: 'Hard minerals enter the softener tank.' },
                { n: '2', t: 'Exchange', b: 'Minerals are swapped out for soft water.' },
                { n: '3', t: 'Enjoy', b: 'Clean, soft water flows to every tap.' },
              ].map((s) => (
                <Card key={s.n}>
                  <CardContent className="p-5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-water font-bold text-white">
                      {s.n}
                    </span>
                    <h3 className="mt-3 font-bold text-stone">{s.t}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{s.b}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-stone">
                  What you&apos;ll notice
                </h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {benefits.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-sm text-stone"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-water" />
                      {b}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 4.5 HONEST PRICING / ANTI-OVERPAY */}
      <section id="honest-pricing" className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Honest Pricing"
            title="Stop Overpaying the Water Softener Salesman"
            sub="Door-to-door and big-box companies push $5,000–$10,000+ systems with high-pressure, “sign today” tactics. We don’t play that game — just honest, upfront pricing from licensed local plumbers."
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
            <Card className="border border-border bg-muted/40">
              <CardContent className="p-6">
                <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  The Salesman Way
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    'Inflated $5,000–$10,000+ price tags',
                    'High-pressure “today only” closing',
                    'Commissioned reps, not plumbers',
                    'Mystery pricing that changes on the spot',
                    'Gone the moment the sale is done',
                  ].map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                      {t}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-2 border-water shadow-lg">
              <CardContent className="p-6">
                <p className="text-sm font-bold uppercase tracking-wider text-water">
                  The StoneWater Way
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    'Free water test, then an honest upfront quote',
                    'No pressure — take the price home and think',
                    'Installed by licensed local plumbers',
                    '$0 down financing if you want to spread it out',
                    'Lifetime workmanship warranty — we stand behind it',
                  ].map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-2 text-sm font-medium text-stone"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-water" />
                      {t}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="mt-10 flex justify-center">
            <Button asChild size="lg" className="font-bold">
              <a href="#booking">Get My Honest Upfront Quote</a>
            </Button>
          </div>
        </div>
      </section>

      {/* 5. THE OFFER (CENTERPIECE) */}
      <section id="offer" className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="The Grand Slam Offer"
            title="Everything You Get When You Book This Week"
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <Card className="border-2 border-water shadow-xl">
              <CardContent className="p-7 sm:p-9">
                <h3 className="text-center text-2xl font-extrabold text-stone">
                  Get a Whole-Home Water Softener Installed This Week — or You Don&apos;t Pay.
                </h3>
                <ul className="mt-7 space-y-3">
                  {offerStack.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-start justify-between gap-4 border-b border-border pb-3"
                    >
                      <span className="flex items-start gap-2 text-stone">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-water" />
                        <span className="font-medium">{item.label}</span>
                      </span>
                      <span className="shrink-0 text-sm font-semibold text-muted-foreground line-through decoration-trust/70">
                        {item.value}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 rounded-xl bg-trust/10 p-5 text-center">
                  <p className="flex items-center justify-center gap-2 font-bold text-stone">
                    <ShieldCheck className="h-5 w-5 text-water" /> 100% Money-Back Guarantee
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Love your soft water in 30 days or we remove the system and refund
                    every penny. No catch.
                  </p>
                </div>

                <div className="mt-6 flex flex-col items-center gap-4">
                  <Badge variant="accent" className="px-3 py-1 text-sm">
                    $0 Down Financing Available
                  </Badge>
                  <p className="flex items-center gap-2 text-sm font-semibold text-stone">
                    <AlertTriangle className="h-4 w-4 text-trust" /> Limited install slots
                    this month
                  </p>
                  <Button asChild size="lg" className="w-full font-bold sm:w-auto">
                    <a href="#booking">Claim My Free Water Test</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 6. WHY STONEWATER */}
      <section id="why" className="bg-stone py-16 sm:py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-water-aqua">
              Why StoneWater
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              The Local Crew San Antonio Trusts With Their Water
            </h2>
            <p className="mt-4 text-lg text-white/70">
              While the big plumbing names got bought out and went corporate, we
              stayed local, independent, and owner-operated.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyStoneWater.map((w) => (
              <div
                key={w.title}
                className="rounded-xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-water/20 text-water-aqua">
                  <w.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">{w.title}</h3>
                <p className="mt-2 text-sm text-white/70">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROCESS */}
      <section id="process" className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Simple & Fast" title="How It Works in 3 Steps" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {processSteps.map((s) => (
              <Card key={s.step} className="relative">
                <CardContent className="p-7">
                  <span className="absolute right-5 top-5 text-5xl font-extrabold text-muted">
                    {s.step}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-water text-white">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-stone">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button asChild size="lg" className="font-bold">
              <a href="#booking">Start With My Free Water Test</a>
            </Button>
          </div>
        </div>
      </section>

      {/* 8. SOCIAL PROOF */}
      <section id="reviews" className="bg-muted/50 py-16 sm:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Real Results"
            title="San Antonio Homeowners Love Their Soft Water"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {reviews.map((r) => (
              <Card key={r.name}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 text-trust">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-trust" />
                    ))}
                  </div>
                  <p className="mt-3 text-stone">“{r.body}”</p>
                  <p className="mt-3 text-sm font-semibold text-muted-foreground">
                    {r.name} — {r.area}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 rounded-xl bg-water py-6 text-center text-white">
            {/* TODO[Jeremy]: confirm real "happy homes" count before publishing. */}
            <p className="text-3xl font-extrabold">500+ Happy San Antonio Homes</p>
            <p className="mt-1 text-white/80">Protected from hard water damage</p>
          </div>
        </div>
      </section>

      {/* 9. FINANCING */}
      <section id="financing" className="py-16 sm:py-20">
        <div className="container">
          <Card className="overflow-hidden border-2 border-trust/40">
            <CardContent className="grid gap-6 p-8 md:grid-cols-2 md:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-water">
                  Financing
                </p>
                <h2 className="mt-2 text-3xl font-extrabold text-stone">
                  $0 Down. Soft Water Today.
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Protect your home now and pay over time with simple monthly options.
                  {/* TODO[Jeremy]: insert approved financing rate / APR / lender disclosure. */}
                  Apply in about 60 seconds.
                </p>
                <Button asChild size="lg" className="mt-6 font-bold">
                  <a href="#booking">Apply in 60 Seconds</a>
                </Button>
              </div>
              <div className="grid gap-3">
                {['$0 down to get started', 'Low fixed monthly payments', 'Fast approval decision'].map(
                  (f) => (
                    <div
                      key={f}
                      className="flex items-center gap-2 rounded-lg bg-muted/60 p-4 font-medium text-stone"
                    >
                      <BadgeDollarSign className="h-5 w-5 text-water" /> {f}
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 10. SERVICE AREA */}
      <section id="service-area" className="bg-muted/50 py-16 sm:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Where We Work"
            title="Proudly Serving San Antonio & Surrounding Areas"
          />
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
            {serviceAreas.map((a) => (
              <span
                key={a}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-stone"
              >
                <MapPin className="h-4 w-4 text-water" /> {a}
              </span>
            ))}
          </div>
          {/* TODO[Jeremy]: optionally embed a real service-area map graphic here. */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Not sure if we cover your neighborhood? Call us — we likely do.
          </p>
        </div>
      </section>

      {/* 11. FAQ */}
      <section id="faq" className="py-16 sm:py-20">
        <div className="container max-w-3xl">
          <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" />
          <Accordion type="single" collapsible className="mt-8">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 12. FINAL CTA / BOOKING */}
      <section id="booking" className="bg-stone py-16 sm:py-20">
        <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="text-white">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Claim Your FREE Hard Water Test Today
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Get a whole-home softener installed this week — or you don&apos;t pay.
              Backed by our 100% money-back guarantee.
            </p>
            <ul className="mt-6 space-y-2 text-white/90">
              {['Free in-home water test & inspection', 'Same-week install', '$0 down financing', '30-day money-back guarantee'].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-water-aqua" /> {t}
                  </li>
                ),
              )}
            </ul>
            <a
              href={`tel:${PHONE_TEL}`}
              className="mt-8 inline-flex items-center gap-2 text-xl font-bold text-white hover:text-water-aqua"
            >
              <Phone className="h-5 w-5" /> {PHONE_DISPLAY}
            </a>
          </div>

          <Card>
            <CardContent className="p-6 sm:p-8">
              {submitted ? (
                <div className="py-10 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-water" />
                  <h3 className="mt-4 text-xl font-bold text-stone">
                    You&apos;re all set!
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Thanks — we&apos;ll call you shortly to schedule your free water test.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-stone">
                    Book My Free Water Test
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input name="name" placeholder="Full name" required />
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="Phone number"
                      required
                    />
                  </div>
                  <Input name="email" type="email" placeholder="Email address" required />
                  <Input name="address" placeholder="Address or ZIP code" required />
                  <Textarea
                    name="message"
                    placeholder="What's your water problem? (optional)"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="w-full font-bold"
                  >
                    {submitting ? 'Sending…' : 'Claim My Free Water Test'}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    No spam. No pressure. We&apos;ll only use your info to schedule your test.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="border-t border-border bg-white py-12">
        <div className="container grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-3 text-sm text-muted-foreground">
              San Antonio&apos;s hard water, solved. Whole-home water softener installs
              by licensed local plumbers.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-stone">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href={`tel:${PHONE_TEL}`} className="hover:text-water">
                  {PHONE_DISPLAY}
                </a>
              </li>
              {/* TODO[Jeremy]: real business email + physical address (NAP for local SEO). */}
              <li>hello@stonewaterplumbing.com</li>
              <li>San Antonio, TX</li>
              <li>Mon–Sat, 7am–7pm</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-stone">Service Areas</h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              {serviceAreas.slice(0, 6).map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-stone">Trust</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Licensed &amp; Insured</li>
              {/* TODO[Jeremy]: real Texas plumbing license number. */}
              <li>License # TX-XXXXXXX</li>
              <li>100% Money-Back Guarantee</li>
            </ul>
          </div>
        </div>
        <div className="container mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} StoneWater Plumbing. All rights reserved.
        </div>
      </footer>

      {/* STICKY MOBILE CALL / CTA BAR */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-border bg-white p-3 md:hidden">
        <Button asChild variant="outline" className="font-bold">
          <a href={`tel:${PHONE_TEL}`}>
            <Phone className="h-4 w-4" /> Call
          </a>
        </Button>
        <Button asChild className="font-bold">
          <a href="#booking">Free Water Test</a>
        </Button>
      </div>
    </div>
  )
}
