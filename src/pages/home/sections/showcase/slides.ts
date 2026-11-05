import type { ComponentType } from 'react'

import {
  DesignCollaborationContent,
  FlexibleSourcingContent,
  SustainabilityContent,
} from './SlideContents'

export interface ShowcaseSlide {
  id: string
  /** Accessible name for the slide (screen readers announce "1 of 3, <label>"). */
  label: string
  image: string
  /** CSS object-position — keeps the subject in frame on narrow (portrait) screens. */
  imagePosition: string
  /** Darkening layer over the photo so the text stays readable. */
  overlayClassName: string
  Content: ComponentType
}

export const SHOWCASE_SLIDES: ShowcaseSlide[] = [
  {
    id: 'design-collaboration',
    label: 'Development and design collaboration',
    image: '/asset/home-2nd-section-carousel-img.jpg',
    imagePosition: '50% 60%',
    overlayClassName: 'bg-black/45',
    Content: DesignCollaborationContent,
  },
  {
    id: 'flexible-sourcing',
    label: 'Flexible by design and limitless by vision',
    image: '/asset/home-2nd-section-carousel-img2.jpg',
    imagePosition: '62% 30%',
    overlayClassName: 'bg-linear-to-r from-black/55 via-black/35 to-black/20',
    Content: FlexibleSourcingContent,
  },
  {
    id: 'sustainability',
    label: 'Sustainability commitment',
    image: '/asset/home-2nd-section-carousel-img3.webp',
    imagePosition: '35% 40%',
    overlayClassName: 'bg-linear-to-r from-black/45 via-black/30 to-black/15',
    Content: SustainabilityContent,
  },
]
