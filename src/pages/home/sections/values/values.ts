export interface ValueCard {
  id: string
  /**
   * Title lines. `emphasis` lines render larger — the design pairs a small line with a
   * big one (e.g. "Commitment &" / "STABILITY") for rhythm across the grid.
   */
  title: { text: string; emphasis?: boolean }[]
  body: string
  /**
   * Card background. Palette is drawn from the wardrobe photo beside the grid
   * (burgundy, green, bronze, navy shirts) plus the logo's leaf green, so the
   * section reads as one family instead of four unrelated brights.
   * All keep white text at ≥ 4.5:1 contrast.
   */
  gradientClassName: string
  /** Optional accent color for the "&" in the title. */
  ampersandClassName?: string
  /** Push the body to the bottom of the card instead of directly under the title. */
  bodyAtBottom?: boolean
}

export const VALUE_CARDS: ValueCard[] = [
  {
    id: 'consistency',
    title: [{ text: 'Consistency' }],
    body: 'Dependable performance across every order',
    gradientClassName: 'bg-linear-to-br from-[#a3203a] via-[#6a1427] to-[#1a0c12]',
  },
  {
    id: 'precision',
    title: [{ text: 'Precision &', emphasis: true }, { text: 'Responsiveness' }],
    body: 'We deliver with accuracy and speed keeping your production smooth, on time, and always informed.',
    gradientClassName: 'bg-linear-to-tr from-[#1e4d2b] via-[#1f6b55] to-[#16787c]',
    ampersandClassName: 'text-[#9be27d]',
  },
  {
    id: 'commitment',
    title: [{ text: 'Commitment &' }, { text: 'Stability', emphasis: true }],
    body: 'Long-term partnerships built on trust, consistency, and unwavering dedication to your brand’s success.',
    gradientClassName: 'bg-linear-to-br from-[#5a4318] via-[#33281c] to-[#1d1714]',
    ampersandClassName: 'text-accent',
  },
  {
    id: 'trust',
    title: [{ text: 'Trustworthiness' }],
    body: 'Built through transparency and results',
    gradientClassName: 'bg-linear-to-br from-[#121c33] via-[#1f3460] to-[#35589a]',
    bodyAtBottom: true,
  },
]
